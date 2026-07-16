import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInAsAdmin } from "@/utils/adminAuth";
import { LogOut } from "lucide-react";

interface Author {
  id: number;
  name: string;
  imgurl: string;
}

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  );
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
      <div className="min-h-screen bg-black px-4 py-6 text-[#e6edf3] sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="fixed left-4 top-8 z-10 flex flex-row flex-wrap gap-3 rounded-md border border-[#30363d] bg-[#0d1117]/90 px-3 py-2 text-sm text-white shadow-sm backdrop-blur sm:left-8 sm:gap-5">
            <div>
              👤 <Link href="/admin" className="hover:underline">
                {session?.user?.email?.split("@")[0] || "NN"}
              </Link>
            </div>
            <div>
              📇 <Link href="/admin/indexar" className="hover:underline">Indexar</Link>
            </div>
            <div>🪶 <Link href="/admin/autores" className="hover:underline">Autores</Link></div>
            <div>🧾 <Link href="/admin/pedidos" className="hover:underline">Pedidos</Link></div>
          </div>
          <button
            onClick={() => signOut()}
            className="fixed right-4 top-0 z-10 my-8 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#30363d] bg-[#0d1117]/90 text-white backdrop-blur hover:border-[#8b949e] hover:bg-[#161b22] sm:right-8"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Author List */}
          <h1 className="spectral mt-20 text-left text-2xl font-bold text-white">
            Autores de Vicio Perpetuo Vicio Perfecto
          </h1>
          <p className="text-[#8b949e]">
            Aquí puedes revisar la lista completa de Autores y editarlos.
          </p>

          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

          <div className="mb-16 mt-6 grid w-full grid-cols-1 gap-6 lg:mb-24 lg:mt-16 lg:grid-cols-2">
            <section className="overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
              <div className="flex items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4 py-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Autores</h2>
                <span className="text-xs text-[#8b949e]">{authors.length} registros</span>
              </div>
              {loading ? (
                <p className="p-4 text-[#8b949e]">Cargando autores...</p>
              ) : authors.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-sm">
                    <thead className="bg-[#161b22] text-left text-white">
                      <tr>
                        <th scope="col" className="border-b border-[#30363d] px-4 py-2 font-semibold">Nombre</th>
                        <th scope="col" className="w-16 border-b border-[#30363d] px-3 py-2 text-center font-semibold">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {authors.map((author) => (
                        <tr key={author.id} className="border-t border-[#30363d] hover:bg-[#161b22]">
                          <td className="truncate px-4 py-3 font-semibold text-[#c9d1d9]">{author.name}</td>
                          <td className="px-3 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemove(author.id)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#30363d] text-[#f85149] hover:border-[#f85149] hover:bg-[#da3633]/15"
                              aria-label={`Eliminar ${author.name}`}
                              title="Eliminar"
                            >
                              <TrashIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="p-4 text-[#8b949e]">No hay autores disponibles.</p>
              )}
            </section>

            {/* Add Author Form */}
            <section className="overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
              <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Añadir</h2>
              </div>
              <form onSubmit={handleAddAuthor} className="space-y-4 p-4">
                <input
                  type="text"
                  name="name"
                  value={newAuthor.name}
                  onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                  placeholder="Nombre del autor"
                  className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
                  required
                />
                <input
                  type="text"
                  name="imgurl"
                  value={newAuthor.imgurl}
                  onChange={(e) => setNewAuthor({ ...newAuthor, imgurl: e.target.value })}
                  placeholder="URL de la imagen. Máximo 50 MB. Ratio cuadrado."
                  className="w-full rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
                  required
                />
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#238636] px-4 py-3 font-semibold text-white hover:bg-[#2ea043]"
                >
                  Añadir Autor
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="my-72 mx-auto text-center">
        <button onClick={() => signInAsAdmin(router.asPath)} className="hover:bg-white hover:text-black rounded-full border-2 border-white px-4 py-2 my-8">
          Iniciar Sesión
        </button>
      </div>
    </>
  );
}
