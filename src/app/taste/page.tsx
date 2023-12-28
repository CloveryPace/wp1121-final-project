// import { BiError } from "react-icons/bi";
// import { BiError } from "react-icons/bi";
import { redirect } from "next/navigation";

import getFood from "../actions/getFood";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

async function TastePage() {
  const session = await auth();

  // new
  if (!session || !session?.user) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }

  const food = await getFood();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {/* <BiError className="text-yellow-500" size={80} /> */}
        <p className="text-lg font-semibold text-slate-700">
          {JSON.stringify(session)}
        </p>
        <p className="text-lg font-semibold text-slate-700">
          {JSON.stringify(food)}
        </p>
      </div>
      <section className="flex w-full flex-col pt-3"></section>
    </div>
  );
}
export default TastePage;
