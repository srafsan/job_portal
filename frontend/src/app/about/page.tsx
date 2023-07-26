import React from "react";
import Link from "next/link";

const About = () => {
  // throw new Error("Not todays");
  return (
    <>
      <h1>About</h1>
      <Link href="/">Link to home page</Link>
      <Link href="/material">Link to MUI page</Link>
    </>
  );
};

export default About;
