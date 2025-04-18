"use client";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "@/app/store/features/user/userSlice";
import { registerUser } from "@/app/store/features/user/userThunks";

import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import AuthWrapper from "@/components/AuthWrapper";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.userAuth);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateAccount = async () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    if (!regexEmail.test(email)) {
      toast.error("Por favor ingresa un correo electrónico válido");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo"
      );
      return;
    }
    dispatch(registerUser({ name, email, password, confirmPassword }));
  };

  useEffect(() => {
    if (user && user.token) {
      router.push("/planner");
    } else if (error === "USER_ALREADY_EXISTS") {
      toast.error("El usuario ya existe");
      dispatch(clearError());
    } else if (error === "PASSWORDS_DO_NOT_MATCH") {
      toast.error("Las contraseñas no coinciden");
      dispatch(clearError());
    } else if (error === "SERVER_ERROR") {
      toast.error("Error en el servidor, por favor intenta más tarde");
      dispatch(clearError());
    }
  }, [user, isLoading, error]);

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
          loading={isLoading}
          paddingY="py-2"
          background="bg-primary"
          fontSize="text-xl"
          textColor="text-neutral"
          onClick={handleCreateAccount}
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
