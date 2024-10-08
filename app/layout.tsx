import type { Metadata } from "next";
import { REM } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import fetchData from "./components/helpers/fetchData";
import {GoogleTagManager} from '@next/third-parties/google'
import {ReactNode} from "react";

const rem = REM({ subsets: ["latin"] });

export const metadata: Metadata = {
  authors: {
    url: new URL('https://www.impacte.com.br'),
  },
  title: "Dardanellos Empreendimentos",
  description: "A força do Mato Grosso agora no mercado imobiliário do litoral catarinense",
  metadataBase: new URL('https://dardanellosempreendimentos.com.br'),
  alternates: {
    canonical: '/'
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const data = await fetchData('page/1')

  return (
    <html lang="pt-BR">
      <body className={rem.className}>
        <GoogleTagManager gtmId="GTM-PFW9DFTD"/>
        <Header data={data.configs}/>
        {children}
        <Footer data={data.configs}/>
      </body>
    </html>
  );
}
