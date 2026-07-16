import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInAsAdmin } from "@/utils/adminAuth";
import { LogOut } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Order {
  id: number;
  email: string;
  phone: string;
  txid: string;
  paymentmethod: string;
  booktitle: string;
  bookauthor: string;
  bookprice: number;
  delivery_address?: string;
  delivery_lat?: number;
  delivery_lng?: number;
  created_at: string; // Add created_at to the interface
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

export default function Pedidos() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("vpvp_store")
          .select("id, email, phone, txid, paymentmethod, booktitle, bookauthor, bookprice, delivery_address, delivery_lat, delivery_lng, created_at"); // Include created_at
        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        setErrorMessage("Error fetching orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleRemove = async (id: number) => {
    const { error } = await supabase.from("vpvp_store").delete().eq("id", id);
    if (error) {
      console.error("Error removing order:", error.message);
    } else {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    }
  };

  const formatDateTime = (datetime: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(datetime).toLocaleDateString("es-ES", options);
  };

  if (status === "loading" || (session && loading)) {
    return <LoadingSpinner className="min-h-screen bg-black text-white" label="Cargando pedidos" />;
  }

  if (session) {
    return (
      <div className="min-h-screen bg-black px-4 py-6 text-[#e6edf3] sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
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

          {/* Orders List */}
          <h1 className="spectral mt-20 text-left text-2xl font-bold text-white">
            Pedidos Recientes
          </h1>
          <p className="text-[#8b949e]">Aquí puedes revisar la lista completa de pedidos realizados.</p>

          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

          <section className="mb-16 mt-6 overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117] lg:mb-24 lg:mt-16">
            <div className="flex items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4 py-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Pedidos</h2>
              <span className="text-xs text-[#8b949e]">{orders.length} registros</span>
            </div>
              {orders.length ? (
                <div className="overflow-x-auto">
                  <table className="min-w-[1180px] w-full border-collapse text-sm">
                    <thead className="bg-[#161b22] text-left text-white">
                      <tr>
                        <th scope="col" className="border-b border-[#30363d] px-4 py-2 font-semibold">Libro</th>
                        <th scope="col" className="border-b border-[#30363d] px-4 py-2 font-semibold">Cliente</th>
                        <th scope="col" className="border-b border-[#30363d] px-4 py-2 font-semibold">Pago</th>
                        <th scope="col" className="border-b border-[#30363d] px-4 py-2 font-semibold">Entrega</th>
                        <th scope="col" className="border-b border-[#30363d] px-4 py-2 font-semibold">Fecha</th>
                        <th scope="col" className="w-16 border-b border-[#30363d] px-3 py-2 text-center font-semibold">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-t border-[#30363d] hover:bg-[#161b22]">
                          <td className="max-w-[260px] px-4 py-3 align-top">
                            <p className="font-semibold text-white">{order.booktitle}</p>
                            <p className="mt-1 text-[#8b949e]">{order.bookauthor}</p>
                            <p className="mt-1 text-[#c9d1d9]">{order.bookprice} PEN</p>
                          </td>
                          <td className="max-w-[230px] px-4 py-3 align-top">
                            <p className="break-all text-[#c9d1d9]">{order.email}</p>
                            <p className="mt-1 text-[#8b949e]">{order.phone}</p>
                          </td>
                          <td className="max-w-[220px] px-4 py-3 align-top">
                            <p className="font-semibold text-[#c9d1d9]">{order.paymentmethod}</p>
                            {order.txid && <p className="mt-1 break-all text-xs text-[#8b949e]">{order.txid}</p>}
                          </td>
                          <td className="max-w-[280px] px-4 py-3 align-top text-[#c9d1d9]">
                            {order.delivery_address ? (
                              <>
                                <p>{order.delivery_address}</p>
                                {order.delivery_lat && order.delivery_lng && (
                                  <a
                                    className="mt-1 inline-block text-[#58a6ff] hover:underline"
                                    href={`https://www.openstreetmap.org/?mlat=${order.delivery_lat}&mlon=${order.delivery_lng}#map=18/${order.delivery_lat}/${order.delivery_lng}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Abrir mapa
                                  </a>
                                )}
                              </>
                            ) : (
                              <span className="text-[#8b949e]">Sin dirección</span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 align-top text-[#c9d1d9]">{formatDateTime(order.created_at)}</td>
                          <td className="px-3 py-2 text-center align-top">
                            <button
                              type="button"
                              onClick={() => handleRemove(order.id)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#30363d] text-[#f85149] hover:border-[#f85149] hover:bg-[#da3633]/15"
                              aria-label={`Eliminar pedido ${order.id}`}
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
                <p className="p-4 text-[#8b949e]">No hay pedidos disponibles.</p>
              )}
          </section>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="my-72 mx-auto text-center">
        <button
          onClick={() => signInAsAdmin(router.asPath)}
          className="hover:bg-white hover:text-black rounded-full border-2 border-white px-4 py-2 my-8"
        >
          Iniciar Sesión
        </button>
      </div>
    </>
  );
}
