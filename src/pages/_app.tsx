import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  //"../public/fonts/DS-Digital.woff2"
  return <Component {...pageProps} />;
}
