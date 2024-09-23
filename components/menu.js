'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './menu.module.css';

const Menu = ({ dark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Convert dark prop to a boolean
  const isDarkMode = dark === "true";

  const openMenu = () => {
    setIsMenuOpen(true);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  const handleLinkClick = () => {
    closeMenu();
  }

  return (
    <div className={isDarkMode ? styles.inverted : ''}>
      <div className='z-100'>
        {isMenuOpen ? (
          <Image
            src={isDarkMode ? "/close-dark.svg" : "/close.svg"}
            height={21}
            width={21}
            alt="menu"
            onClick={closeMenu}
            className={styles.menuIcon}
          />
        ) : (
          <Image
            src={isDarkMode ? "/open-dark.svg" : "/open.svg"}
            height={21}
            width={21}
            alt="menu"
            onClick={openMenu}
            className={styles.menuIcon}
          />
        )}
      </div>
      <div className={`${styles.menuContainer} ${isMenuOpen ? styles.open : ''} ${isDarkMode ? styles.inverted : ''}`}>
        <Link href="/nosotros" className='block hover:underline p-4 text-2xl' onClick={handleLinkClick}>Nosotros</Link>
        <Link href="/servicios" className='block hover:underline p-4 text-2xl' onClick={handleLinkClick}>Servicios</Link>
        <Link href="/autores" className='block hover:underline p-4 text-2xl' onClick={handleLinkClick}>Autores</Link>
        <Link href="/tienda" className='block hover:underline p-4 text-2xl' onClick={handleLinkClick}>Tienda</Link>
        <div className="">
          <Link href="https://facebook.com/edicionesvicioperpetuovicioperfecto" target='_blank' className='rounded-md m-4 inline-block' onClick={handleLinkClick}>
            <Image src={isDarkMode ? "/facebook-dark.svg" : "/facebook.svg"} alt="facebook" height="21" width="21"/>
          </Link>
          <Link href="https://instagram.com/edicionesvicioperpetuo" target='_blank' className='m-4 inline-block' onClick={handleLinkClick}>
            <Image src={isDarkMode ? "/instagram-dark.svg" : "/instagram.svg"} alt="instagram" height="21" width="21"/>
          </Link>
        </div>
      </div>     
    </div>
  );
}

export default Menu;
