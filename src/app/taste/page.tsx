// import { BiError } from "react-icons/bi";
import { auth } from "@/lib/auth";

async function TastePage() {
  const session = await auth();
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {/* <BiError className="text-yellow-500" size={80} /> */}
        <p className="text-lg font-semibold text-slate-700">
          {JSON.stringify(session, null, 2)}
        </p>
      </div>
    </div>
  );
}
export default TastePage;
