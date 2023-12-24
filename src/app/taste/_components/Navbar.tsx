"use client";

import { Oswald } from 'next/font/google'
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import ClickAwayListener from "@mui/material/ClickAwayListener";

const oswald = Oswald({
  weight: '300',
  subsets: ['latin'],
})

function Navbar(){
  const [isSearch, setIsSearch] = useState<boolean>(false);
  return (
    <nav className="fixed flex flex-wrap justify-between w-full border-r bg-theme-green bg-opacity-30 py-6">
      <div className={oswald.className}>
        <div className="text-4xl px-10">
          NewTaste
        </div>
      </div>
      <div className="flex space-x-16 px-10">
        <button className="min-w-[100px] bg-theme-green bg-opacity-80 hover:bg-opacity-70 rounded-xl font-semibold text-white text-base py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          新增餐點
        </button>
        <div className="flex items-center space-x-6">
          {
            isSearch &&
            <ClickAwayListener
              onClickAway={() => setIsSearch(false)}
            >
              <Input 
                type = 'search'
                placeholder='搜尋'
                className='rounded-md h-8 border border-black text-base'
              />
            </ClickAwayListener>
          }
          <button onClick={() => setIsSearch(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;