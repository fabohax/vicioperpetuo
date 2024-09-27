import Link from 'next/link';
import Image from 'next/image';

const Wa = () => {
  return (
    <>
      <div className='z-100'>
        <Link href="https://wa.me/+51929297202" target='_blank'>
          <Image src="/whatsapp.svg" height={21} width={21} className='fixed bottom-4 right-5' alt="wazap"></Image>
        </Link>
      </div>
    </>
  );
};

export default Wa;
