/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { foodTable, reservationTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    console.log(userId);

    const foodSubquery = db.$with("food_subquery").as(
      db
        .select({
          foodId: foodTable.displayId,
          name: foodTable.name,
          image: foodTable.image,
        })
        .from(foodTable),
    );

    const reserve_food = await db
      .with(foodSubquery)
      .select({
        userId: reservationTable.userId,
        foodId: reservationTable.foodId,
        count: reservationTable.count,
        createdAt: reservationTable.createdAt,
        name: foodTable.name,
        image: foodTable.image,
      })
      .from(reservationTable)
      .where(eq(reservationTable.userId, userId))
      .leftJoin(foodSubquery, eq(foodTable.displayId, reservationTable.foodId))
      .execute();

    return NextResponse.json(reserve_food, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
