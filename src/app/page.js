"use client";

import { useRouter } from "next/navigation";

//Components
import Button from "@/components/Button";
import AuthWrapper from "@/components/AuthWrapper";

export default function Home() {
  const router = useRouter();
  return (
    <AuthWrapper>
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
