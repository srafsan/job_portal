import type {AppProps} from "next/app";
import {GlobalContextProvider} from "@/context/myContext";
import {usePathname} from "next/navigation";
import Navbar from "@/components/Shared/Navbar/Navbar";
import Footer from "@/components/Shared/Footer/Footer";

export default function App({Component, pageProps}: AppProps) {
  const regex = /^\/dashboard(\/.*)?$/;

  const currentRoute = usePathname();
  let show = regex.test(currentRoute);

  return (
    <GlobalContextProvider>
      {!show && <Navbar/>}
      <Component {...pageProps} />
      {!show && <Footer/>}
    </GlobalContextProvider>
  )

}
