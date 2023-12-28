/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { foodTable } from "@/db/schema";
import { auth } from "@/lib/auth";

// 取得所有food，顯示在/taste畫面
const getFood = async () => {
  try {
    const session = await auth();
    if (!session || !session?.user?.id) {
      return null;
    }
    const food = await db
      .select({
        food_id: foodTable.displayId,
        name: foodTable.name,
        count: foodTable.count,
        image: foodTable.image,
      })
      .from(foodTable)
      .execute();

    return food;
  } catch (error: any) {
    return null;
  }
};

export default getFood;
