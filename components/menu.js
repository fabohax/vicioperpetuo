'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import styles from './menu.module.css';
import PModal from './postularModal';

const Menu = ({ dark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPostularOpen, setIsPostularOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

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

  useEffect(() => {
    let isMounted = true;

    fetch('/api/auth/session')
      .then((response) => response.ok ? response.json() : null)
      .then((session) => {
        if (isMounted) {
          setIsLoggedIn(Boolean(session?.user));
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoggedIn(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={isDarkMode ? styles.inverted : ''}>
      <div className={styles.topActions}>
        {isLoggedIn === null ? null : isLoggedIn ? (
          <button
            type="button"
            className={`${styles.profileButton} ${isDarkMode ? styles.profileButtonDark : ''}`}
            onClick={() => signOut({ callbackUrl: '/' })}
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            <LogOut className={styles.logoutIcon} aria-hidden="true" />
          </button>
        ) : (
          <>
            <button
              type="button"
              className={`${styles.publishButton} ${isDarkMode ? styles.publishButtonDark : ''}`}
              onClick={() => setIsPostularOpen(true)}
            >
              Publicar
            </button>
            <Link
              href="/admin"
              className={`${styles.profileButton} ${isDarkMode ? styles.profileButtonDark : ''}`}
              aria-label="Ir a iniciar sesión de administrador"
            >
              <span className={styles.profileIcon} aria-hidden="true" />
            </Link>
          </>
        )}
      </div>
      <div className='z-100'>
        {isMenuOpen ? (
          <Image
            src={isDarkMode ? "/close-dark.svg" : "/close.svg"}
            height={21}
            width={21}
            alt="menu"
            onClick={closeMenu}
            className={styles.menuIcon}
            style={{ width: "21px", height: "auto" }}
          />
        ) : (
          <Image
            src={isDarkMode ? "/open-dark.svg" : "/open.svg"}
            height={21}
            width={21}
            alt="menu"
            onClick={openMenu}
            className={styles.menuIcon}
            style={{ width: "21px", height: "auto" }}
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
            <Image src={isDarkMode ? "/facebook-dark.svg" : "/facebook.svg"} alt="facebook" height="21" width="21" style={{ width: "21px", height: "auto" }}/>
          </Link>
          <Link href="https://instagram.com/edicionesvicioperpetuo" target='_blank' className='m-4 inline-block' onClick={handleLinkClick}>
            <Image src={isDarkMode ? "/instagram-dark.svg" : "/instagram.svg"} alt="instagram" height="21" width="21" style={{ width: "21px", height: "auto" }}/>
          </Link>
        </div>
      </div>
      <PModal
        isOpen={isPostularOpen}
        onClose={() => setIsPostularOpen(false)}
      />
    </div>
  );
}

export default Menu;
