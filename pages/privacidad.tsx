import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/menu";
import Reviews from "@/components/reviews";
import Wa from "@/components/wa";
import Footer from '@/components/footer';

const PoliticaPrivacidad = () => {
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
        <h1 className="text-4xl font-bold mb-8 text-center">Política de Privacidad</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introducción</h2>
          <p className="mb-4">
            En <strong>Vicio Perpetuo Vicio Perfecto</strong>, nos comprometemos a proteger su privacidad. Esta 
            Política de Privacidad explica cómo recopilamos, usamos, y protegemos su información personal cuando 
            interactúa con nuestro sitio web <Link href="https://vicioperpetuo.com" className="hover:underline text-blue-600">vicioperpetuo.com</Link>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Información que Recopilamos</h2>
          <p className="mb-4">
            Recopilamos la información que nos proporciona al usar nuestro sitio, incluyendo:
          </p>
          <ul className="list-disc ml-8 mb-4">
            <li>Nombre y dirección de correo electrónico.</li>
            <li>Información relacionada con pedidos y compras.</li>
            <li>Direcciones de envío y facturación.</li>
            <li>Preferencias y comentarios del usuario.</li>
          </ul>
          <p className="mb-4">
            También podemos recopilar información de manera automática, como la dirección IP, tipo de navegador y 
            comportamiento de navegación en nuestro sitio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Uso de su Información</h2>
          <p className="mb-4">
            Utilizamos la información recopilada para mejorar su experiencia en nuestro sitio web, gestionar pedidos, 
            y proporcionarle servicios. Esto incluye:
          </p>
          <ul className="list-disc ml-8 mb-4">
            <li>Procesar y gestionar sus compras.</li>
            <li>Enviar correos electrónicos de confirmación y actualizaciones de pedidos.</li>
            <li>Personalizar la experiencia del usuario y ofrecer recomendaciones de productos.</li>
            <li>Enviar ofertas promocionales y noticias, solo si ha optado por recibirlas.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Cómo Protegemos su Información</h2>
          <p className="mb-4">
            Implementamos medidas de seguridad apropiadas para proteger su información contra acceso no autorizado, 
            alteración, divulgación o destrucción. Utilizamos cifrado SSL para garantizar que los datos transmitidos 
            en línea estén protegidos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Divulgación de su Información</h2>
          <p className="mb-4">
            No vendemos, intercambiamos ni transferimos su información personal a terceros sin su consentimiento, 
            excepto en los siguientes casos:
          </p>
          <ul className="list-disc ml-8 mb-4">
            <li>Para cumplir con las leyes aplicables o responder a una solicitud legal.</li>
            <li>En relación con la compra o venta de activos de la empresa, donde la información del cliente 
              puede ser uno de los activos transferidos.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Uso de Cookies</h2>
          <p className="mb-4">
            Utilizamos cookies para mejorar la funcionalidad del sitio web, personalizar la experiencia del usuario 
            y analizar el tráfico del sitio. Las cookies son pequeños archivos que se almacenan en su dispositivo 
            cuando navega en nuestro sitio web.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Sus Derechos</h2>
          <p className="mb-4">
            Usted tiene derecho a acceder, modificar o eliminar la información personal que tenemos sobre usted. 
            Puede contactarnos en cualquier momento para solicitar cambios o la eliminación de su información.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Cambios a Esta Política</h2>
          <p className="mb-4">
            Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Le recomendamos 
            revisar esta página periódicamente para estar al tanto de cualquier cambio. El uso continuado de nuestros 
            servicios después de la publicación de cambios en esta política se considerará como aceptación de dichos cambios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contacto</h2>
          <p className="mb-4">
            Si tiene alguna pregunta sobre nuestra Política de Privacidad, puede contactarnos a través de:
            <Link href="https://api.whatsapp.com/send?phone=+51929297202&text=Hola%2C+vengo+del+sitio+vicioperpetuo.com" className="text-blue-600 hover:underline ml-2">WhatsApp</Link>.
          </p>
        </section>
      </main>s
    </div>
  );
};

export default PoliticaPrivacidad;
