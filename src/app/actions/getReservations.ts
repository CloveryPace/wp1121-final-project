/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { foodTable, reservationTable, eventsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const getReservations = async () => {
  try {
    const session = await auth();
    if (!session || !session?.user?.id) {
      return null;
    }
    const userId = session.user.id;

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
        count: reservationTable.count, //預定數量
        createdAt: reservationTable.createdAt, //預定時間
        name: foodTable.name,
        image: foodTable.image,
        location: eventsTable.location,
      })
      .from(reservationTable)
      .where(eq(reservationTable.userId, userId))
      .leftJoin(foodSubquery, eq(foodTable.displayId, reservationTable.foodId))
      .leftJoin(eventsTable, eq(eventsTable.displayId, foodTable.eventId))
      .execute();

    return reserve_food;
  } catch (error: any) {
    return null;
  }
};

export default getReservations;
