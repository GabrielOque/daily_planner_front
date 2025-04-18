"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "@/app/utils/axiosInstance";

import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import AuthWrapper from "@/components/AuthWrapper";

const RecoveryPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post("/code/send-code", { email });
      toast.success(
        "El código de verificación ha sido enviado a tu correo electrónico."
      );
      setStep(2);
    } catch (error) {
      const errorCode = error?.response?.data?.code;
      if (errorCode === "USER_NOT_FOUND") {
        toast.error("El correo electrónico no está registrado.");
      } else if (errorCode === "SERVER_ERROR") {
        toast.error("Error al enviar el código. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    try {
      await axios.post("/code/verify-code", { email, code });
      toast.success("Código verificado. Puedes restablecer tu contraseña.");
      setStep(3);
    } catch (error) {
      const errorCode = error?.response?.data?.code;
      if (errorCode === "INVALID_CODE") {
        toast.error("El código de verificación es incorrecto.");
      } else if (errorCode === "SERVER_ERROR") {
        toast.error("Error al verificar el código. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setCode("");
    setLoading(true);
    try {
      await axios.post("/code/resend-code", { email });
      toast.success(
        "El código de verificación ha sido enviado a tu correo electrónico."
      );
    } catch (error) {
      const errorCode = error?.response?.data?.code;
      if (errorCode === "SERVER_ERROR") {
        toast.error("Error al enviar el código. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitNewPassword = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        toast.error("Las contraseñas no coinciden.");
        return;
      }
      await axios.put("/user/change-password", { email, password });
      toast.success("Contraseña restablecida con éxito.");
      router.push("/login");
    } catch (error) {
      const errorCode = error?.response?.data?.code;
      if (errorCode === "SERVER_ERROR") {
        toast.error("Error al restablecer la contraseña. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      {step === 1 && (
        <>
          <h1 className="text-neutral font-bold text-4xl">
            Recuperar contraseña
          </h1>
          <p className="text-textSecondary font-semibold pt-6 text-xl px-12 2xl:px-36">
            Ingresa tu correo electrónico y te enviaremos un codigo para que
            puedas recuperar tu contraseña.
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
              loading={loading}
              paddingY="py-2"
              background="bg-primary"
              fontSize="text-xl"
              textColor="text-neutral"
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <h1 className="text-neutral font-bold text-4xl">
            Recuperar contraseña
          </h1>
          <p className="text-textSecondary font-semibold pt-6 text-xl px-12 2xl:px-36">
            Ingresa el código de verificación que hemos enviado a tu correo
            electrónico.
          </p>
          <div className="w-full px-12 2xl:px-40 pt-6 space-y-3">
            <CustomInput
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Código de verificación"
            />
            <label
              className="text-textSecondary font-semibold text-sm underline cursor-pointer pl-2"
              onClick={handleResendCode}
            >
              Volver a enviar el código?
            </label>
          </div>
          <div className="flex justify-center w-full mt-6 px-12 2xl:px-40">
            <Button
              loading={loading}
              paddingY="py-2"
              background="bg-primary"
              fontSize="text-xl"
              textColor="text-neutral"
              onClick={handleSubmitCode}
            >
              Enviar
            </Button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <h1 className="text-neutral font-bold text-4xl">
            Cambiar contraseña
          </h1>
          <p className="text-textSecondary font-semibold pt-6 text-xl px-12 2xl:px-36">
            Ingresa tu nueva contraseña.
          </p>
          <div className="w-full px-12 2xl:px-40 pt-6 space-y-3">
            <CustomInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nueva contraseña"
              type="password"
            />
            <CustomInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar nueva contraseña"
              type="password"
            />
          </div>
          <div className="flex justify-center w-full mt-6 px-12 2xl:px-40">
            <Button
              loading={loading}
              paddingY="py-2"
              background="bg-primary"
              fontSize="text-xl"
              textColor="text-neutral"
              onClick={handleSubmitNewPassword}
            >
              Cambiar contraseña
            </Button>
          </div>
        </>
      )}
    </AuthWrapper>
  );
};

export default RecoveryPassword;
