import React from "react";
import {useRouter} from "next/navigation";
import Hero from "@/components/Home/Hero";
import DesiredCategory from "@/components/Home/DesiredCategory";


const Home = () => {
  const router = useRouter()

  const handleClick = () => {
    console.log("Placing your order");
    router.push("/product")
  }
  return (
    <>
      <Hero/>
      <DesiredCategory/>
    </>
  );
};

export default Home;
