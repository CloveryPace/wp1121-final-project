/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { foodTable, reservationTable } from "@/db/schema";
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
        count: reservationTable.count,
        createdAt: reservationTable.createdAt,
        name: foodTable.name,
        image: foodTable.image,
      })
      .from(reservationTable)
      .where(eq(reservationTable.userId, userId))
      .leftJoin(foodSubquery, eq(foodTable.displayId, reservationTable.foodId))
      .execute();

    return reserve_food;
  } catch (error: any) {
    return null;
  }
};

export default getReservations;
