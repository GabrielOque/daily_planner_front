"use client";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import AuthWrapper from "@/components/AuthWrapper";

const RecoveryPassword = () => {
  const [email, setEmail] = useState("");
  return (
    <AuthWrapper>
      <h1 className="text-neutral font-bold text-4xl">Recuperar contraseña</h1>
      <p className="text-textSecondary font-semibold pt-6 text-xl px-12 2xl:px-36">
        Enviaremos una nueva contraseña para ti al correo que ingreses.
      </p>
      <div className="w-full px-12 2xl:px-40 pt-6 space-y-3">
        <CustomInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
      </div>
      <div className="flex justify-center w-full mt-6 px-12 2xl:px-40">
        <Button
          paddingY="py-2"
          background="bg-primary"
          fontSize="text-xl"
          textColor="text-neutral"
          onClick={() => toast.warning("Contraseña envalida")}
        >
          Enviar
        </Button>
      </div>
    </AuthWrapper>
  );
};

export default RecoveryPassword;
