import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { supabase } from "@/utils/supabaseClient"; // Import Supabase client
import Menu from "@/components/menu";
import BookDetails from "@/components/book";
import Modal from "@/components/modal"; // Modal component
import { ParsedUrlQuery } from "querystring"; // Import this to define the params type

interface Params extends ParsedUrlQuery {
  id: string; // This is the ISBN code
}

type Book = {
  id: string;
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

  const paths = books.map((book) => ({
    params: { id: book.isbn },  // Use isbn as the dynamic id
  }));

  return {
    paths,
    fallback: false, // Show 404 if no matching path is found
  };
};

// Fetch book data based on ISBN and return as props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Params;

  const { data: book, error } = await supabase
    .from("vpvp_books")
    .select("*")
    .eq("isbn", id)
    .single();

  if (error || !book) {
    return { notFound: true };
  }

  return {
    props: { book },
  };
};

export default function Obras({ book }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if the logged-in user is an admin based on their email
    if (session && session.user) {
      const allowedAdmins = ["fabohax@gmail.com", "edicionesvicioperpetuo@gmail.com"];
      setIsAdmin(allowedAdmins.includes(session.user.email!));
    }
  }, [session]);

  if (!book) {
    return <div>Book not found</div>;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            <Image
              src={book.imgurl}
              alt="x"
              width={640}
              height={720}
              className="mb-4 rounded-md"
            />
            <form className="space-y-4">
              
              <input
                name="imgurl"
                type="text"
                defaultValue={book.imgurl}
                className="w-full p-2 border rounded-md py-4"
              />
              <input
                name="title"
                type="text"
                defaultValue={book.title}
                className="w-full p-2 border rounded-md py-4 text-3xl bg-[#f5f5f5]"
              />
              <input
                name="author"
                type="text"
                defaultValue={book.author}
                className="w-full p-2 border rounded-md py-4"
              />
              <textarea
                name="description"
                defaultValue={book.description}
                className="w-full p-2 border rounded-md py-4 h-[210px]"
              ></textarea>
              <input
                name="price"
                type="number"
                defaultValue={String(book.price)}
                className="w-full p-2 border rounded-md py-4"
              />
              <input
                name="gender"
                type="text"
                defaultValue={book.gender}
                className="w-full p-2 border rounded-md py-4"
              />
              
              <input
                name="isbn"
                type="text"
                defaultValue={book.isbn}
                className="w-full p-2 border rounded-md py-4"
              />
              <input
                name="year"
                type="text"
                defaultValue={book.year}
                className="w-full p-2 border rounded-md py-4"
              />
              <input
                name="pages"
                type="text"
                defaultValue={book.pages}
                className="w-full p-2 border rounded-md py-4"
              />
              <input
                name="ratio"
                type="text"
                defaultValue={book.ratio}
                className="w-full p-2 border rounded-md py-4"
              />
              <input
                name="editorial"
                type="text"
                defaultValue={book.editorial}
                className="w-full p-2 border rounded-md py-4"
              />
              
              <button type="submit" className="w-full hover:bg-black text-white border-2 bg-black py-4 px-4 rounded-lg my-8">
                Guardar Cambios
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
