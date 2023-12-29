import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import Pusher from "pusher";

import { db } from "@/db";
import { foodTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";
import type { Food } from "@/lib/types/db";
import { updateFoodSchema } from "@/validators/updateFood";

// GET /api/foods/:foodId
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      foodId: string;
    };
  },
) {
  try {
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the food
    const dbFood = await db
      .select({
        foodId: foodTable.displayId,
        count: foodTable.count,
        name: foodTable.name,
        image: foodTable.image,
      })
      .from(foodTable)
      .where(eq(foodTable.displayId, params.foodId))
      .execute();

    if (!dbFood) {
      return NextResponse.json({ error: "Food Not Found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        dbFood,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

// PUT /api/foods/:foodId
export async function PUT(
  req: NextRequest,
  { params }: { params: { foodId: string } },
) {
  try {
    // Get user from session
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // Parse the request body
    const reqBody = await req.json();
    let validatedReqBody: Partial<Omit<Food, "id">>;
    try {
      validatedReqBody = updateFoodSchema.parse(reqBody);
    } catch (error) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // Update document
    const [updatedFood] = await db
      .update(foodTable)
      .set(validatedReqBody)
      .where(eq(foodTable.displayId, params.foodId))
      .returning();

    // Trigger pusher event
    const pusher = new Pusher({
      appId: privateEnv.PUSHER_ID,
      key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
      secret: privateEnv.PUSHER_SECRET,
      cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
      useTLS: true,
    });

    // Private channels are in the format: private-...
    await pusher.trigger(`private-${updatedFood.displayId}`, "food:update", {
      senderId: userId,
      food: {
        id: updatedFood.displayId,
        name: updatedFood.name,
        count: updatedFood.count,
        image: updatedFood.image,
      },
    });

    return NextResponse.json(
      {
        id: updatedFood.displayId,
        name: updatedFood.name,
        count: updatedFood.count,
        image: updatedFood.image,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
