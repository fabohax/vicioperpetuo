// components/BookCovers.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabaseClient";
import LoadingImage from "@/components/LoadingImage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { BOOK_COVERS } from "@/db/books";

// Define the Book type
interface Book {
  title: string;
  imgurl: string;
  isbn: string;
}

const COVER_WIDTH = 200;
const COVER_HEIGHT = 300;
const MIN_COVER_WIDTH = 160;
const MIN_COVER_HEIGHT = 240;
const COVER_SIZES = "(min-width: 1024px) 200px, 50vw";
const localCoverByIsbn = new Map(BOOK_COVERS.map((book) => [book.isbn, book.imgurl]));

const getCoverSlug = (imgurl: string) => {
  const path = imgurl.split("?")[0];
  const filename = path.split("/").pop() || path;

  return filename.replace(/\.(avif|webp|png|jpe?g)$/i, "");
};

const getOptimizedCoverSrc = (book: Book) => {
  const localCover = localCoverByIsbn.get(book.isbn);

  if (localCover) {
    return localCover;
  }

  if (!book.imgurl.startsWith("http") && !book.imgurl.startsWith("/")) {
    return `/covers/mins/${book.imgurl}.png`;
  }

  if (book.imgurl.includes("/covers/")) {
    return `/covers/mins/${getCoverSlug(book.imgurl)}.png`;
  }

  return book.imgurl;
};

const BookCovers = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [hiddenIsbns, setHiddenIsbns] = useState<Set<string>>(new Set());

  const hideBook = (isbn: string) => {
    setHiddenIsbns((currentHiddenIsbns) => {
      if (currentHiddenIsbns.has(isbn)) {
        return currentHiddenIsbns;
      }

      const nextHiddenIsbns = new Set(currentHiddenIsbns);
      nextHiddenIsbns.add(isbn);
      return nextHiddenIsbns;
    });
  };

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

  if (loading) return <LoadingSpinner className="h-screen" label="Cargando libros" />;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-20 overflow-visible">
      {books.length > 0 ? (
        books.filter((book) => !hiddenIsbns.has(book.isbn)).map((book) => (
          <div key={book.isbn} className="relative flex justify-center items-center overflow-visible hover:z-20">
            <Link href={`/o/${book.isbn}`} passHref prefetch={false} className="block overflow-visible">
              <LoadingImage
                src={getOptimizedCoverSrc(book)}
                height={COVER_HEIGHT}
                width={COVER_WIDTH}
                alt={book.title}
                spinnerLabel={`Cargando portada de ${book.title}`}
                sizes={COVER_SIZES}
                loading="lazy"
                decoding="async"
                onLoad={(event) => {
                  const image = event.currentTarget;

                  if (
                    image.naturalWidth < MIN_COVER_WIDTH ||
                    image.naturalHeight < MIN_COVER_HEIGHT
                  ) {
                    hideBook(book.isbn);
                  }
                }}
                onError={() => hideBook(book.isbn)}
                allowOverflow
                wrapperClassName="w-full max-w-[200px] aspect-[2/3]"
                className="hover:scale-110 transition-transform duration-200 rounded-sm"
                style={{ width: "100%", height: "auto" }}
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
