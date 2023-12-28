// import { BiError } from "react-icons/bi";
import Image from "next/image";
import { redirect } from "next/navigation";

import getFood from "../actions/getFood";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="mx-12 flex h-screen w-full items-center justify-center space-x-4">
      {/* <div className="flex flex-col items-center justify-center"> */}
      {/* <p className="text-lg font-semibold text-slate-700">
          {JSON.stringify(session)}
        </p>
        <p className="text-lg font-semibold text-slate-700">
          {JSON.stringify(food)}
        </p> */}

      {food?.map((item, i) => {
        return (
          <Card className="h-1/2 w-full" key={i}>
            <CardHeader>
              <Image
                src="/potato-salad.svg"
                alt="food"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "40%" }}
                priority
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{item.name}</CardTitle>
              <div>數量：{item.count}</div>
              <div>時間：{item.time}</div>
              <div>地點：{item.place}</div>
            </CardContent>
          </Card>
        );
      })}

      {/* </div> */}
      <section className="flex w-full flex-col pt-3"></section>
    </div>
  );
}
export default TastePage;
