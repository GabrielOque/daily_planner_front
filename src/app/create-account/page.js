"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import AuthWrapper from "@/components/AuthWrapper";

const CreateAccount = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <AuthWrapper>
      <h1 className="text-neutral font-bold text-4xl">
        Unirse a Daily Planner
      </h1>
      <div className="w-full px-12 2xl:px-40 pt-6 space-y-3">
        <CustomInput
          placeholder="Gabriel Oquendo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <CustomInput
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          password
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-center w-full mt-6 px-12 2xl:px-40">
        <Button
          paddingY="py-2"
          background="bg-primary"
          fontSize="text-xl"
          textColor="text-neutral"
          onClick={() => console.log("Create account")}
        >
          Crear cuenta
        </Button>
      </div>
      <div className="px-12 2xl:px-40 mt-6">
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
};

export default CreateAccount;
