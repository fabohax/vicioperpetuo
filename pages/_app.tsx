import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import 'leaflet/dist/leaflet.css'
import '@/app/lit.css'
import Footer from '@/components/footer';
import Wa from '@/components/wa';
import { DEFAULT_DESCRIPTION, DEFAULT_IMAGE, DEFAULT_TITLE, SITE_NAME, SITE_URL } from '@/lib/seo';

import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const cleanPath = router.asPath.split("#")[0].split("?")[0] || "/";
  const noindex =
    cleanPath.startsWith("/admin") ||
    cleanPath === "/hecho" ||
    cleanPath === "/recibido";

  return (
    <SessionProvider session={session}>
      <Head>
        <title key="title">{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} key="description" />
        <meta name="application-name" content={SITE_NAME} />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} key="robots" />
        <link rel="canonical" href={`${SITE_URL}${cleanPath}`} key="canonical" />
        <meta property="og:site_name" content={SITE_NAME} key="og:site_name" />
        <meta property="og:title" content={DEFAULT_TITLE} key="og:title" />
        <meta property="og:description" content={DEFAULT_DESCRIPTION} key="og:description" />
        <meta property="og:url" content={`${SITE_URL}${cleanPath}`} key="og:url" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:image" content={DEFAULT_IMAGE} key="og:image" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={DEFAULT_TITLE} key="twitter:title" />
        <meta name="twitter:description" content={DEFAULT_DESCRIPTION} key="twitter:description" />
        <meta name="twitter:image" content={DEFAULT_IMAGE} key="twitter:image" />
      </Head>
      <Component {...pageProps} />
      <Footer />
      <Wa />
    </SessionProvider>
  );
}
