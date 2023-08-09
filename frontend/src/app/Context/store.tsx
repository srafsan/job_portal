"use client";

import { createContext, useContext, useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import apiClient from "@/utils/apiClient";

interface ContextProps {
  userRole: string;
  userOptions: any;
  loginFunc: (...args: any[]) => any;
  registerFunc: (...args: any[]) => any;
  logoutFunc: (...args: any[]) => any;
}

const GlobalContext = createContext<ContextProps>({
  userRole: "",
  userOptions: [],
  loginFunc: function (...args: any[]) {
    throw new Error("Function not implemented.");
  },
  registerFunc: function (...args: any[]) {
    throw new Error("Function not implemented.");
  },
  logoutFunc: function (...args: any[]) {
    throw new Error("Function not implemented.");
  },
});

export const GlobalContextProvider = ({ children }: any) => {
  const router = useRouter();
  const [userRole, setUserRole] = useState("");
  const [userOptions, setUserOptions] = useState([]);

  // Login
  const loginFunc = async (email: string, password: string) => {
    const userData = {
      email,
      password,
    };

    try {
      const res = await apiClient.post("/login", userData);

      if (res.status == 200) {
        alert("Login Successful");
        const { token, role, options } = res.data;

        setUserRole(role);
        setUserOptions(options);

        Cookie.set("accessToken", token.accessToken);
        Cookie.set("refreshToken", token.refreshToken);

        router.push("/dashboard");
      } else {
        alert("Wrong Username or password");
      }
    } catch {
      alert("Error while login the user data");
    }
  };

  // Registration
  const registerFunc = async (
    name: string,
    email: string,
    password: string
  ) => {
    const userData = {
      name,
      email,
      password,
    };

    try {
      const res = await apiClient.post("/signup", userData);

      if (res.status == 200) {
        router.push("/login");
      }
    } catch {
      alert("Error registering the user data");
    }
  };

  // Logout
  const logoutFunc = async () => {
    Cookie.remove("accessToken");
    Cookie.remove("refreshToken");

    router.push("/");
  };

  const userInfo: any = {
    userRole,
    userOptions,
    loginFunc,
    registerFunc,
    logoutFunc,
  };

  return (
    <GlobalContext.Provider value={userInfo}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
