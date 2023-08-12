import React from "react";
import {useRouter} from "next/navigation";
import Hero from "@/components/Hero/Hero";

const Home = () => {
  const router = useRouter()

  const handleClick = () => {
    console.log("Placing your order");
    router.push("/product")
  }
  return (
    <>
      <Hero/>
    </>
  );
};

export default Home;
