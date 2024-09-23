import type { AppProps } from 'next/app'
import '@/app/lit.css'
import Footer from '@/components/footer';
import Wa from '@/components/wa';

import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Footer />
      <Wa />
    </SessionProvider>
  );
}
