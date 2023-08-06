"use client";
import Link from "next/link";
import { Inter } from "next/font/google";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useGlobalContext } from "./Context/store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { userId, setUserId, data, setData } = useGlobalContext();

  useEffect(() => {
    setUserId("2");
    setData([
      { firstName: "rafsan" },
      { firstName: "farsad" },
      { firstName: "raiyan" },
    ]);
  }, [setData, setUserId]);

  return (
    <div className={inter.className}>
      <h1>Home</h1>
      <span>
        <p>User Id: {userId}</p>
        <p>First name: </p>
        {data.map((e, i) => (
          <p key={i}>{e.firstName}</p>
        ))}
      </span>
      <Link href="/material">Link to Mui Page</Link> <br />
      <Link href="/about">Link to About Page</Link>
      <br />
      <Button variant="contained">Hello World</Button>
    </div>
  );
}
