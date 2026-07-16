import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { supabase } from "@/utils/supabaseClient"; // Import Supabase client
import Menu from "@/components/menu";
import BookDetails from "@/components/book";
import Modal from "@/components/modal"; // Modal component
import LoadingImage from "@/components/LoadingImage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ParsedUrlQuery } from "querystring"; // Import this to define the params type

interface Params extends ParsedUrlQuery {
  id: string; // This is the ISBN code
}

type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  gender: string;
  isbn: string;
  year: number;
  pages: number;
  ratio: string;
  editorial: string;
  imgurl: string;
};

interface Props {
  book: Book | null;
}

// Fetch all available ISBNs from Supabase to generate paths
export const getStaticPaths: GetStaticPaths = async () => {
  const { data: books, error } = await supabase.from('vpvp_books').select('isbn');

  if (error) {
    console.error("Error fetching books:", error.message);
    return {
      paths: [],
      fallback: false,
    };
  }

  const uniqueIsbns = Array.from(
    new Set(
      (books || [])
        .map((book) => (typeof book.isbn === "string" ? book.isbn.trim() : ""))
        .filter(Boolean)
    )
  );

  const paths = uniqueIsbns.map((isbn) => ({
    params: { id: isbn },  // Use isbn as the dynamic id
  }));

  return {
    paths,
    fallback: true,
  };
};

// Fetch book data based on ISBN and return as props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = (params as Params).id.trim();

  const { data: book, error } = await supabase
    .from("vpvp_books")
    .select("*")
    .ilike("isbn", `${id}%`)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !book) {
    return { notFound: true };
  }

  return {
    props: { book },
    revalidate: 60,
  };
};

