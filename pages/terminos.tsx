import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/menu";
import Reviews from "@/components/reviews";
import Wa from "@/components/wa";
import Footer from '@/components/footer';

const Terminos = () => {
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

      {/* Main Content */}
      <main className="mx-auto max-w-4xl py-16 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Términos y Condiciones</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introducción</h2>
          <p className="mb-4">
            Bienvenido a <strong>Vicio Perpetuo Vicio Perfecto</strong>. Al acceder a nuestro sitio web 
            <Link href="https://vicioperpetuo.com" className="hover:underline text-blue-600"> vicioperpetuo.com</Link>, 
            acepta cumplir con los siguientes términos y condiciones. Estos términos son aplicables a 
            todos los visitantes, usuarios y cualquier otra persona que acceda o utilice nuestros servicios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Propiedad Intelectual</h2>
          <p className="mb-4">
            Todo el contenido publicado en este sitio web, incluidas imágenes, textos, gráficos, logotipos, y 
            otros materiales son propiedad de <strong>Vicio Perpetuo Vicio Perfecto</strong> y están protegidos por las leyes 
            de derechos de autor. Queda prohibida la reproducción, distribución o publicación de este contenido 
            sin el consentimiento expreso de <strong>Vicio Perpetuo Vicio Perfecto</strong>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Uso del Sitio Web</h2>
          <p className="mb-4">
            Al usar nuestro sitio web, acepta no utilizarlo para ninguna actividad ilegal o no autorizada. 
            Queda prohibido intentar obtener acceso no autorizado a nuestras bases de datos o sistemas. 
            Nos reservamos el derecho de denegar el servicio a cualquier persona por cualquier motivo en 
            cualquier momento.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Productos y Servicios</h2>
          <p className="mb-4">
            Los productos y servicios que ofrecemos en <strong>Vicio Perpetuo Vicio Perfecto</strong> están sujetos a disponibilidad. 
            Nos reservamos el derecho de modificar o discontinuar cualquier producto o servicio en cualquier 
            momento sin previo aviso.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Políticas de Devolución</h2>
          <p className="mb-4">
            Las devoluciones y cambios de productos están sujetos a nuestra política de devoluciones. 
            Si desea devolver o cambiar un producto, consulte nuestras políticas o comuníquese con 
            nosotros a través de los canales de contacto proporcionados en el sitio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Privacidad</h2>
          <p className="mb-4">
            En <strong>Vicio Perpetuo Vicio Perfecto</strong>, valoramos su privacidad. Consulte nuestra 
            <Link href="/privacidad" className="hover:underline text-blue-600"> Política de Privacidad</Link> para 
            obtener más información sobre cómo manejamos su información personal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Modificaciones de los Términos</h2>
          <p className="mb-4">
            Nos reservamos el derecho de actualizar o modificar estos términos y condiciones en cualquier momento. 
            Le recomendamos que revise esta página periódicamente para estar al tanto de cualquier cambio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contacto</h2>
          <p className="mb-4">
            Si tiene alguna pregunta o inquietud sobre estos Términos y Condiciones, puede contactarnos a través de:
            <Link href="https://api.whatsapp.com/send?phone=+51929297202&text=Hola%2C+vengo+del+sitio+vicioperpetuo.com" className="text-blue-600 hover:underline ml-2">WhatsApp</Link>.
          </p>
        </section>
      </main>

    </div>
  );
};

export default Terminos;
