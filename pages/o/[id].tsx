//[id].tsx
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { supabase } from "@/utils/supabaseClient"; // Import Supabase client
import Menu from "@/components/menu";
import BookDetails from "@/components/book";
import Modal from "@/components/modal"; // Modal component

import { ParsedUrlQuery } from 'querystring'; // Import this to define the params type

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
  
  console.log("Fetching book with ISBN:", id); // Debugging line
  
  const { data: book, error } = await supabase
    .from('vpvp_books')
    .select('*')
    .eq('isbn', id)
    .single();

  console.log("Fetched book data:", book); // Debugging line
  
  if (error || !book) {
    console.error("Error fetching book:", error?.message);
    return { notFound: true };  // Return 404 if not found
  }

  return {
    props: { book },
  };
};



export default function Obras({ book }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  if (!book) {
    return <div>Book not found</div>;
  }

  // Modal functions to handle state
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
        <Link href="/" className="hover:underline font-medium">Vicio Perpetuo Vicio Perfecto</Link>
      </div>

      <Menu dark="true" />

      <div className="spectral lg:w-1/3 mx-auto mt-8 lg:mt-2 mb-16">
        <BookDetails book={book} />
        <button onClick={openModal} className="w-full hover:bg-black text-white border-2 bg-black py-4 px-4 rounded-lg my-8">
          Comprar
        </button>
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
