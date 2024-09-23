// page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/menu";
import BookCovers from "@/components/BookCovers";

const Page = () => {
  return (
    <div>
      {/* Header */}
      <header className="fixed top-3 left-4 z-200">
        <Link href="/" className="hover:underline font-medium">
          Vicio Perpetuo Vicio Perfecto
        </Link>
      </header>

      {/* Main Menu */}
      <Menu dark="false" />

      {/* Logo Section */}
      <div className="flex flex-col justify-center items-center h-screen">
        <Image
          src="/logo.svg"
          height={210}
          width={210}
          alt="Vicio Perpetuo Vicio Perfecto Logo"
          className="my-36"
        />
      </div>

      {/* Book Covers Grid */}
      <BookCovers />

      {/* Quote Section */}
      <section className="text-center mx-auto px-8 py-24">
        <blockquote className="text-lg italic leading-relaxed">
          <p>No es este tu país</p>
          <p>porque conozcas sus linderos,</p>
          <p>ni por el idioma común,</p>
          <p>ni por los nombres de sus muertos.</p>
          <p>Es este tu país,</p>
          <p>porque si tuvieras que hacerlo,</p>
          <p>lo elegirías de nuevo</p>
          <p>para construir aquí</p>
          <p>todos tus sueños.</p>
        </blockquote>
        <p className="mt-8 text-xl font-semibold">Marco Martos</p>
      </section>
    </div>
  );
};

export default Page;
