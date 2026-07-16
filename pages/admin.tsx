import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { supabase } from "@/utils/supabaseClient";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signInAsAdmin } from "@/utils/adminAuth";
import AdminNav from "@/components/AdminNav";
import LoadingSpinner from "@/components/LoadingSpinner";

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

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  );
}

export default function Admin() {
  const { data: session, status } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loadingA, setLoadingA] = useState(true);
  const [loadingB, setLoadingB] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookPendingDelete, setBookPendingDelete] = useState<Book | null>(null);
  const [isDeletingBook, setIsDeletingBook] = useState(false);
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
    setIsDeletingBook(true);
    try {
      const { error } = await supabase.from('vpvp_books').delete().eq('id', id);
      if (error) throw error;
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      setBookPendingDelete(null);
    } catch (error) {
      console.error('Error removing book:', (error as any).message);
    } finally {
      setIsDeletingBook(false);
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

  if (status === "loading" || (session && (loadingA || loadingB))) {
    return <LoadingSpinner className="min-h-screen bg-black text-white" label="Cargando admin" />;
  }

  if (session) {
    return (  
      <div className="min-h-screen bg-black px-4 py-6 text-[#e6edf3] sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
        
          <AdminNav signOutCallbackUrl="/" />
        


        {/* Book List */}
        <h1 className="spectral mt-20 text-left text-5xl font-bold text-white">Vicio Perpetuo Vicio Perfecto Index</h1>
        <br/><p className="text-[#8b949e]">Aquí puedes revisar la lista completa de Libros y Autores de la Editorial.</p>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <div className="mb-16 mt-6 grid w-full grid-cols-1 gap-6 lg:mb-24 lg:mt-16 lg:grid-cols-2">
          <section className="overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
            <div className="flex items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4 py-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Libros</h2>
              <span className="text-xs text-[#8b949e]">{books.length} registros</span>
            </div>
            {books.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-sm">
                    <thead className="bg-[#161b22] text-left text-white">
                      <tr>
                        <th scope="col" className="w-[58%] border-b border-[#30363d] px-4 py-2 font-semibold">Título</th>
                        <th scope="col" className="w-[30%] border-b border-[#30363d] px-4 py-2 font-semibold">Autor</th>
                        <th scope="col" className="w-16 border-b border-[#30363d] px-3 py-2 text-center font-semibold">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((book) => (
                        <tr key={book.id} className="border-t border-[#30363d] hover:bg-[#161b22]">
                          <td className="px-4 py-3 align-top">
                            <Link href={`/o/${book.isbn}`} className="block truncate font-semibold text-[#58a6ff] hover:underline">
                              {book.title}
                            </Link>
                          </td>
                          <td className="truncate px-4 py-3 align-top text-[#c9d1d9]">{book.author}</td>
                          <td className="px-3 py-2 text-center align-top">
                            <button
                              type="button"
                              onClick={() => setBookPendingDelete(book)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#30363d] text-[#f85149] hover:border-[#f85149] hover:bg-[#da3633]/15"
                              aria-label={`Eliminar ${book.title}`}
                              title="Eliminar"
                            >
                              <TrashIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <p className="p-4 text-[#8b949e]">No hay libros disponibles.</p>}
            <Link href="/admin/indexar" className="block border-t border-[#30363d] bg-[#0d1117] px-4 py-3 text-sm font-medium text-[#3fb950] hover:bg-[#161b22]">
                + Añadir otro libro
            </Link>
          </section>

          <section className="overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
            <div className="flex items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4 py-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Autores</h2>
              <span className="text-xs text-[#8b949e]">{authors.length} registros</span>
            </div>
            {authors.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-sm">
                    <thead className="bg-[#161b22] text-left text-white">
                      <tr>
                        <th scope="col" className="border-b border-[#30363d] px-4 py-2 font-semibold">Nombre</th>
                        <th scope="col" className="w-16 border-b border-[#30363d] px-3 py-2 text-center font-semibold">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {authors.map((author) => (
                        <tr key={author.id} className="border-t border-[#30363d] hover:bg-[#161b22]">
                          <td className="truncate px-4 py-3 font-semibold text-[#c9d1d9]">{author.name}</td>
                          <td className="px-3 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveAuthor(author.id)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#30363d] text-[#f85149] hover:border-[#f85149] hover:bg-[#da3633]/15"
                              aria-label={`Eliminar ${author.name}`}
                              title="Eliminar"
                            >
                              <TrashIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <p className="p-4 text-[#8b949e]">No hay autores disponibles.</p>}
            <Link href="/admin/autores" className="block border-t border-[#30363d] bg-[#0d1117] px-4 py-3 text-sm font-medium text-[#3fb950] hover:bg-[#161b22]">
                + Añadir otro autor
            </Link>
          </section>
        </div>
        </div>

        {bookPendingDelete && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-book-title"
          >
            <div className="w-full max-w-md rounded-md border border-[#30363d] bg-[#0d1117] p-6 text-[#e6edf3] shadow-xl">
              <h2 id="delete-book-title" className="spectral text-2xl font-bold text-white">
                Eliminar libro
              </h2>
              <p className="mt-3">
                ¿Seguro que quieres eliminar{" "}
                <span className="font-bold">{bookPendingDelete.title}</span> de{" "}
                {bookPendingDelete.author}?
              </p>
              <p className="mt-2 text-sm text-[#8b949e]">
                Esta acción no se puede deshacer.
              </p>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setBookPendingDelete(null)}
                  disabled={isDeletingBook}
                  className="rounded-md border border-[#30363d] px-4 py-2 text-white hover:bg-[#161b22] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(bookPendingDelete.id)}
                  disabled={isDeletingBook}
                  className="rounded-md bg-[#da3633] px-4 py-2 text-white hover:bg-[#f85149] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeletingBook ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="my-72 mx-auto text-center">
      <button onClick={() => signInAsAdmin(router.asPath)} className="hover:bg-black hover:text-white rounded-full border-2 border-[#111] px-4 py-2 my-8">administrar</button>
    </div>
  );
}
