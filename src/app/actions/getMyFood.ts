/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { eventsTable, foodTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const getMyFood = async () => {
  try {
    const session = await auth();
    if (!session || !session?.user?.id) {
      return null;
    }
    const userId = session.user.id;

    const eventSubquery = db.$with("event_subquery").as(
      db
        .select({
          displayId: eventsTable.displayId,
          latest_time: eventsTable.latest_time,
          categoryName: eventsTable.categoryName,
          location: eventsTable.location,
        })
        .from(eventsTable)
        .where(eq(eventsTable.userId, userId)),
    );

    const my_food = await db
      .with(eventSubquery)
      .select({
        foodId: foodTable.displayId,
        latest_time: eventSubquery.latest_time,
        categoryName: eventSubquery.categoryName,
        location: eventSubquery.location,
        count: foodTable.count,
        name: foodTable.name,
        image: foodTable.image,
      })
      .from(foodTable)
      .leftJoin(eventSubquery, eq(eventSubquery.displayId, foodTable.eventId))
      .execute();

    return my_food;
  } catch (error: any) {
    return null;
  }
};

export default getMyFood;
