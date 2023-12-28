/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { eventsTable, foodTable } from "@/db/schema";
import { auth } from "@/lib/auth";

// 取得所有food，顯示在/taste畫面
const getFood = async () => {
  try {
    const session = await auth();
    if (!session || !session?.user?.id) {
      return null;
    }
    // const food = await db
    //   .select({
    //     food_id: foodTable.displayId,
    //     name: foodTable.name,
    //     count: foodTable.count,
    //     image: foodTable.image,
    //   })
    //   .from(foodTable)
    //   .execute();

    const food = await db
      .select({
        food_id: foodTable.displayId,
        name: foodTable.name,
        count: foodTable.count,
        image: foodTable.image,
        time: eventsTable.latest_time,
        place: eventsTable.location,
      })
      .from(foodTable)
      .leftJoin(eventsTable, eq(foodTable.eventId, eventsTable.displayId))
      .execute();

    return food;
  } catch (error: any) {
    return null;
  }
};

export default getFood;
