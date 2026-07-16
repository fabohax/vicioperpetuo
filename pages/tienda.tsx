import { useState, useEffect } from "react";
import Link from "next/link";
import Menu from "@/components/menu";
import BookCovers from "@/components/BookCovers";
import LoadingSpinner from "@/components/LoadingSpinner";
import { supabase } from "@/utils/supabaseClient";
import { Seo } from "@/lib/seo";

interface Book {
  title: string;
  isbn: string;
  imgurl: string;
}

const Tienda = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch book data from Supabase
  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('vpvp_books')
        .select('title, isbn, imgurl');

      if (error) {
        console.error("Error fetching books:", error.message);
      } else {
        setBooks(data || []);
      }

      setLoading(false);
    };

    fetchBooks();
  }, []);

  if (loading) return <LoadingSpinner className="h-screen" label="Cargando tienda" />;

  return (
    <div>
      <Seo
        title="Tienda de libros | Vicio Perpetuo Vicio Perfecto"
        description="Compra libros de poesia, narrativa y cuento publicados por la editorial peruana Vicio Perpetuo Vicio Perfecto."
        path="/tienda"
      />
      {/* Header */}
      <header className="fixed top-3 left-4 z-200">
        <Link href="/" className="hover:underline font-medium">
          Vicio Perpetuo Vicio Perfecto
        </Link>
      </header>
      
      {/* Main Menu */}
      <Menu dark="true" />

      {/* Book Covers Grid */}
      <BookCovers/>

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

export default Tienda;
