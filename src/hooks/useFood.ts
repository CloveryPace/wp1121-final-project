import { useEffect, useMemo, useState } from "react";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

import { useDebounce } from "use-debounce";

import { pusherClient } from "@/lib/pusher/client";
import type { User, Food } from "@/lib/types/db";

type PusherPayload = {
  senderId: User["id"];
  food: Food;
};

// 用來更新food數量（引入api：更新時會通知pusher）
export const useFood = () => {
  const { foodId } = useParams();
  const foodID = Array.isArray(foodId) ? foodId[0] : foodId;
  const [food, setFood] = useState<Food | null>(null);
  const [dbFood, setDbFood] = useState<Food | null>(null);
  const debounceMilliseconds = 300;
  const [debouncedFood] = useDebounce(food, debounceMilliseconds);
  const [debouncedDbFood] = useDebounce(dbFood, debounceMilliseconds);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const isSynced = useMemo(() => {
    if (debouncedFood === null || debouncedDbFood === null) return true;
    return debouncedFood.count === debouncedDbFood.count;
  }, [debouncedFood, debouncedDbFood]);

  useEffect(() => {
    if (isSynced) return;

    const updateFood = async () => {
      if (!debouncedFood) return;
      const res = await fetch(`/api/foods/${foodID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count: debouncedFood?.count,
        }),
      });
      if (!res.ok) {
        return;
      }
      const data: Food = await res.json();
      if (debouncedDbFood?.count !== data.count) {
        router.refresh();
      }
      setDbFood(data);
    };
    updateFood();
  }, [debouncedFood, foodID, router, debouncedDbFood, isSynced]);

  // Subscribe to pusher events
  useEffect(() => {
    if (!foodID) return;
    // Private channels are in the format: private-...
    const channelName = `private-${foodID}`;

    try {
      const channel = pusherClient.subscribe(channelName);
      channel.bind(
        "food:update",
        ({ senderId, food: received_food }: PusherPayload) => {
          if (senderId === userId) {
            return;
          }
          // This is the pusher event that updates the dbFood.
          setFood(received_food);
          setDbFood(received_food);
          router.refresh();
        },
      );
    } catch (error) {
      console.error(error);
      router.push("/taste");
    }

    // Unsubscribe from pusher events when the component unmounts
    return () => {
      pusherClient.unsubscribe(channelName);
    };
  }, [foodID, router, userId]);

  // 用foodID取得food資料，送進food和dbFood
  useEffect(() => {
    if (!foodID) return;
    const fetchFood = async () => {
      const res = await fetch(`/api/foods/${foodID}`);
      if (!res.ok) {
        setFood(null);
        router.push("/taste");
        return;
      }
      const data = await res.json();
      setFood(data);
      setDbFood(data);
    };
    fetchFood();
  }, [foodID, router]);

  // 設置count
  const count = food?.count || 0;
  const setCount = (newCount: number) => {
    if (food === null) return;
    setFood({
      ...food,
      count: newCount,
    });
  };

  return {
    foodID,
    food,
    count,
    setCount,
  };
};
