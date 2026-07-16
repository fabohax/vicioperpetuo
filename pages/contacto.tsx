import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/menu";
import Reviews from "@/components/reviews";
import Wa from "@/components/wa";
import Footer from '@/components/footer';
import { Seo } from "@/lib/seo";

const Contacto = () => {
  return (
    <div>
      <Seo
        title="Contacto | Vicio Perpetuo Vicio Perfecto"
        description="Contacta a Vicio Perpetuo Vicio Perfecto para consultas sobre libros, compras, servicios editoriales y publicacion."
        path="/contacto"
      />
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
