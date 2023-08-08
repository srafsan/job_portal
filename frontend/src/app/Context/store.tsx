"use client";

import axios from "axios";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

interface ContextProps {
  userRole: string;
  setUserId: Dispatch<SetStateAction<string>>;
  loginFunc: (...args: any[]) => any;
  registerFunc: (...args: any[]) => any;
  logoutFunc: (...args: any[]) => any;
}

const GlobalContext = createContext<ContextProps>({
  userRole: "",
  setUserId: (): string => "",
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

  // Login
  const loginFunc = async (email: string, password: string) => {
    const userData = {
      email,
      password,
    };

    try {
      const URL = `http://localhost:3001/login`;
      const res = await axios.post(URL, userData);

      if (res.status == 200) {
        alert("Login Successful");
        const { token, role } = res.data;

        setUserRole(role);
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
      const url = "http://localhost:3001/signup";
      const res = await axios.post(url, userData);

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
    loginFunc,
    registerFunc,
    logoutFunc,
  };

  return (
    <GlobalContext.Provider value={userInfo}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
