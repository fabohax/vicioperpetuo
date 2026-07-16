import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserRound, X } from 'lucide-react';
import Menu from '@/components/menu'; 
import LoadingImage from '@/components/LoadingImage';
import { supabase } from "@/utils/supabaseClient";
import { Seo } from "@/lib/seo";

type Author = {
  name: string;
  imgurl?: string | null;
};

type AuthorWithImage = {
  name: string;
  imgurl: string;
};

const isUsableImageSrc = (src?: string | null): src is string => {
  if (!src) return false;
  const trimmedSrc = src.trim();
  if (!trimmedSrc) return false;
  if (trimmedSrc.startsWith("/")) return true;

  try {
    const url = new URL(trimmedSrc);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

const AuthorImageFallback = ({ name }: { name: string }) => (
  <div
    className="flex h-[150px] w-[150px] items-center justify-center rounded-3xl bg-neutral-200 text-neutral-500"
    role="img"
    aria-label={`Foto no disponible de ${name}`}
  >
    <UserRound className="h-16 w-16" strokeWidth={1.6} aria-hidden="true" />
  </div>
);

const AuthorPhoto = ({
  author,
  onOpen,
}: {
  author: Author;
  onOpen: (author: AuthorWithImage) => void;
}) => {
  const [hasError, setHasError] = useState(false);
  const imageSrc = author.imgurl?.trim();

  if (!isUsableImageSrc(imageSrc) || hasError) {
    return <AuthorImageFallback name={author.name} />;
  }

  return (
    <button
      type="button"
      onClick={() => onOpen({ name: author.name, imgurl: imageSrc })}
      className="rounded-3xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4"
      aria-label={`Ampliar foto de ${author.name}`}
    >
      <LoadingImage
        src={imageSrc}
        alt={author.name}
        width={150}
        height={150}
        className="rounded-3xl object-cover transition-transform duration-200 hover:scale-110"
        wrapperClassName="h-[150px] w-[150px] rounded-3xl"
        spinnerLabel={`Cargando foto de ${author.name}`}
        style={{ width: "150px", height: "150px" }}
        onError={() => setHasError(true)}
      />
    </button>
  );
};

const AuthorImageModal = ({
  author,
  onClose,
}: {
  author: AuthorWithImage | null;
  onClose: () => void;
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!author) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [author, onClose]);

  if (!author) return null;

  return (
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/75 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ampliada de ${author.name}`}
      onClick={onClose}
    >
      <div className="relative max-h-[90vh] max-w-[92vw]" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-3 -top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Cerrar foto ampliada"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {hasError ? (
          <div className="flex h-[min(80vh,520px)] w-[min(86vw,520px)] items-center justify-center rounded-md bg-neutral-200 text-neutral-500">
            <UserRound className="h-24 w-24" strokeWidth={1.5} aria-hidden="true" />
          </div>
        ) : (
          <LoadingImage
            src={author.imgurl}
            alt={author.name}
            width={1200}
            height={1200}
            className="rounded-md object-contain shadow-2xl"
            wrapperClassName="min-h-[280px] min-w-[min(86vw,320px)] max-h-[90vh] max-w-[92vw] rounded-md bg-white sm:min-h-[420px] sm:min-w-[420px]"
            spinnerLabel={`Cargando foto ampliada de ${author.name}`}
            style={{ width: "auto", height: "auto", maxWidth: "92vw", maxHeight: "90vh" }}
            onError={() => setHasError(true)}
          />
        )}
      </div>
    </div>
  );
};

export default function Autores({ authors }: { authors: Author[] }) {
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorWithImage | null>(null);

  return (
    <>
      <Seo
        title="Autores peruanos | Vicio Perpetuo Vicio Perfecto"
        description="Conoce a los autores publicados por Vicio Perpetuo Vicio Perfecto, editorial peruana dedicada a promover nuevas voces literarias."
        path="/autores"
      />

      <div id="autores-container" className="fade-up mt-32">
        <div className="fixed top-3 left-4 z-200">
          <Link href="/" className="hover:underline font-medium">Vicio Perpetuo Vicio Perfecto</Link>
        </div>
        <Menu dark="true" />
        <h1 className="text-center spectral text-5xl font-bold">Autores</h1>
        <p className="mx-auto mt-6 mb-32 max-w-2xl px-6 text-center text-lg leading-8 text-neutral-700">
          Voces peruanas y latinoamericanas que forman parte de nuestro catálogo editorial.
        </p>
        <div className="spectral autores-grid grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-1/2 mx-auto mb-20">
          {authors.map((author, index) => (
            <div key={index} className="autor flex flex-col items-center my-8">
              <AuthorPhoto author={author} onOpen={setSelectedAuthor} />
              <span className="font-serif text-xl mt-4">{author.name}</span>
            </div>
          ))}
        </div>
      </div>
      <AuthorImageModal author={selectedAuthor} onClose={() => setSelectedAuthor(null)} />
    </>
  );
}

// Fetch data from Supabase
export async function getStaticProps() {
  const { data: authors, error } = await supabase.from('vpvp_authors').select('name, imgurl');

  if (error) {
    console.error('Error fetching authors:', error.message);
    return {
      props: {
        authors: [],
      },
    };
  }

  return {
    props: {
      authors,
    },
    revalidate: 10, // Revalidate every 10 seconds to get fresh data
  };
}
