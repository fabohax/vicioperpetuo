import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/router";

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Author {
  id: number;
  name: string;
  imgurl: string;
}

export default function Autores() {
  const { data: session } = useSession();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newAuthor, setNewAuthor] = useState({ name: "", imgurl: "" });
  const router = useRouter();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data, error } = await supabase
          .from("vpvp_authors")
          .select("id, name, imgurl");
        if (error) throw error;
        setAuthors(data || []);
      } catch (error) {
        setErrorMessage("Error fetching authors.");
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  const handleRemove = async (id: number) => {
    const { error } = await supabase.from("vpvp_authors").delete().eq("id", id);
    if (error) {
      console.error("Error removing author:", error.message);
    } else {
      setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== id));
    }
  };

  const handleAddAuthor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newAuthor.name || !newAuthor.imgurl) {
      alert("Please provide both the author's name and image URL.");
      return;
    }

    const { data, error } = await supabase.from("vpvp_authors").insert([newAuthor]);

    if (error) {
      console.error("Error inserting author:", error.message);
    } else if (data) {
      setAuthors((prevAuthors) => [...prevAuthors, ...data]);
      
    }
    router.reload();
  };

  if (session) {
    return (
      <>
        <div>
          <div className="flex flex-row fixed top-8 left-8 gap-2 space-x-8">
            <div>
              👤 <Link href="/admin" className="hover:underline">
                {session?.user?.email?.split("@")[0] || "NN"}
              </Link>
            </div>
            <div>
              📇 <Link href="/admin/indexar" className="hover:underline">Indexar</Link>
            </div>
            <div>🧾 <Link href="/admin/pedidos" className="hover:underline">Pedidos</Link></div>
          </div>
          <button
            onClick={() => signOut()}
            className="fixed top-0 right-8 hover:bg-black hover:text-white my-8 border-[1px] border-black rounded-full px-4 py-2 text-sm"
          >
            CERRAR SESIÓN
          </button>

          {/* Author List */}
          <h1 className="spectral text-2xl font-bold text-left mt-20 mx-8">
            Autores de Vicio Perpetuo Vicio Perfecto
          </h1>
          <p className="mx-8">
            Aquí puedes revisar la lista completa de Autores y editarlos.
          </p>

          <div className="grid grid-col lg:grid-cols-2 container mx-auto p-4 my-4 px-4 lg:w-full border-[1px] border-[#777] py-4 rounded-lg spectral">
            <div className="py-2">
              <h3 className="border-[1px] border-[#777] bg-[#f3f3f3] rounded-md px-4 mr-4">Autores</h3>
              {loading ? (
                <p className="p-2">Cargando autores...</p>
              ) : authors.length ? (
                <ul className="space-y-4">
                  {authors.map((author) => (
                    <li key={author.id} className="flex justify-between items-center p-4 bg-gray-100 border-[1px] border-[#777] bg-[#f3f3f3] rounded-md rounded-lg mt-2 mr-4">
                      <div>
                        <span className="font-bold">{author.name}</span>
                      </div>
                      <button
                        onClick={() => handleRemove(author.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No authors available.</p>
              )}
            </div>

            {/* Add Author Form */}
            <div className="py-2">
              <h3 className="border-[1px] border-[#777] bg-[#f3f3f3] rounded-md px-4">Añadir</h3>
              <form onSubmit={handleAddAuthor} className="mt-4 space-y-4">
                <input
                  type="text"
                  name="name"
                  value={newAuthor.name}
                  onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                  placeholder="Nombre del autor"
                  className="w-full p-2 py-4 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="imgurl"
                  value={newAuthor.imgurl}
                  onChange={(e) => setNewAuthor({ ...newAuthor, imgurl: e.target.value })}
                  placeholder="URL de la imagen. Máximo 50 MB. Ratio cuadrado."
                  className="w-full p-2 py-4 border rounded-md"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-4 px-4 rounded-lg hover:bg-blue-700"
                >
                  Añadir Autor
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="my-72 mx-auto text-center">
        <button onClick={() => signIn()} className="hover:bg-white hover:text-black rounded-full border-2 border-white px-4 py-2 my-8">
          Iniciar Sesión
        </button>
      </div>
    </>
  );
}
