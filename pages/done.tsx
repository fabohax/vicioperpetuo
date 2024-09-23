import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/menu";

const Done = () => {
  return (
    <div>
      {/* Header */}
      <header className="fixed top-3 left-4 z-200">
        <Link href="/" className="hover:underline font-medium">
          Vicio Perpetuo Vicio Perfecto
        </Link>
      </header>
      
      {/* Main Menu */}
      <Menu dark="true" />

      {/* Thank You Message */}
      <div className="flex flex-col justify-center items-center h-screen text-center px-4">
        <h1 className="text-4xl font-bold my-4">¡Gracias por tu pedido!</h1>
        <p className="text-xl mb-4">Hemos recibido tu orden. Te enviaremos un correo de confirmación pronto.</p>
        
        {/* Peruvian Literature Quote */}
        <blockquote className="italic text-lg text-center mt-6">
        <p>&quot;La vida está hecha de decisiones pequeñas, y en esas decisiones cotidianas se refleja nuestra verdadera naturaleza.&quot;</p>
        <p className="mt-4 text-right">— Julio Ramón Ribeyro</p>
        </blockquote>

        
          <Link href="https://api.whatsapp.com/send?phone=+51929297202&text=Hola%2C+vengo+del+sitio+vicioperpetuo.com">
              <div className="inline-block px-6 py-3 bg-[#25d366] text-white rounded-full text-lg my-8">Contáctanos por Whatsapp</div>
            </Link>
        

        {/* Link to Continue Shopping */}
        <Link href="/" className="mt-10 hover:underline text-lg font-semibold text-blue-500">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Done;
