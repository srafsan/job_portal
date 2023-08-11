import React from "react";
import Link from "next/link"
import {useRouter} from "next/navigation";
import Navbar from "@/components/Shared/Navbar/Navbar";
import Footer from "@/components/Shared/Footer/Footer";

const Home = () => {
  const router = useRouter()

  const handleClick = () => {
    console.log("Placing your order");
    router.push("/product")
  }
  return <div>
    <Navbar/>
    <Footer/>
  </div>;
};

export default Home;