export default function Obras({ book }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableBook, setEditableBook] = useState<Book | null>(book);
  const [isSavingBook, setIsSavingBook] = useState(false);
  const { data: session, status } = useSession();
  const allowedAdmins = ["fabohax@gmail.com", "edicionesvicioperpetuo@gmail.com"];
  const isAdmin = Boolean(session?.user?.email && allowedAdmins.includes(session.user.email));

  if (router.isFallback || status === "loading") {
    return <LoadingSpinner className="min-h-screen bg-white text-black" label="Cargando libro" />;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const adminBook = editableBook?.id === book.id ? editableBook : book;

  const handleAdminBookChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableBook((prevBook) => {
      const currentBook = prevBook?.id === book.id ? prevBook : book;
      return { ...currentBook, [name]: value } as Book;
    });
  };

  const handleAdminBookSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!adminBook?.id) {
      alert("No se pudo identificar el libro para guardar.");
      return;
    }

    if (!adminBook.title.trim() || !adminBook.author.trim()) {
      alert("El título y el autor son obligatorios.");
      return;
    }

    setIsSavingBook(true);
    const { data, error } = await supabase
      .from("vpvp_books")
      .update({
        imgurl: adminBook.imgurl.trim(),
        title: adminBook.title,
        author: adminBook.author,
        description: adminBook.description,
        price: Number(adminBook.price) || null,
        gender: adminBook.gender,
        isbn: adminBook.isbn.trim(),
        year: Number(adminBook.year) || null,
        pages: Number(adminBook.pages) || null,
        ratio: adminBook.ratio,
        editorial: adminBook.editorial,
      })
      .eq("id", adminBook.id)
      .select("*")
      .single();
    setIsSavingBook(false);

    if (error) {
      console.error("Error updating book:", error.message);
      alert("Error al guardar: " + error.message);
      return;
    }

    setEditableBook(data);
    alert("Cambios guardados correctamente.");
    router.push("/admin");
  };

  return (
    <>
      <Head>
        <title>{`${book.title} de ${book.author} | Vicio Perpetuo Vicio Perfecto`}</title>
        <meta property="og:title" content={`${book.title} de ${book.author}`} />
        <meta property="og:description" content={book.description} />
        <meta name="twitter:description" content={book.description} />
      </Head>

      <div className="fixed top-2 left-4">
        <Link href="/" className="hover:underline font-medium">
          Vicio Perpetuo Vicio Perfecto
        </Link>
      </div>

      <Menu dark="true" />

      <div className="spectral lg:w-1/3 mx-auto mt-8 lg:mt-2 mb-16">
        {isAdmin ? (
          <>
            {/* If the user is an admin, show the edit form */}
            <h1 className="text-2xl font-bold mb-6 mt-8">Editar Libro</h1>
            <LoadingImage
              src={adminBook.imgurl}
              alt={`Cover of ${adminBook.title} by ${adminBook.author}`}
              width={640}
              height={720}
              className="mb-4 rounded-md"
              spinnerLabel={`Cargando portada de ${adminBook.title}`}
              style={{ width: "100%", height: "auto" }}
            />
            <form onSubmit={handleAdminBookSubmit} className="space-y-4">
              
              <input
                name="imgurl"
                type="text"
                value={adminBook.imgurl}
                onChange={handleAdminBookChange}
                className="w-full p-2 border rounded-md py-4"
              />
              <input
                name="title"
                type="text"
                value={adminBook.title}
                onChange={handleAdminBookChange}
                className="w-full p-2 border rounded-md py-4 text-3xl bg-[#f5f5f5]"
                required
              />
              <input
                name="author"
                type="text"
                value={adminBook.author}
                onChange={handleAdminBookChange}
                className="w-full p-2 border rounded-md py-4"
                required
              />
              <textarea
                name="description"
                value={adminBook.description}
                onChange={handleAdminBookChange}
                className="w-full p-2 border rounded-md py-4 h-[210px]"
              ></textarea>
              <input
                name="price"
                type="number"
                value={String(adminBook.price ?? "")}
                onChange={handleAdminBookChange}
                className="w-full p-2 border rounded-md py-4"
              />
              <input
                name="gender"
                type="text"
                value={adminBook.gender}
                onChange={handleAdminBookChange}
                className="w-full p-2 border rounded-md py-4"
              />
              
              <input
                name="isbn"
                type="text"
                value={adminBook.isbn}
                onChange={handleAdminBookChange}
                className="w-full p-2 border rounded-md py-4"
              />
              <input
                name="year"
                type="text"
                value={String(adminBook.year ?? "")}
                onChange={handleAdminBookChange}
                className="w-full p-2 border rounded-md py-4"
              />
              <input
                name="pages"
                type="text"
                value={String(adminBook.pages ?? "")}
                onChange={handleAdminBookChange}
                className="w-full p-2 border rounded-md py-4"
              />
              <input
                name="ratio"
                type="text"
                value={adminBook.ratio}
                onChange={handleAdminBookChange}
                className="w-full p-2 border rounded-md py-4"
              />
              <input
                name="editorial"
                type="text"
                value={adminBook.editorial}
                onChange={handleAdminBookChange}
                className="w-full p-2 border rounded-md py-4"
              />
              
              <button type="submit" disabled={isSavingBook} className="w-full hover:bg-black text-white border-2 bg-black py-4 px-4 rounded-lg my-8 disabled:cursor-not-allowed disabled:opacity-60">
                {isSavingBook ? "Guardando..." : "Guardar Cambios"}
              </button>
            </form>
            <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="fixed top-[11px] right-12 hover:bg-black hover:text-white border-[1px] border-black rounded-full px-2 py-[3px] text-[11px] backdrop-blur bg-white/30"
          >
            CERRAR SESIÓN
          </button>
          </>
        ) : (
          <>
            {/* If the user is not an admin, show the book details */}
            <BookDetails book={book} />
            <button
              onClick={openModal}
              className="w-full hover:bg-black text-white border-2 bg-black py-4 px-4 rounded-lg my-8"
            >
              Comprar
            </button>
          </>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        bookTitle={book.title}
        bookPrice={book.price}
        bookAuthor={book.author}
      />
    </>
  );
}
