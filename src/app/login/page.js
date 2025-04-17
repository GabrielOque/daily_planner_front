"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import AuthWrapper from "@/components/AuthWrapper";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <AuthWrapper>
      <h1 className="text-neutral font-bold text-4xl">Iniciar sesión</h1>
      <div className="w-full px-12 2xl:px-40 pt-6 space-y-3">
        <CustomInput
          placeholder="oquendogabriel18@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomInput
          placeholder="Contraseña"
          value={password}
          password
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-center w-full mt-6 px-12 2xl:px-40">
        <Button
          paddingY="py-2"
          background="bg-primary"
          fontSize="text-xl"
          textColor="text-neutral"
          onClick={() => router.push("/planner")}
        >
          Iniciar sesión
        </Button>
      </div>
      <div className="px-12 2xl:px-40 mt-6">
        <p className="text-textSecondary font-semibold text-xl">
          ¿No tienes una cuenta?{" "}
          <button
            className="text-primary font-bold cursor-pointer underline"
            onClick={() => router.push("/create-account")}
          >
            Regístrate
          </button>
        </p>
      </div>
      <div className="px-12 2xl:px-40 mt-6">
        <p className="text-textSecondary font-semibold text-xl">
          ¿Olvidaste tu contraseña?{" "}
          <button
            className="text-primary font-bold cursor-pointer underline"
            onClick={() => router.push("/recovery")}
          >
            Restablecer contraseña
          </button>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default Login;
