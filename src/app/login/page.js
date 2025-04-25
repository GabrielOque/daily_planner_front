"use client";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "@/store/features/user/userSlice";
import { loginUser } from "@/store/features/user/userThunks";

import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import AuthWrapper from "@/components/AuthWrapper";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.userAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = async () => {
    if (!email || !password) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user && user.token) {
      router.push("/planner");
    } else if (error === "USER_NOT_FOUND") {
      toast.error("El usuario no existe");
      dispatch(clearError());
    } else if (error === "INVALID_PASSWORD") {
      toast.error("La contraseña o el usuario son incorrectos");
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
          Iniciar sesión
        </h1>
        {/* <button onClick={() => router.push("/planner")}>Fast go</button> */}
        <div className="w-full pt-6 space-y-3">
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
            Iniciar sesión
          </Button>
        </div>
        <div className="px-4 md:px-12 2xl:px-40 mt-6 pt-10">
          <div className="text-textContrast font-regular text-base text-center md:text-xl flex items-center justify-center gap-2">
            <p>¿No tienes una cuenta? </p>
            <button
              className="text-primary font-bold cursor-pointer"
              onClick={() => router.push("/create-account")}
            >
              Regístrate
            </button>
          </div>
        </div>
        <div className="px-4 md:px-12 2xl:px-40 mt-6">
          <div className="text-textContrast font-regular text-md md:text-xl text-center flex items-center justify-center gap-2">
            <p>¿Olvidaste tu contraseña?</p>
            <button
              className="text-primary font-bold cursor-pointer"
              onClick={() => router.push("/recovery")}
            >
              Restablecer contraseña
            </button>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Login;
