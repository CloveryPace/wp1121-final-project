"use client";

import { useForm, useFieldArray } from "react-hook-form";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import axios from "axios";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* eslint-disable @typescript-eslint/no-explicit-any */

type FormValues = {
  taste_info: {
    taste_name: string;
    taste_count: number;
    taste_photo: string; // url
  }[];
  taste_category: string;
  taste_time: string; // data
  taste_place: string;
};

function CreatePage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      taste_info: [
        {
          taste_name: "",
          taste_count: 1,
          taste_photo: "",
        },
      ],
      taste_category: "",
      taste_time: "",
      taste_place: "",
    },
  });

  const { register, control, handleSubmit, formState } = form;

  const { fields, append, remove } = useFieldArray({
    name: "taste_info",
    control,
  });

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    if (!userId) return;
    console.log("form submitted:", data);
    axios.post("/api/events", {
      ...data,
    });
    router.refresh();
    router.push("/taste");
  };

  const getTimePlaceholder = () => {
    const time = new Date();
    let hour = time.getHours().toString();
    let minute = time.getMinutes().toString();
    if (hour.length < 2) {
      hour = "0" + hour;
    }
    if (minute.length < 2) {
      minute = "0" + minute;
    }
    return `e.g. ${hour}:${minute}`;
  };

  return (
    <form
      className="flex h-screen w-full select-none justify-center space-y-6 px-24 py-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="no-scrollbar mt-24 flex flex-col space-y-6 overflow-y-scroll">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="mt-12 flex flex-row items-center space-x-6"
          >
            <div className="w-80">
              <Label htmlFor="taste-name" className="text-base font-semibold">
                餐點名稱
              </Label>
              <Input
                type="text"
                id="taste-name"
                className="flex h-10 w-full rounded-md border border-black text-base"
                required
                {...register(`taste_info.${index}.taste_name` as const, {
                  required: {
                    value: true,
                    message: "必要欄位",
                  },
                })}
              />
            </div>
            <div className="w-20" key={field.id}>
              <Label htmlFor="taste-count" className="text-base font-semibold">
                數量
              </Label>
              <Input
                type="text"
                id="taste-count"
                className="flex h-10 w-full rounded-md border border-black text-base"
                required
                // value = {val.count}
                {...register(`taste_info.${index}.taste_count` as const, {
                  required: {
                    value: true,
                    message: "必要欄位",
                  },
                })}
              />
            </div>
            <div className="w-20" key={field.id}>
              {/* <Label className="text-base font-semibold">照片</Label> */}
              <label className="" htmlFor="taste-photo">
                <input
                  className="mr-6 mt-5 w-36"
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  id="taste-photo"
                  required
                  {...register(`taste_info.${index}.taste_photo` as const, {
                    required: {
                      value: true,
                      message: "必要欄位",
                    },
                  })}
                ></input>
                {/* <div className="h-10 flex items-center justify-center border border-black rounded-md file:text-theme-green cursor-pointer">
                  瀏覽
                </div> */}
              </label>
            </div>
            {index === 0 && (
              <button
                type="button"
                className="mt-5"
                onClick={() =>
                  append({ taste_name: "", taste_count: 1, taste_photo: "" })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-10 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            )}
            {index > 0 && (
              <button
                type="button"
                className="mt-5"
                onClick={() => remove(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-10 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}

        <div className="flex space-x-6">
          <div className="w-20">
            <Label htmlFor="taste-categoy" className="text-base font-semibold">
              標籤
            </Label>
            <select
              {...register("taste_category", {
                required: {
                  value: true,
                  message: "必要欄位",
                },
              })}
              id="taste-category"
              className="block h-10 w-full rounded-md border border-black px-2 text-base focus:border-theme-green"
            >
              <option value="none" selected disabled hidden>
                ----
              </option>
              <option value="taiwnese">臺式</option>
              <option value="chinese">中式</option>
              <option value="western">西式</option>
              <option value="japanese">日式</option>
              <option value="korean">韓式</option>
              <option value="breakfast">早餐</option>
              <option value="drinks">飲料</option>
              <option value="desserts">甜點</option>
            </select>
            <p className="pt-0.5 text-xs text-[#C14B25]">
              {errors.taste_category?.message}
            </p>
          </div>
          <div className="w-3/5">
            <Label htmlFor="taste-time" className="text-base font-semibold">
              最後取餐時間
            </Label>
            <Input
              type="text"
              id="taste-time"
              className="flex h-10 w-4/5 rounded-md border border-black text-base"
              {...register("taste_time", {
                required: {
                  value: true,
                  message: "必要欄位",
                },
              })}
              placeholder={getTimePlaceholder()}
              pattern="\d{2}:\d{2}"
            />
            <p className="pt-0.5 text-xs text-[#C14B25]">
              {errors.taste_time?.message}
            </p>
          </div>
        </div>
        <div>
          <Label htmlFor="taste-place" className="text-base font-semibold">
            取餐地點
          </Label>
          <Input
            type="text"
            id="taste-place"
            className="flex h-10 w-4/5 rounded-md border border-black text-base"
            {...register("taste_place", {
              required: {
                value: true,
                message: "必要欄位",
              },
            })}
          />
          <p className="pt-0.5 text-xs text-[#C14B25]">
            {errors.taste_place?.message}
          </p>
        </div>
        <button
          type="submit"
          className="focus:shadow-outline w-24 rounded rounded-xl border border-black bg-theme-light-green py-2 text-base font-semibold text-black hover:bg-theme-light-green-hover focus:outline-none"
        >
          確定新增
        </button>
      </div>
    </form>
  );
}
export default CreatePage;
