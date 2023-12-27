import { NextResponse } from "next/server";

import { db } from "@/db";
import { eventsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { categoryName, location, latestTime } = body;
  
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
        categoryName: categoryName,
        location: location,
        latest_time: latestTime,
      })
      .returning();
    return newEvent.displayId;
  });
  return newEventId;
}
