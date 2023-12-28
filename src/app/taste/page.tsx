import Image from "next/image";
import Link from "next/link";
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
    <div className="no-scrollbar my-32 h-96 w-full space-y-6 overflow-y-scroll">
      <div className="no-scrollbar flex space-x-4 overflow-x-scroll px-12">
        {food?.map((item, i) => {
          if (item.count > 0) {
            return (
              <Card className="h-64 w-96 cursor-pointer select-none" key={i}>
                <Link href={`/taste/${item.food_id}`}>
                  <CardHeader className="max-h-32">
                    <Image
                      src="/potato-salad.svg"
                      alt="food"
                      width={0}
                      height={0}
                      sizes="100vw"
                      // fill
                      // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ width: "100%", height: "40%" }}
                      priority
                    />
                  </CardHeader>
                  <CardContent className="no-scrollbar h-2/5 overflow-y-scroll">
                    <CardTitle>{item.name}</CardTitle>
                    <div>數量：{item.count}</div>
                    <div>時間：{item.time}</div>
                    <div>地點：{item.place}</div>
                  </CardContent>
                </Link>
              </Card>
            );
          }
        })}
      </div>

      <div className="flex space-x-4 px-12">
        {food?.map((item, i) => {
          if (item.count > 0) {
            return (
              <Card className="h-64 w-48 cursor-pointer select-none" key={i}>
                <Link href={`/taste/${item.food_id}`}>
                  <CardHeader className="max-h-32">
                    <Image
                      src="/potato-salad.svg"
                      alt="food"
                      width={0}
                      height={0}
                      sizes="100vw"
                      // fill
                      // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ width: "100%", height: "40%" }}
                      priority
                    />
                  </CardHeader>
                  <CardContent className="no-scrollbar h-2/5 overflow-y-scroll">
                    <CardTitle>{item.name}</CardTitle>
                    <div>數量：{item.count}</div>
                    <div>時間：{item.time}</div>
                    <div>地點：{item.place}</div>
                  </CardContent>
                </Link>
              </Card>
            );
          }
        })}
      </div>
      {/* </div> */}
      {/* <section className="flex w-full flex-col pt-3"></section> */}
    </div>
  );
}
export default TastePage;
