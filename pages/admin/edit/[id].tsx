import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { signInAsAdmin } from "@/utils/adminAuth";
import { LogOut } from "lucide-react";
import PinataImageUpload from "@/components/PinataImageUpload";

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
  const { data: session } = useSession();
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

  useEffect(() => {
    if (id) {
      const fetchBookData = async () => {
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
      };
  
      fetchBookData();
    }
  }, [id]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (imgurl: string) => {
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
      alert("Libro actualizado correctamente.");
      router.push("/admin");
    }
  };

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
              <PinataImageUpload value={bookData.imgurl} onChange={handleImageChange} />
              <input
                name="title"
                type="text"
                placeholder={bookData.title || "Título"}
                value={bookData.title}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff] sm:col-span-2"
                required
              />
              <input
                name="author"
                type="text"
                placeholder={bookData.author || "Autor"}
                value={bookData.author}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff] sm:col-span-2"
                required
              />
              <textarea
                name="description"
                placeholder={bookData.description || "Descripción"}
                value={bookData.description}
                onChange={handleChange}
                className="min-h-36 w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff] sm:col-span-2"
              />
              <input
                name="price"
                type="number"
                placeholder={bookData.price || "Precio"}
                value={bookData.price}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
              />
              <input
                name="gender"
                type="text"
                placeholder={bookData.gender || "Género"}
                value={bookData.gender}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
              />
              <input
                name="year"
                type="number"
                placeholder={bookData.year || "Año"}
                value={bookData.year}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
              />
              <input
                name="pages"
                type="number"
                placeholder={bookData.pages || "Páginas"}
                value={bookData.pages}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
              />
              <input
                name="ratio"
                type="text"
                placeholder={bookData.ratio || "Dimensiones"}
                value={bookData.ratio}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
              />
              <input
                name="editorial"
                type="text"
                placeholder={bookData.editorial || "Editorial"}
                value={bookData.editorial}
                onChange={handleChange}
                className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
              />
              <button type="submit" className="w-full rounded-md bg-[#238636] px-4 py-3 font-semibold text-white hover:bg-[#2ea043] sm:col-span-2">
                Actualizar Libro
              </button>
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
