import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Material UI",
  description: "This is Material UI page",
};

export default function MuiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
