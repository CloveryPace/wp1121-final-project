/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const getUsers = async () => {
  try {
    const session = await auth();
    if (!session || !session?.user?.id) {
      return null;
    }
    const userId = session.user.id; // 目前登入的user

    // 取得目前user的資訊
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.displayId, userId),
      columns: {
        username: true,
        displayId: true,
        image: true,
      },
    });

    return user;
  } catch (error: any) {
    return null;
  }
};

export default getUsers;
