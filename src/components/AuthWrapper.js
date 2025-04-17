"use client";
import { usePathname, useRouter } from "next/navigation";

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="bg-white w-full h-full  flex-col items-center justify-center">
      <div className="flex w-full h-full p-8 gap-x-4 items-center">
        <div className="w-1/2 h-full bg-neutral rounded-2xl">
          <h1 className="text-neutralLighter font-bold text-4xl pl-8 pt-12">
            Daily Planner
          </h1>
          <div className="justify-center w-full mt-4 flex items-center py-16">
            <img
              src="/checklist.svg"
              alt="Calendar"
              className="h-[400px] 2xl:h-[500px]"
            />
          </div>
        </div>
        <div className="w-1/2 h-full border-2 border-neutralLighter rounded-2xl flex flex-col items-center justify-center relative">
          <>
            {pathname !== "/" && (
              <i
                className="fas fa-arrow-left absolute top-3 left-3 cursor-pointer text-2xl text-textSecondary"
                onClick={() => router.push("/")}
              />
            )}
            {children}
          </>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
