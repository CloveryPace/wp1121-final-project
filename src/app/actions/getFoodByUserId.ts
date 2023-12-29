/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { eventsTable, foodTable } from "@/db/schema";

// 取得使用者的所有food，顯示在/myfood畫面
const getFoodByUserId = async (userId: { userId: string }) => {
  try {
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
      .where(eq(eventsTable.userId, userId.userId))
      .execute();

    return food;
  } catch (error: any) {
    return null;
  }
};

export default getFoodByUserId;
