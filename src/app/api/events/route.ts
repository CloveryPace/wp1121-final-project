/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import Pusher from "pusher";

import { db } from "@/db";
import { eventsTable, foodTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";
import { pusherServer } from "@/lib/pusher/server";
import type { User, Food } from "@/lib/types/db";

type PusherPayload = {
  foodId: Food["id"];
  userId: User["id"];
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { taste_info, taste_category, taste_time, taste_place } = body; // taste_info = {taste_name, taste_count, taste_photo}
    const food_num = taste_info.length;

    // 從session取得是哪個user在操作
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const newEventId = await db.transaction(async (tx) => {
      const [newEvent] = await tx
        .insert(eventsTable)
        .values({
          userId: userId,
          categoryName: taste_category,
          location: taste_place,
          latest_time: taste_time,
        })
        .returning();
      return newEvent.displayId;
    });

    for (let i = 0; i < food_num; i++) {
      const newFoodId = await db.transaction(async (tx) => {
        const [newFood] = await tx
          .insert(foodTable)
          .values({
            eventId: newEventId,
            name: taste_info[i].taste_name,
            count: taste_info[i].taste_count,
            image: JSON.stringify(taste_info[i].taste_photo["0"]),
          })
          .returning();
        return newFood.displayId;
      });
    }

    console.log("成功");
    return new NextResponse("過去了", { status: 200 });
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGES in events/[eventId]/route");
    return new NextResponse("過不去", { status: 500 });
  }
}
