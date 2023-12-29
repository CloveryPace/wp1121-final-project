import { redirect } from "next/navigation";

import { MyFoodList } from "../_components/FoodListDisplay";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

async function MyFoodPage() {
  const session = await auth();

  // new
  if (!session || !session?.user) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;

  return (
    <div className="no-scrollbar my-32 h-96 w-full space-y-12 overflow-y-scroll">
      <MyFoodList userId={userId} />
    </div>
  );
}
export default MyFoodPage;
