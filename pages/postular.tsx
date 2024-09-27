import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/menu";
import BookCovers from "@/components/BookCovers";
import { supabase } from "@/utils/supabaseClient";
import PModal from "@/components/postularModal";

interface Book {
  title: string;
  isbn: string;
  imgurl: string;
}

const Tienda = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  if (loading) return <p className="h-screen text-center mx-auto py-2">Cargando...</p>;

  return (
    <div>
            <button onClick={openModal}
        id="postular" className="items-center text-center border-[1px] border-[#fff] p-2 mb-8 block px-6 py-3 bg-[#f4510ff] text-white rounded-full text-lg mx-auto hover:underline mx-auto">
          Publica con Nosotros
      </button>
      <PModal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Tienda;
