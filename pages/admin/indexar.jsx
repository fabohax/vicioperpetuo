import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient"; 

export default function Catalogar() {
  const { data: session } = useSession();
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, description, price, isbn, year, pages, ratio, editorial, imgurl } = bookData;

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
          isbn, 
          year, 
          pages, 
          ratio,
          editorial,
          imgurl: sanitizedImgUrl // Make sure imgurl is properly formatted
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
        isbn: '',
        year: '',
        pages: '',
        ratio: '',
        editorial: '',
        imgurl: '',
      });
    }
};


  if (session) {
    return (
      <>
        <div>
          <div className="flex flex-row fixed top-8 left-8 gap-2 space-x-8">
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
          </div>
          <button onClick={() => signOut()} className="fixed top-0 right-8 hover:bg-black hover:text-white my-8 border-[1px] border-black rounded-full px-4 py-2 text-sm">
            CERRAR SESIÓN
          </button>

          <div className="lg:w-1/3 mx-auto px-8 my-28">
            <h1 className="spectral text-2xl">Añadir Libro</h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input name="imgurl" type="text" placeholder="URL de Imagen de Portada" value={bookData.imgurl} onChange={handleChange} className="w-full p-2 border rounded-md p-4" />
              <input name="title" type="text" placeholder="Título" value={bookData.title} onChange={handleChange} className="w-full p-2 border rounded-md p-4" required />
              <input name="author" type="text" placeholder="Autor" value={bookData.author} onChange={handleChange} className="w-full p-2 border rounded-md p-4" required />
              <textarea name="description" placeholder="Descripción" value={bookData.description} onChange={handleChange} className="w-full p-2 border rounded-md p-4"></textarea>
              <input name="price" type="number" placeholder="Precio" value={bookData.price} onChange={handleChange} className="w-full p-2 border rounded-md p-4" />
              <input name="isbn" type="text" placeholder="ISBN" value={bookData.isbn} onChange={handleChange} className="w-full p-2 border rounded-md p-4" />
              <input name="year" type="number" placeholder="Año" value={bookData.year} onChange={handleChange} className="w-full p-2 border rounded-md p-4" />
              <input name="pages" type="number" placeholder="Páginas" value={bookData.pages} onChange={handleChange} className="w-full p-2 border rounded-md p-4" />
              <input name="ratio" type="text" placeholder="Dimensiones" value={bookData.ratio} onChange={handleChange} className="w-full p-2 border rounded-md p-4" />
              <input name="editorial" type="text" placeholder="Editorial" value={bookData.editorial} onChange={handleChange} className="w-full p-2 border rounded-md p-4" />
              <button type="submit" className="hover:bg-black text-white bg-gray-900 px-4 py-2 rounded w-full py-4">Insertar Libro</button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="my-72 mx-auto text-center">
        <button onClick={() => signIn()} className="hover:bg-white hover:text-black rounded-full border-2 border-white px-4 py-2 my-8">Iniciar Sesión</button>
      </div>
    </>
  );
}
