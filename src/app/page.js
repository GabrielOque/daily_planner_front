"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getToken } from "@/app/utils/auth";
import axios from "@/app/utils/axiosInstance";
import { removeToken, setToken } from "@/app/utils/auth";
import { logoutUser, setUserAuth } from "@/app/store/features/user/userSlice";

//Components
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import AuthWrapper from "@/components/AuthWrapper";

import { NEXT_PUBLIC_API_URL } from "@/app/utils/envConfig";

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
      <h1 className="text-neutral font-bold text-4xl">Mente productiva</h1>
      <p className="text-textSecondary font-semibold pt-6 text-xl px-12 2xl:px-36">
        Con solo estas funciones, Daily Planner está personalizado para personas
        que buscan una manera libre de estrés de mantenerse enfocadas en sus
        objetivos, proyectos y tareas.
      </p>
      <div className="flex justify-center w-full mt-6 px-12 2xl:px-36">
        <Button
          paddingY="py-2"
          background="bg-primary"
          fontSize="text-xl"
          textColor="text-neutral"
          onClick={() => router.push("/create-account")}
        >
          Empezar en Daily Planner
        </Button>
      </div>
      <div className="px-12 2xl:px-24 mt-6">
        <p className="text-textSecondary font-semibold text-xl">
          ¿Ya tienes una cuenta?{" "}
          <button
            className="text-primary font-bold cursor-pointer underline"
            onClick={() => router.push("/login")}
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </AuthWrapper>
  );
}
