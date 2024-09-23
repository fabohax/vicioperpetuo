import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
}

interface Author {
  id: number;
  name: string;
  imgurl: string;
}

export default function Admin() {
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loadingA, setLoadingA] = useState(true);
  const [loadingB, setLoadingB] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase.from('vpvp_books').select('id, title, author, isbn');
        if (error) throw error;
        setBooks(data || []);
      } catch (error) {
        setErrorMessage('Error fetching books.');
      } finally {
        setLoadingA(false);
      }
    };

    const fetchAuthors = async () => {
      try {
        const { data, error } = await supabase.from('vpvp_authors').select('id, name, imgurl');
        if (error) throw error;
        setAuthors(data || []);
      } catch (error) {
        setErrorMessage('Error fetching authors.');
      } finally {
        setLoadingB(false);
      }
    };

    fetchBooks();
    fetchAuthors();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      const { error } = await supabase.from('vpvp_books').delete().eq('id', id);
      if (error) throw error;
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error removing book:', (error as any).message);
    }
  };

  const handleRemoveAuthor = async (id: number) => {
    try {
      const { error } = await supabase.from('vpvp_authors').delete().eq('id', id);
      if (error) throw error;
      setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== id));
    } catch (error) {
      console.error('Error removing author:', (error as any).message);
    }
  };

  if (session) {
    return (  
      <div className="">
        
          <div className="flex flex-row fixed top-8 left-8 gap-2 space-x-8 backdrop-blur bg-white/30">
            <div>👤 <Link href="/admin" className="hover:underline">
              {session?.user?.email?.split('@')[0] || 'NN'}
            </Link>
            </div>
            <div>📇 <Link href="/admin/indexar" className="hover:underline">Indexar</Link></div>
            <div>🧾 <Link href="/admin/pedidos" className="hover:underline">Pedidos</Link></div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="fixed top-0 right-8 hover:bg-black hover:text-white my-8 border-[1px] border-black rounded-full px-4 py-2 text-sm backdrop-blur bg-white/30"
          >
            CERRAR SESIÓN
          </button>
        


        {/* Book List */}
        <h1 className="spectral text-2xl font-bold text-left mt-20 mx-8">Vicio Perpetuo Vicio Perfecto Index</h1>
        <p className="mx-8">Aquí puedes revisar la lista completa de Libros y Autores de la Editorial.</p>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <div className="grid grid-col lg:grid-cols-2 container mx-auto p-4 my-4 px-4 lg:w-full border-[1px] border-[#777] py-4 rounded-lg">
          <div className="py-2">
            <h3 className="border-[1px] border-[#777] bg-[#f0f0f0] rounded-md px-4 mr-4">Libros</h3>
            {loadingA ? <p className="p-2">Cargando libros...</p> : (
              books.length ? (
                <ul className="space-y-2">
                  {books.map((book) => (
                    <li key={book.id} className="flex justify-between items-center px-4 py-2 bg-gray-100 border-[1px] border-[#777] bg-[#f3f3f3] rounded-md rounded-lg mr-4 mt-2">
                      <div>
                        <Link href={`/o/${book.isbn}`} className="text-xl hover:underline">
                          <span className="font-bold">{book.title}</span> de {book.author}
                        </Link>
                      </div>
                      <button
                        onClick={() => handleRemove(book.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              ) : <p>No books available.</p>
            )}
            <Link href="/admin/indexar">
              <div className="flex justify-between items-center p-4 bg-gray-100 border-[1px] border-[#777] bg-[#f3f3f3] rounded-md rounded-lg mr-4 mt-2 hover:bg-green-500">
                + Añadir otro libro
              </div>
            </Link>
          </div>

          <div className="py-2">
            <h3 className="border-[1px] border-[#777] bg-[#f0f0f0] rounded-md px-4">Autores</h3>
            {loadingB ? <p className="p-2">Cargando autores...</p> : (
              authors.length ? (
                <ul className="space-y-2">
                  {authors.map((author) => (
                    <li key={author.id} className="flex justify-between items-center px-4 py-2 bg-gray-100 border-[1px] border-[#777] bg-[#f3f3f3] rounded-md rounded-lg mt-2">
                      <div>
                        <span className="font-bold">{author.name}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveAuthor(author.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              ) : <p>No authors available.</p>
            )}
            <Link href="/admin/autores">
              <div className="flex justify-between items-center p-4 bg-gray-100 border-[1px] border-[#777] bg-[#f3f3f3] rounded-md rounded-lg mt-2 hover:bg-green-500">
                + Añadir otro autor
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-72 mx-auto text-center">
      <button onClick={() => signIn()} className="hover:bg-white hover:text-black rounded-full border-2 border-white px-4 py-2 my-8">Entrar a Panel de Control</button>
    </div>
  );
}
