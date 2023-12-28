"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";
import { Oswald } from "next/font/google";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { publicEnv } from "@/lib/env/public";

const oswald = Oswald({
  weight: "300",
  subsets: ["latin"],
});

export default function Login() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    signIn("credentials", {
      username,
      password,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/taste`,
    });
  };
  return (
    <main className="flex-rows fixed top-0 flex h-screen w-full items-center overflow-hidden">
      <div className="flex w-3/5 min-w-[650px] max-w-[1000px] flex-col border-r bg-white pb-10">
        <div className={oswald.className}>
          <div className="mx-24 mt-20 select-none px-24 py-6 text-4xl text-theme-green">
            NewTaste
          </div>
        </div>
        <div className="mx-24 space-y-6 px-24 py-4">
          <Input
            type="username"
            placeholder="帳號"
            className="flex h-14 w-full rounded-md border border-black text-base"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
          <Input
            type="password"
            placeholder="密碼"
            className="flex h-14 w-full rounded-md border border-black text-base"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          {isSignUp && (
            <Input
              type="confirm password"
              placeholder="確認密碼"
              className="flex h-14 w-full rounded-md border border-black text-base"
            />
          )}
          <div className="py-4">
            <button
              className="focus:shadow-outline w-full rounded rounded-xl border border-black bg-theme-light-green px-4 py-2 text-base font-semibold text-black hover:bg-theme-light-green-hover focus:outline-none"
              type="button"
              onClick={handleSubmit}
            >
              登入
            </button>
            {isSignUp ? (
              <a
                className="cursor-pointer select-none text-sm hover:text-theme-green"
                onClick={() => setIsSignUp(false)}
              >
                已有帳號
              </a>
            ) : (
              <a
                className="cursor-pointer select-none text-sm hover:text-theme-green"
                onClick={() => setIsSignUp(true)}
              >
                申請帳號
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="w-2/5 min-w-[500px]">
        <Image
          src="/login-page.svg"
          alt="login page photo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>
    </main>
  );
}

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/app/page.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{" "}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Explore starter templates for Next.js.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   );
// }
