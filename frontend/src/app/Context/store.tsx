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

type DataType = {
  firstName: string;
};

interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
  loginFunc: (...args: any[]) => any;
}

const GlobalContext = createContext<ContextProps>({
  userId: "",
  setUserId: (): string => "",
  data: [],
  setData: (): DataType[] => [],
  loginFunc: function (...args: any[]) {
    throw new Error("Function not implemented.");
  },
});

export const GlobalContextProvider = ({ children }: any) => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [data, setData] = useState<[] | DataType>([]);

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
        const { token } = res.data;

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

  const userInfo: any = {
    userId,
    setUserId,
    data,
    setData,
    loginFunc,
  };

  return (
    <GlobalContext.Provider value={userInfo}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
