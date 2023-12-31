import React, {createContext, useContext, useState} from 'react';
import Cookie from "js-cookie";
import {useRouter} from "next/navigation"
import apiClient from "@/utils/apiClient";

interface ContextProps {
  userId: BigInt | null;
  userRole: string;
  userOptions: any;
  loginFunc: (...args: any[]) => any;
  registerFunc: (...args: any[]) => any;
  logoutFunc: (...args: any[]) => any;
}

const GlobalContext = createContext<ContextProps>({
  userId: null,
  userRole: "",
  userOptions: [],
  loginFunc: function (...args: any[]) {
    throw new Error("Function not implemented.")
  },
  registerFunc: function (...args: any[]) {
    throw new Error("Function not implemented.");
  },
  logoutFunc: function (...args: any[]) {
    throw new Error("Function not implemented.");
  },
})

export const GlobalContextProvider = ({children}: any) => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [userOptions, setUserOptions] = useState([])

  // Login
  const loginFunc = async (email: string, password: string) => {
    const userData = {email, password};

    try {
      const res = await apiClient.post("/login", userData);

      if (res.status == 200) {
        alert("Login Successful");
        const {userId, token, role, options} = res.data;

        setUserId(userId);
        setUserRole(role);
        setUserOptions(options);

        Cookie.set("accessToken", token.accessToken);
        Cookie.set("refreshToken", token.refreshToken);

        router.push("/dashboard");
      } else {
        alert("Wrong Username or password")
      }
    } catch (err) {
      console.log(err)
      alert("Error while login the user data")
    }
  };

  // Registration
  const registerFunc = async (name: string, email: string, password: string) => {
    const userData = {name, email, password}

    try {
      const res = await apiClient.post("/signup", userData);

      if (res.status == 200) {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
      alert("Error Registering the user data")
    }
  };

  // Logout
  const logoutFunc = async () => {
    const refreshToken = Cookie.get("refreshToken");
    const res = await apiClient.post("/logout", {refreshToken});

    if (res.status === 200) {
      Cookie.remove("accessToken");
      Cookie.remove("refreshToken");

      router.push("/");
    }
  };

  const userInfo: any = {
    userId,
    userRole,
    userOptions,
    loginFunc,
    registerFunc,
    logoutFunc
  };

  return (
    <GlobalContext.Provider value={userInfo}>{children}</GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)