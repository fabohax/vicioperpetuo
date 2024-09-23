import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import path from 'path';
import fs from 'fs';
import { GetStaticProps } from 'next';
import Menu from "@/components/menu";

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
  nextBook: {
    name: string;
    path: string;
  };
};

interface Props {
  books: Book[];
}

const Cuento: React.FC<Props> = ({ books }) => {
  const [cuentoBooks, setCuentoBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Filter books by gender "Cuento"
    const filteredBooks = books.filter(book => book.gender === "Cuento");
    setCuentoBooks(filteredBooks);
  }, [books]);

  return (
    <div className="container mx-auto py-8">
        <div className="fixed top-2 left-4">
            <Link href="/" className="hover:underline font-medium">Vicio Perpetuo Vicio Perfecto</Link>
        </div>
        <Menu dark="true" />
      <h1 className="text-3xl font-bold mb-6">Cuento</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cuentoBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md p-4">
            <Image
              src={`/covers/${book.id}.png`}
              alt={book.title}
              width={300}
              height={400}
              className="rounded-lg"    
            />
            <h2 className="text-xl font-bold mt-4">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-gray-800 font-bold mt-2">{book.price} PEN</p>
            <Link href={`/o/${book.id}`} className="mt-4 inline-block text-blue-500 hover:underline">
                Ver más
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'db', 'data.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data: Book[] = JSON.parse(fileContents);

  return {
    props: {
      books: data,
    },
  };
};

export default Cuento;
