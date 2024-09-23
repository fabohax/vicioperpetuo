import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/menu";
import Reviews from "@/components/reviews";
import Wa from "@/components/wa";
import Footer from '@/components/footer';

const Contacto = () => {
  return (
    <div>
      {/* Header */}
      <header className="fixed top-3 left-4 z-200">
        <Link href="/" className="hover:underline font-medium">
          Vicio Perpetuo Vicio Perfecto
        </Link>
      </header>

      {/* Main Menu */}
      <Menu dark="true" />

      {/* Main Content */}
      <main className="mx-auto max-w-4xl py-16 px-4">
        
      </main>

    </div>
  );
};

export default Contacto;
