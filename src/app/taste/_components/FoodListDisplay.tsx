import Image from "next/image";
import Link from "next/link";

import { getFoodByUserId, getFoodByCategory } from "@/app/actions/getFood";
import getUsername from "@/app/actions/getUsername";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CategoryProps = {
  eng: string;
  chi: string;
};

export async function FoodList({ eng, chi }: CategoryProps) {
  // const food = await getFood();
  const food = await getFoodByCategory(eng);
  if (food?.length === 0) return;
  return (
    <div className="mx-12 flex flex-col space-y-4">
      <p className="select-none text-2xl">{chi}</p>
      <div className="no-scrollbar flex space-x-4 overflow-x-scroll">
        {food?.map((item, i) => {
          if (item.count > 0) {
            return (
              <Card
                className="h-72 w-56 shrink-0 cursor-pointer select-none"
                key={i}
              >
                <Link href={`/taste/${item.food_id}`}>
                  <CardHeader className="max-h-36 min-h-28">
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

export async function UserFoodList(userId: { userId: string }) {
  const food = await getFoodByUserId(userId);
  const username = await getUsername(userId);
  return (
    <div className="mx-12 flex flex-col space-y-4">
      <p className="select-none text-2xl">@{username?.username}</p>
      <div className="grid grid-cols-5 gap-x-4 gap-y-8">
        {food?.map((item, i) => {
          if (item.count > 0) {
            return (
              <Card
                className="h-72 w-56 shrink-0 cursor-pointer select-none"
                key={i}
              >
                <Link href={`/taste/${item.food_id}`}>
                  <CardHeader className="max-h-36 min-h-28">
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
