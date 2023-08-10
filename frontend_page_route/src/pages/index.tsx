import React from "react";
import Link from "next/link"
import {useRouter} from "next/navigation";

const Home = () => {
  const router = useRouter()

  const handleClick = () => {
    console.log("Placing your order");
    router.push("/product")
  }
  return <div>
    Home Page
    <Link href="/blog">
      Blog
    </Link>
    <Link href="/product">
      Products
    </Link>
    <button onClick={handleClick}>Place Order</button>
  </div>;
};

export default Home;
