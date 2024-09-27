// pages/servicios.tsx
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/menu';
import PModal from '@/components/postularModal';

export default function Servicios() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <Head>
        <title>Servicios | Vicio Perpetuo Vicio Perfecto</title>
        <meta property="og:title" content="Vicio Perpetuo Vicio Perfecto | Editorial" />
        <meta property="og:url" content="https://vicioperpetuo.com" />
        <meta property="og:image" content="https://vicioperpetuo.com/public/vicio.png" />
        <meta property="og:description" content="La editorial de libros más vendida en el Perú. Fundada el 15 de enero del 2011, nuestra editorial tiene como objetivo promover a autores peruanos y transmitir nuestra identidad nacional a través de la literatura. Nos enfocamos en temas como costumbres, historia, danzas, cultura culinaria, climas, idiomas, fauna y flora, y todo lo que representa ser peruano y el concepto de Perú." />
        <meta property="twitter:title" content="Vicio Perpetuo Vicio Perfecto | Editorial" />
        <meta property="twitter:url" content="https://vicioperpetuo.com" />
        <meta property="twitter:image" content="https://vicioperpetuo.com/public/vicio.png" />
        <meta property="twitter:description" content="La editorial de libros más vendida en el Perú. Fundada el 15 de enero del 2011, nuestra editorial tiene como objetivo promover a autores peruanos y transmitir nuestra identidad nacional a través de la literatura. Nos enfocamos en temas como costumbres, historia, danzas, cultura culinaria, climas, idiomas, fauna y flora, y todo lo que representa ser peruano y el concepto de Perú." />
      </Head>

      <div id="info" className="fade-up">
        <div className="fixed top-3 left-4 z-200">
            <Link href="/" className="hover:underline font-medium">Vicio Perpetuo Vicio Perfecto</Link>
        </div>
        <Menu dark="true"/>
        <div className="rich-text-block-5 w-richtext mx-auto lg:w-1/2 py-20" id="servicios">
          <h1 className="spectral text-5xl py-20">Servicios</h1>

          <h2 className="flex items-center font-bold text-lg">
            ✅&nbsp;Corrección y estilo
          </h2>
          <p className='py-8'>
            La corrección y el estilo son servicios clave para cualquier escrito. Ofrecemos una revisión exhaustiva de errores ortográficos, gramaticales, léxicos y estilísticos, manteniendo la claridad intelectual del material. Estos servicios garantizan que los lectores reciban un contenido de alta calidad y coherente, cumpliendo con los requisitos académicos o profesionales. Mejoran su trabajo agregando fluidez a la expresión, diversidad de puntuación e incorporando respuestas claras a preguntas críticas. Además, optimizamos el resultado del documento evaluando el tono y redirigiendo información según sea necesario.
          </p>

          <h2 className="flex items-center font-bold text-lg">
            📰&nbsp;Diagramación
          </h2>
          <p className='py-8'>
            La diagramación es un servicio que se encarga de organizar la disposición de texto e imágenes en un producto impreso. Incluye el diseño de elementos gráficos, la selección de la fuente adecuada, la definición de un sistema de márgenes y la alineación visual para lograr una narrativa visual atractiva para los lectores. Para lograr un aspecto profesional y fácil comprensión, es esencial seguir principios básicos como la jerarquía de contenidos, el equilibrio y el contraste. Nuestro objetivo es crear un producto técnicamente completo y perfecto dentro del espacio disponible, donde todos los elementos trabajan juntos para comunicar adecuadamente el mensaje propuesto.
          </p>

          <h2 className="flex items-center font-bold text-lg">
            🧑‍🏫&nbsp;Talleres literarios
          </h2>
          <p className='py-8'>
            Los autores pueden mejorar sus habilidades con clases guiadas por nuestros expertos. Estas clases están diseñadas para diferentes grupos y niveles, desde principiantes hasta profesionales, adaptándose al talento y motivación de cada alumno. Los temas incluirían diversos géneros y tipos de escritura, como novelas, poesía, guiones, contenido para medios digitales, y mucho más.
          </p>

          <h2 className="flex items-center font-bold text-lg">
            📝&nbsp;Edición e impresión
          </h2>
          <p className='py-8'>
            Aseguramos la calidad de los textos antes de su publicación. Esto incluye correcciones ortográficas y gramaticales, verificación de precisión del contenido, trabajo con el autor para hacer el material atractivo e inteligible, y ayudar a encontrar el tono adecuado. También es importante revisar la presentación del manuscrito para asegurarse de que cumpla con las expectativas.
          </p>

          <h2 className="flex items-center font-bold text-lg">
            📕&nbsp;Diseño de portada
          </h2>
          <p className='py-8'>
            El servicio de diseño de portada en una editorial consiste en crear la mejor imagen posible para libros y otros productos impresos con la ayuda de expertos. Incluye la identificación del público objetivo, la selección de imágenes, la elección de color, tipografía y composición visual, con el objetivo de atraer a un lector potencial. El diseñador colabora con el autor o editor para garantizar que todos los elementos creativos representen la obra adecuadamente.
          </p>

          <h2 className="flex items-center font-bold text-lg">
          💸&nbsp;Posicionamiento y venta de libros
          </h2>
          <p className='py-8'>
            Nos encargamos de implementar estrategias publicitarias para mejorar la visibilidad del libro. Incluye técnicas creativas para su promoción, uso de medios digitales para llegar a un público amplio, creación de contenido exclusivo para compartir en redes sociales y mejorar su presencia en tiendas en línea. También se considera identificar mercados y públicos objetivos, establecer metas realistas para alcanzar el éxito editorial deseado y monitorear su progreso continuamente.
          </p>

          <button  onClick={openModal}>
          <div id="postular" className="inline-block mb-8 px-6 py-3 bg-[#222] text-white rounded-full text-lg mx-auto">
            Publica con Nosotros
          </div>
          </button>
          <br/>

          <Link href="https://api.whatsapp.com/send?phone=+51929297202&text=Hola%2C+vengo+del+sitio+vicioperpetuo.com">
            <div id="contactus" className="inline-block px-6 py-3 bg-[#25d366] text-white rounded-full text-lg mx-auto">
              Contáctanos por Whatsapp
            </div>
          </Link>
        </div>
        <PModal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      </div>
    </>
  );
}
