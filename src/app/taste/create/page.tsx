/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateEvent } from "@/app/actions/actions";
import { useForm  } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { revalidatePath } from "next/cache";
import { FieldValues, SubmitHandler } from "react-hook-form";
import  getUserId from "@/app/actions/getUserId";

// import { Oswald } from 'next/font/google';
// import { useState } from "react";

/*
const oswald = Oswald({
  weight: '300',
  subsets: ['latin'],
})
*/

function CreatePage() {

  const userId = getUserId();

  const {
    register,
    control,
    handleSubmit
  } = useForm<FieldValues>({
    defaultValues: {
      taste_info: [{
        taste_name: "",
        taste_count: 1,
        taste_category: "",
      }],
      taste_photo: "",
      taste_place: "",
      taste_time: "",
    }
  });

  const { fields, append, remove} = useFieldArray({
    name: "taste_info",
    control,
  })

  const onSubmit : SubmitHandler<FieldValues> = () =>{
    console.log("form submitted");
  }

  return (

    <form 
    className="flex h-screen w-full py-6 px-24 justify-center space-y-6" 
    onSubmit={handleSubmit(onSubmit)}
    action={async () => {
      if (!userId) {
        console.log("error");
      }
      else {
        await CreateEvent("123", "中式", "二活", "22:00"); // test data //需要透過API來操作才不會有error
        revalidatePath("/taste");
      }
    }}
  >
      <div className="flex flex-col mt-24 space-y-6 overflow-y-scroll no-scrollbar">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-row mt-12 items-center space-x-6">
            <div className="w-80">
              <Label htmlFor="taste-name" className="text-base font-semibold">餐點名稱</Label>
              <Input
                type="text"
                id="taste-name"
                className='flex h-10 w-full rounded-md border border-black text-base'
                // value = {val.name}
                // onChange = {(e) => handleChange(e, i)}
                {...register(`taste_info.${index}.taste_name` as const)}
              />
            </div>
            <div className="w-20" key={field.id}>
              <Label htmlFor="taste-count" className="text-base font-semibold">數量</Label>
              <Input
                type="text"
                id="taste-count"
                className='flex h-10 w-full rounded-md border border-black text-base'
                // value = {val.count}
                {...register(`taste_info.${index}.taste_count` as const)}
              />
            </div>
            <div className="w-20" key={field.id}>
              <Label htmlFor="taste-categoy" className="text-base font-semibold">標籤</Label>
              {/* <select value = {val.category} id="taste-category" className="h-10 w-full px-2 border border-black text-base rounded-md focus:border-theme-green block"> */}
              <select {...register(`taste_info.${index}.taste_category` as const)} id="taste-category" className="h-10 w-full px-2 border border-black text-base rounded-md focus:border-theme-green block">
                {/* <option value="none" selected disabled hidden>----</option> */}
                <option value="taiwnese">臺式</option>
                <option value="chinese">中式</option>
                <option value="western">西式</option>
                <option value="japanese">日式</option>
                <option value="korean">韓式</option>
                <option value="breakfast">早餐</option>
                <option value="drinks">飲料</option>
                <option value="desserts">甜點</option>
              </select>
            </div>
            <div className="w-20" key={field.id}>
              <Label className="text-base font-semibold">照片</Label>
              <label htmlFor="taste-photo">
                {/* <input type="file" id="taste-photo" name="myfile" hidden value = {val.photo}></input> */}
                <input type="file" id="taste-photo" hidden {...register(`taste_info.${index}.taste_photo` as const)}></input>
                <div className="h-10 flex items-center justify-center border border-black rounded-md file:text-theme-green cursor-pointer">
                  瀏覽
                </div>
              </label>
            </div>
            {index === 0 && (
              <button className="pt-5 ml-4" onClick={() => append({taste_name: "", taste_count: 1, taste_category: "", taste_photo: ""})}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            )}
            {/* <button className="pt-5 ml-4" onClick={() => handleDelete(index)}>Delete</button> */}
            {index > 0 && (
              <button type="button" className="pt-5 ml-4" onClick={() => remove(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>
            )}
          </div>
        ))}

        <div>
          <Label htmlFor="taste-place" className="text-base font-semibold">取餐地點</Label>
          <Input
            type="text"
            id="taste-place"
            className='flex h-10 w-4/5 rounded-md border border-black text-base'
          />
        </div>
        <div>
          <Label htmlFor="taste-time" className="text-base font-semibold">最後取餐時間</Label>
          <Input
            type="text"
            id="taste-time"
            className='flex h-10 w-4/5 rounded-md border border-black text-base'
          />
        </div>
        <button className="w-24 bg-theme-light-green hover:bg-theme-light-green-hover border border-black rounded-xl font-semibold text-black text-base py-2 rounded focus:outline-none focus:shadow-outline" type="button">
          確定新增
        </button>
      </div>
    </form>
  );
}
export default CreatePage;