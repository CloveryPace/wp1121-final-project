import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import FoodList from "./_components/FoodList";

async function TastePage() {
  const session = await auth();

  // new
  if (!session || !session?.user) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }

  return (
    <div className="no-scrollbar my-32 h-96 w-full space-y-12 overflow-y-scroll">
      <FoodList />
      <FoodList />
    </div>
  );
}
export default TastePage;
