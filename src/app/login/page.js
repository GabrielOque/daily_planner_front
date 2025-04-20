"use client";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "@/app/store/features/user/userSlice";
import { loginUser } from "@/app/store/features/user/userThunks";

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
      <h1 className="text-neutral font-bold text-4xl">Iniciar sesión</h1>
      <button onClick={() => router.push("/planner")}>Fast go</button>
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
          loading={isLoading}
          paddingY="py-2"
          background="bg-primary"
          fontSize="text-xl"
          textColor="text-neutral"
          onClick={handleCreateAccount}
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
