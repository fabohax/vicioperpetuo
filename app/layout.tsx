import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";

import Wa from "@/components/wa";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vicio Perpetuo Vicio Perfecto | Editorial",
  description: "Editorial peruana resaltando cultura generacional",
  openGraph: {
    title: "Vicio Perpetuo Vicio Perfecto | Editorial",
    description: "La editorial de libros más vendida en el Perú. Fundada el 15 de enero del 2011, nuestra editorial tiene como objetivo promover a autores peruanos y transmitir nuestra identidad nacional a través de la literatura. Nos enfocamos en temas como costumbres, historia, danzas, cultura culinaria, climas, idiomas, fauna y flora, y todo lo que representa ser peruano y el concepto de Perú.",
    url: "https://vicioperpetuo.com",
    type: "website",
    images: [
      {
        url: "https://vicioperpetuo.com/public/vicio.png",
        width: 1200,
        height: 630,
        alt: "Vicio Perpetuo Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vicio Perpetuo Vicio Perfecto | Editorial",
    description: "La editorial de libros más vendida en el Perú. Fundada el 15 de enero del 2011, nuestra editorial tiene como objetivo promover a autores peruanos y transmitir nuestra identidad nacional a través de la literatura. Nos enfocamos en temas como costumbres, historia, danzas, cultura culinaria, climas, idiomas, fauna y flora, y todo lo que representa ser peruano y el concepto de Perú.",
    images: ["https://vicioperpetuo.com/public/vicio.png"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Footer />
        <Wa />
      </body>
    </html>
  );
}
