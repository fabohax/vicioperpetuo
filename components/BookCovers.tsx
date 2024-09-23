// components/BookCovers.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/utils/supabaseClient";

// Define the Book type
interface Book {
  title: string;
  imgurl: string;
  isbn: string;
}

const BookCovers = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch books data from Supabase
  useEffect(() => {
    const fetchBooks = async () => {
      const { data: booksData, error } = await supabase
        .from('vpvp_books')
        .select('title, imgurl, isbn');

      if (error) {
        console.error('Error fetching books:', error);
      } else {
        // Set the books state with fetched data or an empty array if no data
        setBooks(booksData || []);
      }

      setLoading(false);
    };

    fetchBooks();
  }, []);

  if (loading) return <p className="h-screen text-center mx-auto">...</p>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-20">
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book.isbn} className="flex justify-center items-center">
            <Link href={`/o/${book.isbn}`} passHref prefetch={true}>
              <Image
                src={book.imgurl}
                height={300}
                width={200}
                alt={book.title}
                className="hover:scale-105 transition-transform duration-200 max-w-full h-auto"
              />
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center w-full col-span-2 lg:col-span-4">No books available.</p>
      )}
    </div>
  );
};

export default BookCovers;
