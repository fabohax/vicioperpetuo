// page.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/menu";
import BookCovers from "@/components/BookCovers";
import PModal from '@/components/postularModal'

const Page = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      setParallaxOffset(reducedMotion.matches ? 0 : Math.min(window.scrollY * 0.22, 140));
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", handleScroll, { passive: true });
    reducedMotion.addEventListener("change", updateParallax);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      reducedMotion.removeEventListener("change", updateParallax);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div>
      {/* Header */}
      <header
        className="fixed left-4 top-3 max-w-[calc(100vw-7rem)] overflow-hidden sm:max-w-[calc(100vw-13rem)]"
        style={{ zIndex: 2147483647 }}
      >
        <Link
          href="/"
          className="inline-block max-w-full truncate bg-[#111]/85 px-1 font-medium leading-6 hover:underline"
        >
          Vicio Perpetuo Vicio Perfecto
        </Link>
      </header>

      {/* Main Menu */}
      <Menu dark="false" />

      {/* Logo Section */}
      <div className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute -inset-x-8 -inset-y-20 -z-10 will-change-transform"
          style={{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
        >
          <Image
            src="/viciope-bg.png"
            fill
            priority
            alt=""
            aria-hidden="true"
            className="object-cover object-center opacity-90"
            sizes="100vw"
          />
        </div>
        <Image
          src="/logo.svg"
          height={210}
          width={210}
          alt="Vicio Perpetuo Vicio Perfecto Logo"
          className="my-36 drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
          style={{ width: "210px", height: "auto" }}
        />
      </div>

      {/* Book Covers Grid */}
      <BookCovers />

      {/* Quote Section */}
      <section className="text-center mx-auto px-8 py-24">
        <blockquote className="spectral text-3xl italic leading-relaxed">
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
      <button onClick={openModal}
        id="postular" className="items-center text-center border-[1px] border-[#fff] p-2 mb-8 block px-6 py-3 bg-[#f4510ff] text-white rounded-full text-lg mx-auto hover:underline mx-auto">
          Publica con Nosotros
      </button>
      <PModal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Page;
