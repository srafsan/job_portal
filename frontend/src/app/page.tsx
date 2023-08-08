import Link from "next/link";
import { Inter } from "next/font/google";
import Button from "@mui/material/Button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={inter.className}>
      <h1>Home</h1>
      <Link href="/material">Link to Mui Page</Link> <br />
      <Link href="/about">Link to About Page</Link>
      <br />
      <Button variant="contained">Hello World</Button>
    </div>
  );
}
