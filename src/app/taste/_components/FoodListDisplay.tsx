import Image from "next/image";
import Link from "next/link";

// import { redirect } from "next/navigation";
import getFood from "@/app/actions/getFood";
import getFoodByUserId from "@/app/actions/getFoodByUserId";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";

// params = category: string
export async function FoodList() {
  const food = await getFood();
  return (
    <div className="mx-12 flex flex-col space-y-4">
      <p className="text-lg">Category</p>
      <div className="no-scrollbar flex space-x-4 overflow-x-scroll">
        {food?.map((item, i) => {
          if (item.count > 0) {
            return (
              <Card
                className="h-64 w-48 shrink-0 cursor-pointer select-none"
                key={i}
              >
                <Link href={`/taste/${item.food_id}`}>
                  <CardHeader className="max-h-32">
                    <Image
                      src="/potato-salad.svg"
                      alt="food"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "40%",
                        borderRadius: "12px 12px 0 0",
                      }}
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
    </div>
  );
}

export async function MyFoodList(userId: { userId: string }) {
  const food = await getFoodByUserId(userId);
  return (
    <div className="mx-12 flex flex-col space-y-4">
      <p className="text-lg">Category</p>
      <div className="no-scrollbar flex space-x-4 overflow-x-scroll">
        {food?.map((item, i) => {
          if (item.count > 0) {
            return (
              <Card
                className="h-64 w-48 shrink-0 cursor-pointer select-none"
                key={i}
              >
                <Link href={`/taste/${item.food_id}`}>
                  <CardHeader className="max-h-32">
                    <Image
                      src="/potato-salad.svg"
                      alt="food"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "40%",
                        borderRadius: "12px 12px 0 0",
                      }}
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
    </div>
  );
}
