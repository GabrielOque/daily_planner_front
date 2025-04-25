"use client";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "@/store/features/user/userSlice";
import { registerUser } from "@/store/features/user/userThunks";

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
      <div className="flex flex-col items-center justify-center w-full px-10 xl:w-2/3">
        <h1 className="text-textContrast font-bold text-2xl md:text-5xl w-full">
          Crear cuenta
        </h1>
        <div className="w-full pt-6 space-y-3">
          <CustomInput
            placeholder="Nombre de usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomInput
            placeholder="Correo electrónico"
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
        <div className="flex justify-center w-full mt-6">
          <Button
            loading={isLoading}
            paddingY="py-3"
            background="bg-primary"
            fontSize="text-md md:text-xl"
            textColor="text-textContrast"
            onClick={handleCreateAccount}
          >
            Crear cuenta
          </Button>
        </div>
        <div className="px-4 md:px-12 2xl:px-40 mt-6 pt-10">
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
    </AuthWrapper>
  );
};

export default CreateAccount;
