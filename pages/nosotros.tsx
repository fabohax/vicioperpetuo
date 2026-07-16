import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/menu';
import PModal from '@/components/postularModal'
import { Seo } from '@/lib/seo';

const galleryImages = [
  {
    src: "/events/15012023/01.JPG",
    alt: "Julio Benavides Parra presentando libro 'Acleman'",
    width: 500,
    height: 720,
    caption: "12 aniversario de la Editorial celebrado en el Bar Mal de Amores, Barranco. 2023.",
  },
  {
    src: "/events/15012023/02.JPG",
    alt: "Juan Romero y Walter Velasquez exponiendo el contenido de sus libros",
    width: 500,
    height: 300,
    caption: "Juan Romero (izq.) y Walter Velasquez (der.) exponiendo el contenido de sus libros.",
  },
  {
    src: "/events/15012023/03.JPG",
    alt: "Hector Naupari presentando su libro La boca de la sombra",
    width: 500,
    height: 720,
    caption: 'Hector Naupari presentando su libro "La boca de la sombra".',
  },
] as const;

export default function Nosotros() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[number] | null>(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <Seo
        title="Nosotros | Vicio Perpetuo Vicio Perfecto"
        description="Conoce la historia de Vicio Perpetuo Vicio Perfecto, editorial peruana fundada en 2011 y dirigida por Julio Benavides Parra."
        path="/nosotros"
      />
      <div>
        <div className="fixed top-3 left-4 z-200">
            <Link href="/" className="hover:underline font-medium">Vicio Perpetuo Vicio Perfecto</Link>
        </div>
        <Menu dark="true"/>
        <div className="container mx-auto p-6 lg:w-1/2">  
          <div className="text-center my-20">
            <h1 className="text-7xl font-bold mb-2 spectral">
              La editorial de libros más vendida en el Perú
              <Image src="/peru.svg" alt="Perú" width={25} height={25} className="inline-block ml-2 blink" style={{ width: "25px", height: "auto" }} />
            </h1>
            <h2 className="text-xl italic">Dirigida por Julio Benavides Parra</h2>
          </div>

          <div className="text-lg leading-7 mb-10">
            <p>Fundada el 15 de enero del 2011, nuestra editorial tiene como objetivo promover a autores peruanos y transmitir nuestra identidad nacional a través de la literatura. Nos enfocamos en temas como costumbres, historia, danzas, cultura culinaria, climas, idiomas, fauna y flora, y todo lo que representa ser peruano y el concepto de Perú.</p>
            <p className="mt-4">Nos apasiona dar a conocer las historias únicas y diversas de nuestros autores peruanos, desde la ficción hasta la no ficción, pasando por la poesía y la literatura infantil. Nos esforzamos por brindar una plataforma para que las voces de nuestros autores sean escuchadas a nivel nacional e internacional.</p>
          </div>

          <div className="my-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <figure key={image.src} className="group">
                <button
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-[#333] bg-[#161616] text-left focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label={`Ampliar imagen: ${image.caption}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </button>
                <figcaption className="mt-3 text-center text-base leading-6 text-[#111]">
                  ▲ {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          

          <div className="text-center my-20">
            <div className='my-8 w-full'>
              <Link href="/servicios" className='underline text-center'>Revisa los servicios que ofrecemos</Link>
            </div>
            <button onClick={openModal}
              id="postular" className="items-center text-center border-[1px] border-[#fff] p-2 mb-8 block px-6 py-3 bg-[#333] text-white rounded-full text-lg mx-auto mx-auto">
                Publica con Nosotros
            </button>
            <Link href="https://api.whatsapp.com/send?phone=+51929297202&text=Hola%2C+vengo+del+sitio+vicioperpetuo.com">
              <div className="inline-block px-6 py-3 bg-[#25d366] text-white rounded-full text-lg">Contáctanos por Whatsapp</div>
            </Link>
          </div>
        </div>
        <PModal
          isOpen={isModalOpen}
          onClose={closeModal}
        />
        {selectedImage && (
          <div
            className="fixed inset-0 z-[2147483646] flex items-center justify-center bg-black/85 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <figure
              className="relative w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Cerrar imagen ampliada"
                className="absolute right-0 top-0 z-10 flex h-10 w-10 -translate-y-12 items-center justify-center rounded-full border border-[#555] bg-black text-2xl leading-none text-white hover:bg-white hover:text-black focus:border-[#555] focus:outline-none"
              >
                ×
              </button>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="mx-auto max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
                priority
              />
              <figcaption className="mx-auto mt-4 max-w-2xl text-center text-base leading-6 text-white">
                {selectedImage.caption}
              </figcaption>
            </figure>
          </div>
        )}
      </div>
    </>
  );
}
