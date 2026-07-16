import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { signInAsAdmin } from "@/utils/adminAuth";
import { CheckCircle2, ChevronDown, LogOut } from "lucide-react";
import PinataImageUpload from "@/components/PinataImageUpload";
import LoadingSpinner from "@/components/LoadingSpinner";

const AVAILABLE_GENRES = ["Poesía", "Narrativa", "Cuento", "Dramaturgia"];
const AVAILABLE_EDITORIALS = ["Vicio Perpetuo Vicio Perfecto", "Infinito"];

type BookData = {
  title: string;
  author: string;
  description: string;
  price: string;
  gender: string;
  isbn: string;
  year: string;
  pages: string;
  ratio: string;
  editorial: string;
  imgurl: string;
};

export default function EditBook() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [bookData, setBookData] = useState<BookData>({
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
  const [saveMessage, setSaveMessage] = useState("");
  const [isBookLoading, setIsBookLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (id) {
      const fetchBookData = async () => {
        setIsBookLoading(true);
        const routeId = Array.isArray(id) ? id[0] : id;
        const query = supabase.from('vpvp_books').select('*');
        const { data, error } = /^\d+$/.test(routeId)
          ? await query.eq('id', routeId).single()
          : await query.eq('isbn', routeId).single();
          
        if (error) {
          console.error("Error fetching book data:", error.message);
        } else {
          setBookData(data);
        }
        setIsBookLoading(false);
      };
  
      fetchBookData();
    }
  }, [id, router.isReady]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSaveMessage("");
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (imgurl: string) => {
    setSaveMessage("");
    setBookData((prevData) => ({ ...prevData, imgurl }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, author, description, price, gender, year, pages, ratio, editorial, imgurl } = bookData;

    if (!title || !author) {
      alert("Title and Author are required");
      return;
    }

    const bookId = (bookData as BookData & { id?: number | string }).id;
    if (!bookId) {
      alert("No se pudo identificar el libro para actualizar.");
      return;
    }

    const { data, error } = await supabase
      .from('vpvp_books')
      .update({
        title,
        author,
        description,
        price,
        gender,
        year,
        pages,
        ratio,
        editorial,
        imgurl: imgurl.trim(),
      })
      .eq('id', bookId)
      .select('id, isbn')
      .single();

      if (error) {
        console.error("Error updating book data in Supabase:", error.message);
        alert("Error al guardar: " + error.message);
      }
       else {
      setSaveMessage("Cambios guardados correctamente.");
      router.push("/admin");
    }
  };

  if (status === "loading" || (session && isBookLoading)) {
    return <LoadingSpinner className="min-h-screen bg-black text-white" label="Cargando libro" />;
  }

  if (session) {
    return (
      <div className="min-h-screen bg-black px-4 py-6 text-[#e6edf3] sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="fixed left-4 top-8 z-10 flex flex-row flex-wrap gap-3 rounded-md border border-[#30363d] bg-[#0d1117]/90 px-3 py-2 text-sm text-white shadow-sm backdrop-blur sm:left-8 sm:gap-5">
            <div>👤 <Link href="/admin" className="hover:underline">
              {session?.user?.email?.split('@')[0] || 'NN'}
            </Link></div>
            <div>📇 <Link href="/admin/indexar" className="hover:underline">Indexar</Link></div>
            <div>🪶 <Link href="/admin/autores" className="hover:underline">Autores</Link></div>
            <div>🧾 <Link href="/admin/pedidos" className="hover:underline">Pedidos</Link></div>
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
              <h1 className="spectral text-2xl font-bold text-white">Editar Libro</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 p-4 sm:grid-cols-2">
              <PinataImageUpload
                value={bookData.imgurl}
                onChange={handleImageChange}
                emptyMessage="Sube una portada con resolución máxima de 1000px de ancho."
                allowUrlInput={false}
              />
              <input
                name="title"
                type="text"
                placeholder={bookData.title || "Título"}
                value={bookData.title}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-transparent px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff] sm:col-span-2"
                required
              />
              <input
                name="author"
                type="text"
                placeholder={bookData.author || "Autor"}
                value={bookData.author}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-transparent px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff] sm:col-span-2"
                required
              />
              <textarea
                name="description"
                placeholder={bookData.description || "Descripción"}
                value={bookData.description}
                onChange={handleChange}
                className="min-h-36 w-full rounded-md border border-[#30363d] bg-transparent px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff] sm:col-span-2"
              />
              <input
                name="price"
                type="number"
                placeholder={bookData.price || "Precio"}
                value={bookData.price}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-transparent px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
              />
              <div className="relative">
                <select
                  name="gender"
                  value={bookData.gender}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-md border border-[#30363d] bg-transparent py-3 pl-4 pr-12 text-white outline-none focus:border-[#58a6ff]"
                >
                  <option value="">Género</option>
                  {AVAILABLE_GENRES.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden="true" />
              </div>
              <input
                name="year"
                type="number"
                placeholder={bookData.year || "Año"}
                value={bookData.year}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-transparent px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
              />
              <input
                name="pages"
                type="number"
                placeholder={bookData.pages || "Páginas"}
                value={bookData.pages}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-transparent px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
              />
              <input
                name="ratio"
                type="text"
                placeholder={bookData.ratio || "Dimensiones"}
                value={bookData.ratio}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-transparent px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
              />
              <div className="relative">
                <select
                  name="editorial"
                  value={bookData.editorial}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-md border border-[#30363d] bg-transparent py-3 pl-4 pr-12 text-white outline-none focus:border-[#58a6ff]"
                >
                  <option value="">Editorial</option>
                  {AVAILABLE_EDITORIALS.map((editorial) => (
                    <option key={editorial} value={editorial}>
                      {editorial}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden="true" />
              </div>
              <button type="submit" className="w-full rounded-md bg-[#238636] px-4 py-3 font-semibold text-white hover:bg-[#2ea043] sm:col-span-2">
                Actualizar Libro
              </button>
              {saveMessage ? (
                <p className="inline-flex items-center gap-2 text-sm font-medium text-[#3fb950] sm:col-span-2">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  {saveMessage}
                </p>
              ) : null}
              <p className="text-sm text-[#8b949e] sm:col-span-2">
                <Link href={`/o/${bookData.isbn}`} className="text-[#58a6ff] hover:underline">
                  vicioperpetuo.com/o/{bookData.isbn}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-72 mx-auto text-center">
      <button onClick={() => signInAsAdmin(router.asPath)} className="hover:bg-white hover:text-black rounded-full border-2 border-white px-4 py-2 my-8">
        Iniciar Sesión
      </button>
    </div>
  );
}
