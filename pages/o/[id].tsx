import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GetStaticProps, GetStaticPaths } from "next";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { supabase } from "@/utils/supabaseClient"; // Import Supabase client
import Menu from "@/components/menu";
import BookDetails from "@/components/book";
import Modal from "@/components/modal"; // Modal component
import LoadingSpinner from "@/components/LoadingSpinner";
import PinataImageUpload from "@/components/PinataImageUpload";
import { Seo, SITE_NAME, SITE_URL } from "@/lib/seo";
import { ParsedUrlQuery } from "querystring"; // Import this to define the params type

interface Params extends ParsedUrlQuery {
  id: string; // This is the ISBN code
}

const AVAILABLE_GENRES = ["Poesía", "Narrativa", "Cuento", "Dramaturgia"];
const AVAILABLE_EDITORIALS = ["Vicio Perpetuo Vicio Perfecto", "Infinito"];

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
  const [saveMessage, setSaveMessage] = useState("");
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
  const pageTitle = `${book.title} de ${book.author} | ${SITE_NAME}`;
  const pageDescription =
    book.description?.trim() ||
    `Compra ${book.title}, libro de ${book.author}, publicado por ${SITE_NAME}.`;
  const bookUrl = `${SITE_URL}/o/${encodeURIComponent(book.isbn)}`;
  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: book.author,
    },
    publisher: {
      "@type": "Organization",
      name: book.editorial || SITE_NAME,
    },
    isbn: book.isbn,
    datePublished: book.year ? String(book.year) : undefined,
    numberOfPages: book.pages || undefined,
    image: book.imgurl,
    description: pageDescription,
    url: bookUrl,
    offers: {
      "@type": "Offer",
      price: book.price,
      priceCurrency: "PEN",
      availability: "https://schema.org/InStock",
      url: bookUrl,
    },
  };

  const handleAdminBookChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSaveMessage("");
    setEditableBook((prevBook) => {
      const currentBook = prevBook?.id === book.id ? prevBook : book;
      return { ...currentBook, [name]: value } as Book;
    });
  };

  const handleAdminBookImageChange = (imgurl: string) => {
    setSaveMessage("");
    setEditableBook((prevBook) => {
      const currentBook = prevBook?.id === book.id ? prevBook : book;
      return { ...currentBook, imgurl } as Book;
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
    setSaveMessage("Cambios guardados correctamente.");
    router.push("/admin");
  };

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        path={`/o/${book.isbn}`}
        image={book.imgurl}
        type="book"
        jsonLd={bookJsonLd}
      />

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
            <form onSubmit={handleAdminBookSubmit} className="space-y-4">
              <PinataImageUpload
                value={adminBook.imgurl}
                onChange={handleAdminBookImageChange}
                emptyMessage="Sube una portada con Pinata."
                minHeightClassName="min-h-[28rem]"
                allowUrlInput={false}
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
              <div className="relative">
                <select
                  name="gender"
                  value={adminBook.gender}
                  onChange={handleAdminBookChange}
                  className="w-full appearance-none border rounded-md p-2 py-4 pr-12"
                >
                  <option value="">Género</option>
                  {AVAILABLE_GENRES.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black" aria-hidden="true" />
              </div>
              
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
              <div className="relative">
                <select
                  name="editorial"
                  value={adminBook.editorial}
                  onChange={handleAdminBookChange}
                  className="w-full appearance-none border rounded-md p-2 py-4 pr-12"
                >
                  <option value="">Editorial</option>
                  {AVAILABLE_EDITORIALS.map((editorial) => (
                    <option key={editorial} value={editorial}>
                      {editorial}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black" aria-hidden="true" />
              </div>
              
              <button type="submit" disabled={isSavingBook} className="w-full hover:bg-black text-white border-2 bg-black py-4 px-4 rounded-lg my-8 disabled:cursor-not-allowed disabled:opacity-60">
                {isSavingBook ? "Guardando..." : "Guardar Cambios"}
              </button>
              {saveMessage ? (
                <p className="inline-flex items-center gap-2 text-sm font-medium text-green-700">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  {saveMessage}
                </p>
              ) : null}
            </form>
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
