import React from "react";
import Link from "next/link"
import {useRouter} from "next/navigation";
import Navbar from "@/components/Shared/Navbar/Navbar";

const Home = () => {
  const router = useRouter()

  const handleClick = () => {
    console.log("Placing your order");
    router.push("/product")
  }
  return <div>
    <Navbar/>
  </div>;
};

export default Home;
