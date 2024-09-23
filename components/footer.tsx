import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <>
      <footer className="footer-container px-4 py-16 border-t-[1px] border-[#333] lg:text:md text-lg">

          <div>
            <Image src="/logo.svg" height={91} width={91} alt="vpvp-logo" className='block'></Image>
          </div>
          <div className='my-4 lg:text-3xl text-3xl'>
            <Link href="/">
            Vicio Perpetuo Vicio Perfecto™
            </Link>
          </div>

          <div className='mb-8 italic'>
            Editorial peruana de cultura generacional
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="div-block-36">
              <Link href="/nosotros" className="hover:underline my-4">Nosotros</Link>
            </div>

            <div className="div-block-36">
              <Link href="/autores" className="hover:underline my-4">Autores</Link>
            </div>

            <div className="div-block-36">
              <Link href="/tienda" className="hover:underline my-4">Tienda</Link>
            </div>

            <div className="div-block-36">
              <Link href="/servicios" className="hover:underline my-4">Servicios</Link>
            </div>
            
            <div className="div-block-36">
              <Link href="/terminos" className="hover:underline my-4">Términos y Condiciones</Link>
            </div>

            <div className="div-block-36">
              <Link href="/privacidad" className="hover:underline my-4">Política de Privacidad</Link>
            </div>
          </div>

              
        <div className="div-block-36 mt-4">
          <Link href="tel:+51929297202" className="hover:underline my-4 w-inline-block">
            Contacto
          </Link>
          &nbsp;|&nbsp;
          <Link href="https://es-la.facebook.com/EdicionesVicioPerpetuoVicioPerfecto/" className="hover:underline my-4">
            Facebook
          </Link>
          &nbsp;|&nbsp;
          <Link href="https://www.instagram.com/edicionesvicioperpetuo/" className="hover:underline my-4">
          Instagram
          </Link>
        </div>
             

        
          
        
      </footer>

      <div className="relative h-8 bg-black text-left flex items-center px-4 py-8 text-2xl lg:text-lg">
        <p>
            <Link href="https://hax.pe" target="_blank" className="hover:underline hover:text-white text-[#f1f1f1]">hax.pe</Link>
        </p>
    </div>
    </>
  );
};

export default Footer;
