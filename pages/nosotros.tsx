import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/menu';

export default function Nosotros() {
  return (
    <>
      <div>
        <div className="fixed top-3 left-4 z-200">
            <Link href="/" className="hover:underline font-medium">Vicio Perpetuo Vicio Perfecto</Link>
        </div>
        <Menu dark="true"/>
        <div className="container mx-auto p-6 lg:w-1/2">  
          <div className="text-center my-20">
            <h1 className="text-7xl font-bold mb-2 spectral">
              La editorial de libros más vendida en el Perú
              <Image src="/peru.svg" alt="Perú" width={25} height={25} className="inline-block ml-2 blink" />
            </h1>
            <h2 className="text-xl italic">Dirigida por Julio Benavides Parra</h2>
          </div>

          <div className="text-lg leading-7 mb-10">
            <p>Fundada el 15 de enero del 2011, nuestra editorial tiene como objetivo promover a autores peruanos y transmitir nuestra identidad nacional a través de la literatura. Nos enfocamos en temas como costumbres, historia, danzas, cultura culinaria, climas, idiomas, fauna y flora, y todo lo que representa ser peruano y el concepto de Perú.</p>
            <p className="mt-4">Nos apasiona dar a conocer las historias únicas y diversas de nuestros autores peruanos, desde la ficción hasta la no ficción, pasando por la poesía y la literatura infantil. Nos esforzamos por brindar una plataforma para que las voces de nuestros autores sean escuchadas a nivel nacional e internacional.</p>
          </div>

          <div className="flex flex-cols-1 gap-8">
            <div>
              <Link href="/events/15012023/01.JPG" target='_blank'>
                <Image src="/events/15012023/01.JPG" alt="Julio Benavides Parra presentando libro 'Ácleman'" width={500} height={720} className="rounded-lg" />
              </Link>
              <p className="text-center mt-2">▲ 12 aniversario de la Editorial celebrado en el Bar Mal de Amores, Barranco. 2023.</p>
            </div>
            <div>
              <Link href="/events/15012023/02.JPG" target='_blank'>
                <Image src="/events/15012023/02.JPG" alt="Jóvenes autores en evento de Vicio Perpetuo Vicio Perfecto" width={500} height={300} className="rounded-lg" />
              </Link>
              <p className="text-center mt-2">▲ Juan Romero (izq.) y Walter Velásquez (der.) exponiendo el contenido de sus libros.</p>
            </div>
            <div>
              <Link href="/events/15012023/03.JPG" target='_blank'>
                <Image src="/events/15012023/03.JPG" alt="Héctor Ñaupari presentando su libro" width={500} height={720} className="rounded-lg" />
              </Link>
              <p className="text-center mt-2">▲ Héctor Ñaupari presentando su libro `&quot;La boca de la sombra`&quot;.</p>
            </div>
          </div>
          

          <div className="text-center my-20">
            <div className='my-8 w-full'>
              <Link href="/servicios" className='underline text-center'>Revisa los servicios que ofrecemos</Link>
            </div>
            <Link href="https://api.whatsapp.com/send?phone=+51929297202&text=Hola%2C+vengo+del+sitio+vicioperpetuo.com">
              <div className="inline-block px-6 py-3 bg-[#25d366] text-white rounded-full text-lg">Contáctanos por Whatsapp</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
