import { useState } from "react";
import PModal from "@/components/postularModal";

const Tienda = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
