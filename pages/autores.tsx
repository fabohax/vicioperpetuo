import Head from 'next/head';
import Image from 'next/image';
import Menu from '@/components/menu'; 
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Autores({ authors }: { authors: any[] }) {
  return (
    <>
      <Head>
        <title>Autores | Vicio Perpetuo Vicio Perfecto</title>
        <meta property="og:title" content="Vicio Perpetuo Vicio Perfecto | Editorial" />
        <meta property="og:url" content="https://vicioperpetuo.com" />
        <meta property="og:image" content="/vicio.png" />
        <meta property="og:description" content="La editorial de libros más vendida en el Perú. Fundada en 2011, nuestra editorial promueve autores peruanos y nuestra identidad nacional." />
        <meta property="twitter:title" content="Vicio Perpetuo Vicio Perfecto | Editorial" />
        <meta property="twitter:url" content="https://vicioperpetuo.com" />
        <meta property="twitter:image" content="/vicio.png" />
        <meta property="twitter:description" content="La editorial de libros más vendida en el Perú. Fundada en 2011, nuestra editorial promueve autores peruanos y nuestra identidad nacional." />
      </Head>

      <div id="autores-container" className="fade-up mt-32">
        <div className="fixed top-3 left-4 z-200">
          <a href="/" className="hover:underline font-medium">Vicio Perpetuo Vicio Perfecto</a>
        </div>
        <Menu dark="true" />
        <h1 className="mb-32 text-5xl font-bold spectral text-center">Autores</h1>
        <div className="spectral autores-grid grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-1/2 mx-auto mb-20">
          {authors.map((author, index) => (
            <div key={index} className="autor flex flex-col items-center my-8">
              <Image
                src={author.imgurl}
                alt={author.name}
                width={150}
                height={150}
                className="rounded-3xl hover:scale-110 transition-transform duration-200"
              />
              <span className="font-serif text-xl mt-4">{author.name}</span>
            </div>
          ))}
        </div>
      </div>
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
