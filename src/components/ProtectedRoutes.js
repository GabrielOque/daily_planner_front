"use client";
import { useEffect } from "react";
import Connecting from "@/components/Connecting";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";
import axios from "@/utils/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { removeToken, setToken } from "@/utils/auth";
import { logoutUser, setUserAuth } from "@/store/features/user/userSlice";

import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";

const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);

  // Check token
  const checkToken = async () => {
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_API_URL}/user/check-token`
      );
      if (response.status === 200) {
        setToken(response.data.token);
        dispatch(setUserAuth(response.data));
      }
    } catch (error) {
      removeToken();
      dispatch(logoutUser());
      router.push("/login");
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      checkToken();
    } else {
      router.push("/login");
    }
  }, []);

  if (!user || !user?.token) {
    return <Connecting title="Verificando sesión..." />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoutes;
