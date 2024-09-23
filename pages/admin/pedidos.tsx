import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/router";

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Order {
  id: number;
  email: string;
  phone: string;
  txid: string;
  paymentmethod: string;
  booktitle: string;
  bookauthor: string;
  bookprice: number;
  created_at: string; // Add created_at to the interface
}

export default function Pedidos() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("vpvp_store")
          .select("id, email, phone, txid, paymentmethod, booktitle, bookauthor, bookprice, created_at"); // Include created_at
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

  if (session) {
    return (
      <>
        <div>
          <div className="backdrop-blur flex flex-row fixed top-8 left-8 gap-2 space-x-8">
            <div>
              👤 <Link href="/admin" className="hover:underline">
                {session?.user?.email?.split("@")[0] || "NN"}
              </Link>
            </div>
            <div>
              📇 <Link href="/admin/indexar" className="hover:underline">Indexar</Link>
            </div>
            <div>🪶 <Link href="/admin/autores" className="hover:underline">Autores</Link></div>
          </div>
          <button
            onClick={() => signOut()}
            className="backdrop-blur fixed top-0 right-8 hover:bg-black hover:text-white my-8 border-[1px] border-black rounded-full px-4 py-2 text-sm"
          >
            CERRAR SESIÓN
          </button>

          {/* Orders List */}
          <h1 className="spectral text-2xl font-bold text-left mt-20 mx-8">
            Pedidos Recientes
          </h1>
          <p className="mx-8">Aquí puedes revisar la lista completa de pedidos realizados.</p>

          <div className="grid grid-col lg:grid-cols container mx-auto p-4 my-4 px-4 lg:w-full border-[1px] border-[#777] py-4 rounded-lg spectral">
            <div className="py-2">
              <h3 className="border-[1px] border-[#777] bg-[#f3f3f3] rounded-md px-4 mr-4">Pedidos</h3>
              {loading ? (
                <p className="p-2">Cargando pedidos...</p>
              ) : orders.length ? (
                <ul className="space-y-4">
                  {orders.map((order) => (
                    <li key={order.id} className="flex justify-between items-center p-4 bg-gray-100 border-[1px] border-[#777] bg-[#f3f3f3] rounded-md rounded-lg mt-2 mr-4">
                      <div>
                        <p><strong>Título:</strong> {order.booktitle}</p>
                        <p><strong>Autor:</strong> {order.bookauthor}</p>
                        <p><strong>Precio:</strong> {order.bookprice} PEN</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        {order.txid && (
                          <p>
                            <strong>TXID:</strong> <b className="break-all">{order.txid}</b>
                          </p>
                        )}
                        <p><strong>Método:</strong> {order.paymentmethod}</p>
                        <p><strong>Fecha de pedido:</strong> {formatDateTime(order.created_at)}</p>
                      </div>
                      <button
                        onClick={() => handleRemove(order.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay pedidos disponibles.</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="my-72 mx-auto text-center">
        <button
          onClick={() => signIn()}
          className="hover:bg-white hover:text-black rounded-full border-2 border-white px-4 py-2 my-8"
        >
          Iniciar Sesión
        </button>
      </div>
    </>
  );
}
