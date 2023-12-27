"use client"

import Image from "next/image";

import { Oswald } from "next/font/google";

import { useState } from "react";

const oswald = Oswald({
  weight: "300",
  subsets: ["latin"],
});

function DetailsPage() {  // params: {food.id}
  const [reserve, setReserve] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-screen w-full py-6 px-24 mx-4 space-y-6 overflow-y-scroll no-scrollbar">
      <div className="h-10 mt-24 flex space-x-6 justify-start items-end">
        <div className="text-4xl select-none">餐點名稱</div>
        <div className={oswald.className}>
          {/* 從 foodTable 連到 eventTable 再連到 user */}
          <div className="mb-0.5 text-lg select-none cursor-pointer">@username</div>
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
          <hr className="h-0.5 mb-8 bg-gray-300 border-0"></hr>
          <div className="flex flex-col space-y-6 select-none">
            <div className="text-xl">數量：1</div>
            <div className="text-xl">取餐地點：臺灣大學</div>
            <div className="text-xl">最後取餐時間：21:00</div>
          </div>
          <hr className="h-0.5 my-8 mb-16 bg-gray-300 border-0"></hr>
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
          )
          }
        </div>
      </div>
    </div>
  )
}
export default DetailsPage;