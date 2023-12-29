"use client";

import { useState, useEffect } from "react";

import { Oswald } from "next/font/google";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import axios from "axios";

const oswald = Oswald({
  weight: "300",
  subsets: ["latin"],
});

interface FoodData {
  id: string;
  name: string;
  count: number;
  event?: {
    userId: string;
    location: string;
    latest_time: string;
  };
}

function DetailsPage() {
  const router = useRouter();
  const [reserve, setReserve] = useState<boolean>(false);
  const [creatorname, setCreatorname] = useState<string>("");
  const [food, setFood] = useState<FoodData | null>(null);
  const { foodId } = useParams();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`/api/foods/${foodId}`);
        setFood(response.data);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };
    fetchFood();
  }, [foodId]);

  axios
    .get(`/api/user/${food?.event?.userId}`)
    .then((res) => {
      console.log(res.data);
      setCreatorname(res.data);
    })
    .catch((error) => {
      console.log(error);
    });

  const handleClick = () => {
    router.push(`/taste/user/${food?.event?.userId}`);
  };

  return (
    <div className="mx-4 flex h-screen w-full flex-col space-y-6 px-24 py-6">
      <div className="mt-24 flex h-10 items-end justify-start space-x-6">
        <div className="select-none text-3xl">{food?.name}</div>
        <div className={oswald.className}>
          {/* 從 foodTable 連到 eventTable 再連到 user */}
          <div
            className="mb-0.5 cursor-pointer select-none text-lg"
            onClick={() => handleClick()}
          >
            @{creatorname}
          </div>
        </div>
      </div>
      {/* flex justify-start space-x-24 */}
      <div className="grid grid-cols-2 items-center gap-24">
        <Image
          src="/potato-salad.svg"
          alt="food"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority
        />
        <div className="flex flex-col">
          <hr className="mb-8 h-0.5 border-0 bg-gray-300"></hr>
          <div className="flex select-none flex-col space-y-6">
            <div className="text-xl">數量：{food?.count}</div>
            <div className="text-xl">取餐時間：{food?.event?.latest_time}</div>
            <div className="text-xl">取餐地點：{food?.event?.location}</div>
          </div>
          <hr className="my-8 mb-16 h-0.5 border-0 bg-gray-300"></hr>
          {reserve ? (
            <button
              className="focus:shadow-outline min-w-[100px] rounded rounded-xl bg-gray-300 bg-opacity-80 px-4 py-2 text-xl font-semibold text-gray-500 hover:bg-opacity-70 focus:outline-none"
              type="button"
              onClick={() => setReserve(false)}
            >
              已預訂
            </button>
          ) : (
            <button
              className="focus:shadow-outline min-w-[100px] rounded rounded-xl bg-lime-700 bg-opacity-80 px-4 py-2 text-xl font-semibold text-white hover:bg-opacity-70 focus:outline-none"
              type="button"
              onClick={() => setReserve(true)}
            >
              預訂
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default DetailsPage;
