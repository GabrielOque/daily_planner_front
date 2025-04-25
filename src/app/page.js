"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";
import axios from "@/utils/axiosInstance";
import { removeToken, setToken } from "@/utils/auth";
import { logoutUser, setUserAuth } from "@/store/features/user/userSlice";

//Components
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import AuthWrapper from "@/components/AuthWrapper";

import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";

export default function Home() {
  // console.log("force deploye");
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Check token
  const checkToken = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_API_URL}/user/check-token`
      );
      if (response.status === 200) {
        setToken(response.data.token);
        dispatch(setUserAuth(response.data));
        setLoading(false);
        router.push("/planner");
      }
    } catch (error) {
      setLoading(false);
      removeToken();
      dispatch(logoutUser());
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      checkToken();
    }
  }, []);

  return (
    <AuthWrapper loading={loading}>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center  w-full px-10 xl:w-2/3">
          <h1 className="text-textContrast font-bold text-3xl md:text-5xl text-left w-full">
            Mente productiva
          </h1>
          <p className="text-textSecondary font-regular pt-6 text-md md:text-xl">
            Con solo estas funciones, Daily Planner está personalizado para
            personas que buscan una manera libre de estrés de mantenerse
            enfocadas en sus objetivos, proyectos y tareas.
          </p>
          <div className="flex justify-center w-full mt-6">
            <Button
              paddingY="py-3"
              background="bg-primary"
              fontSize="text-md md:text-xl"
              textColor="text-textContrast"
              onClick={() => router.push("/create-account")}
            >
              Empezar en Daily Planner
            </Button>
          </div>
          <div className="mt-6 w-full pt-10">
            <div className="text-textContrast font-regular text-md md:text-xl text-center flex items-center justify-center gap-2">
              <p>¿Ya tienes una cuenta?</p>
              <button
                className="text-primary font-bold cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Inicia sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
