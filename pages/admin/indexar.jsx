import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient"; 
import { useRouter } from "next/router";
import { signInAsAdmin } from "@/utils/adminAuth";
import { ChevronDown, LogOut } from "lucide-react";
import PinataImageUpload from "@/components/PinataImageUpload";
import LoadingSpinner from "@/components/LoadingSpinner";

const AVAILABLE_GENRES = ["Poesía", "Narrativa", "Cuento", "Dramaturgia"];
const AVAILABLE_EDITORIALS = ["Vicio Perpetuo Vicio Perfecto", "Infinito"];

export default function Catalogar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    gender: '',
    isbn: '',
    year: '',
    pages: '',
    ratio:'',
    editorial:'',
    imgurl: '',
  });

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (imgurl) => {
    setBookData((currentData) => ({ ...currentData, imgurl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, description, price, gender, isbn, year, pages, ratio, editorial, imgurl } = bookData;

    if (!title || !author) {
      alert("Title and Author are required");
      return;
    }

    // Sanitize imgurl if necessary
    const sanitizedImgUrl = imgurl.trim();

    const { data, error } = await supabase
      .from('vpvp_books')
      .insert([
        { 
          title, 
          author, 
          description, 
          price, 
          gender,
          isbn, 
          year, 
          pages, 
          ratio,
          editorial,
          imgurl: sanitizedImgUrl 
        }
      ]);

    if (error) {
      alert("Error inserting book: " + error.message);
    } else {
      alert("Book inserted successfully!");
      setBookData({
        title: '',
        author: '',
        description: '',
        price: '',
        gender: '',
        isbn: '',
        year: '',
        pages: '',
        ratio: '',
        editorial: '',
        imgurl: '',
      });
    }
};


  if (status === "loading") {
    return <LoadingSpinner className="min-h-screen bg-black text-white" label="Cargando admin" />;
  }

  if (session) {
    return (
      <div className="min-h-screen bg-black px-4 py-6 text-[#e6edf3] sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="fixed left-4 top-8 z-10 flex flex-row flex-wrap gap-3 rounded-md border border-[#30363d] bg-[#0d1117]/90 px-3 py-2 text-sm text-white shadow-sm backdrop-blur sm:left-8 sm:gap-5">
            <div>👤 <Link href="/admin" className="hover:underline">
            {session?.user?.email?.split('@')[0] || 'NN'}
            </Link>
            </div>
            <div>
            📇 <Link href="/admin/indexar" className="hover:underline">Indexar</Link>
            </div>
            <div>
            🪶 <Link href="/admin/autores" className="hover:underline">Autores</Link>
            </div>
            <div>
            🧾 <Link href="/admin/pedidos" className="hover:underline">Pedidos</Link>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="fixed right-4 top-0 z-10 my-8 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#30363d] bg-[#0d1117]/90 text-white backdrop-blur hover:border-[#8b949e] hover:bg-[#161b22] sm:right-8"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="my-28 overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
            <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-3">
              <h1 className="spectral text-2xl font-bold text-white">Añadir Libro</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 p-4 sm:grid-cols-2">
              <PinataImageUpload value={bookData.imgurl} onChange={handleImageChange} />
              <input name="title" type="text" placeholder="Título" value={bookData.title} onChange={handleChange} className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff] sm:col-span-2" required />
              <input name="author" type="text" placeholder="Autor" value={bookData.author} onChange={handleChange} className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff] sm:col-span-2" required />
              <textarea name="description" placeholder="Descripción" value={bookData.description} onChange={handleChange} className="min-h-36 w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff] sm:col-span-2"></textarea>
              <input name="price" type="number" placeholder="Precio" value={bookData.price} onChange={handleChange} className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]" />
              <div className="relative">
                <select name="gender" value={bookData.gender} onChange={handleChange} className="w-full appearance-none rounded-md border border-[#30363d] bg-[#010409] py-3 pl-4 pr-12 text-white outline-none focus:border-[#58a6ff]">
                  <option value="">Género</option>
                  {AVAILABLE_GENRES.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden="true" />
              </div>
              <input name="isbn" type="text" placeholder="ISBN" value={bookData.isbn} onChange={handleChange} className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]" />
              <input name="year" type="number" placeholder="Año" value={bookData.year} onChange={handleChange} className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]" />
              <input name="pages" type="number" placeholder="Páginas" value={bookData.pages} onChange={handleChange} className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]" />
              <input name="ratio" type="text" placeholder="Dimensiones" value={bookData.ratio} onChange={handleChange} className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]" />
              <div className="relative sm:col-span-2">
                <select name="editorial" value={bookData.editorial} onChange={handleChange} className="w-full appearance-none rounded-md border border-[#30363d] bg-[#010409] py-3 pl-4 pr-12 text-white outline-none focus:border-[#58a6ff]">
                  <option value="">Editorial</option>
                  {AVAILABLE_EDITORIALS.map((editorial) => (
                    <option key={editorial} value={editorial}>
                      {editorial}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden="true" />
              </div>
              <button type="submit" className="w-full rounded-md bg-[#238636] px-4 py-3 font-semibold text-white hover:bg-[#2ea043] sm:col-span-2">Insertar Libro</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="my-72 mx-auto text-center">
        <button onClick={() => signInAsAdmin(router.asPath)} className="hover:bg-white hover:text-black rounded-full border-2 border-white px-4 py-2 my-8">Iniciar Sesión</button>
      </div>
    </>
  );
}
