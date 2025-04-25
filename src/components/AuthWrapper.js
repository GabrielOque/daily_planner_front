"use client";
import { usePathname, useRouter } from "next/navigation";

const AuthWrapper = ({ children, loading = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      className={`bg-white w-full h-full  flex-col items-center justify-center ${
        loading && "opacity-60 animate-pulse  pointer-events-none"
      }`}
    >
      <div className="flex w-full h-full p-2 lg:p-4 2xl:p-8 gap-x-4 items-center">
        <div className="w-1/2 md:block hidden h-full bg-neutral rounded-2xl relative">
          <h1 className="text-neutralLighter font-bold text-5xl pl-8 pt-8 absolute">
            Daily <br /> Planner
          </h1>
          <div className="justify-center w-full h-full mb-6 flex items-center">
            <img
              src="/checklist.svg"
              alt="Calendar"
              className="h-[300px] 2xl:h-[400px]"
            />
          </div>
        </div>
        <div className="md:w-1/2 w-full h-full border-2 border-neutralLighter rounded-2xl flex flex-col items-center justify-center relative">
          <>
            {pathname !== "/" && (
              <i
                className="fas fa-arrow-left absolute top-3 left-3 cursor-pointer text-xl md:text-2xl text-textSecondary"
                onClick={() => router.push("/")}
              />
            )}
            <div className="md:hidden flex">
              <img src="/checklist.svg" alt="Calendar" className="h-[200px]" />
            </div>
            {children}
          </>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
