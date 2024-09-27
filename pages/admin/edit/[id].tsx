import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";

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
  const { isbn } = router.query;

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
    if (isbn) {
      const fetchBookData = async () => {
        const { data, error } = await supabase
          .from('vpvp_books')
          .select('*')
          .eq('isbn', isbn)
          .single();
          
        if (error) {
          console.error("Error fetching book data:", error.message);
        } else {
          setBookData(data);
        }
      };
  
      fetchBookData();
    }
  }, [isbn]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, author, description, price, gender, year, pages, ratio, editorial, imgurl } = bookData;

    if (!title || !author) {
      alert("Title and Author are required");
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
      .eq('isbn', isbn);

      if (error) {
        console.error("Error fetching book data from Supabase:", error.message);
      }
       else {
      alert("Book updated successfully!");
    }
  };

  if (session) {
    return (
      <>
        <div>
          <div className="flex flex-row fixed top-8 left-8 gap-2 space-x-8">
            <div>👤 <Link href="/admin" className="hover:underline">
              {session?.user?.email?.split('@')[0] || 'NN'}
            </Link></div>
            <div>📇 <Link href="/admin/indexar" className="hover:underline">Indexar</Link></div>
            <div>🪶 <Link href="/admin/autores" className="hover:underline">Autores</Link></div>
          </div>
          <button onClick={() => signOut()} className="fixed top-0 right-8 hover:bg-black hover:text-white my-8 border-[1px] border-black rounded-full px-4 py-2 text-sm">
            CERRAR SESIÓN
          </button>

          <div className="lg:w-1/3 mx-auto px-8 my-28">
            <h1 className="spectral text-2xl">Editar Libro</h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                name="imgurl"
                type="text"
                placeholder={bookData.imgurl || "URL de Imagen de Portada"}
                value={bookData.imgurl}
                onChange={handleChange}
                className="w-full px-2 py-72 bg-[#f5f5f5] text-center border rounded-md p-4"
                style={{
                  backgroundImage: `url(${bookData.imgurl || '/default-cover.jpg'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <input
                name="title"
                type="text"
                placeholder={bookData.title || "Título"}
                value={bookData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md p-4"
                required
              />
              <input
                name="author"
                type="text"
                placeholder={bookData.author || "Autor"}
                value={bookData.author}
                onChange={handleChange}
                className="w-full p-2 border rounded-md p-4"
                required
              />
              <textarea
                name="description"
                placeholder={bookData.description || "Descripción"}
                value={bookData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md p-4"
              />
              <input
                name="price"
                type="number"
                placeholder={bookData.price || "Precio"}
                value={bookData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded-md p-4"
              />
              <input
                name="gender"
                type="text"
                placeholder={bookData.gender || "Género"}
                value={bookData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-md p-4"
              />
              <input
                name="year"
                type="number"
                placeholder={bookData.year || "Año"}
                value={bookData.year}
                onChange={handleChange}
                className="w-full p-2 border rounded-md p-4"
              />
              <input
                name="pages"
                type="number"
                placeholder={bookData.pages || "Páginas"}
                value={bookData.pages}
                onChange={handleChange}
                className="w-full p-2 border rounded-md p-4"
              />
              <input
                name="ratio"
                type="text"
                placeholder={bookData.ratio || "Dimensiones"}
                value={bookData.ratio}
                onChange={handleChange}
                className="w-full p-2 border rounded-md p-4"
              />
              <input
                name="editorial"
                type="text"
                placeholder={bookData.editorial || "Editorial"}
                value={bookData.editorial}
                onChange={handleChange}
                className="w-full p-2 border rounded-md p-4"
              />
              <button type="submit" className="hover:bg-black text-white bg-gray-900 px-4 py-2 rounded w-full py-4">
                Actualizar Libro
              </button>
              <p><Link href={`/o/${bookData.isbn})`}>vicioperpetuo.com/o/{bookData.isbn}</Link></p>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="my-72 mx-auto text-center">
      <button onClick={() => signIn()} className="hover:bg-white hover:text-black rounded-full border-2 border-white px-4 py-2 my-8">
        Iniciar Sesión
      </button>
    </div>
  );
}
