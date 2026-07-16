import React from "react";
import Image from "next/image";
import Link from "next/link";
import path from 'path';
import fs from 'fs';
import { GetStaticProps } from 'next';
import Menu from "@/components/menu";
import { Seo } from "@/lib/seo";

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

const Poesia: React.FC<Props> = ({ books }) => {
  const poesiaBooks = books.filter(book => book.gender === "Poesia");

  return (
    <div className="container mx-auto py-8">
      <Seo
        title="Libros de poesia | Vicio Perpetuo Vicio Perfecto"
        description="Explora libros de poesia publicados por Vicio Perpetuo Vicio Perfecto, editorial peruana dedicada a promover autores contemporaneos."
        path="/poesia"
      />
        <div className="fixed top-2 left-4">
            <Link href="/" className="hover:underline font-medium">Vicio Perpetuo Vicio Perfecto</Link>
        </div>
        <Menu dark="true" />
      <h1 className="text-3xl font-bold mb-6">Poesia</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {poesiaBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md p-4">
            <Image
              src={`/covers/${book.id}.png`}
              alt={book.title}
              width={300}
              height={400}
              className="rounded-lg"
              style={{ width: "100%", height: "auto" }}
            />
            <h2 className="text-xl font-bold mt-4">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-gray-800 font-bold mt-2">{book.price} PEN</p>
            <Link href={`/o/${book.isbn}`} className="mt-4 inline-block text-blue-500 hover:underline">
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

export default Poesia;
