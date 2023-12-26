/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

const getUserId = async (userID: string) => {
  try {
    const users = await db
      .select({
        username: usersTable.username,
        user_id: usersTable.displayId,
      })
      .from(usersTable)
      .where(eq(usersTable.displayId, userID))
      .execute();
    return users;
  } catch (error: any) {
    return null;
  }
};

export default getUserId;
