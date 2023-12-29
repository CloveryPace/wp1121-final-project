// import { useState, useEffect } from "react";

// import { Oswald } from "next/font/google";
// import { useParams, useRouter, redirect } from "next/navigation";

// import { MyFoodList } from "../../_components/FoodListDisplay";

// interface FoodData {
//   id: string;
//   name: string;
//   count: number;
//   event?: {
//     userId: string;
//     location: string;
//     latest_time: string;
//   };
// }

async function CreatorFoodPage() {
  // const { creatorId } = useParams();
  // const creatorIdAsString: string = Array.isArray(creatorId) ? creatorId[0] : creatorId;

  return (
    <div className="no-scrollbar my-32 h-96 w-full space-y-12 overflow-y-scroll">
      {/* <MyFoodList userId={creatorIdAsString} />
      <MyFoodList userId={creatorIdAsString} /> */}
    </div>
  );
}
export default CreatorFoodPage;
