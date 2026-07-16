import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const ADMIN_LINKS = [
  { href: "/admin", label: "Index", iconSrc: "/index.svg" },
  { href: "/admin/indexar", label: "Añadir", iconSrc: "/add.svg" },
  { href: "/admin/autores", label: "Autores", iconSrc: "/authors.svg" },
  { href: "/admin/pedidos", label: "Pedidos", iconSrc: "/cart.svg" },
];

type AdminNavProps = {
  signOutCallbackUrl?: string;
};

export default function AdminNav({ signOutCallbackUrl }: AdminNavProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const signOutOptions = signOutCallbackUrl ? { callbackUrl: signOutCallbackUrl } : undefined;

  const isActive = (href: string) => {
    if (href === "/admin") {
      return router.pathname === "/admin";
    }

    return router.pathname.startsWith(href);
  };

  return (
    <>
      <Link
        href="/admin"
        className="fixed left-4 top-6 z-30 flex h-10 w-10 items-center justify-center shadow-sm backdrop-blur"
        aria-label="Ir al inicio de admin"
        title="Vicio Perpetuo"
      >
        <Image src="/logo.svg" alt="" width={42} height={42} aria-hidden="true" priority />
      </Link>

      <nav
        className="fixed left-1/2 top-6 z-20 hidden max-w-[calc(100vw-12rem)] -translate-x-1/2 items-center gap-8 rounded-md border border-[#30363d] bg-[#0d1117]/90 px-4 py-2 text-sm text-white shadow-sm backdrop-blur md:flex"
        aria-label="Navegación de admin"
      >
        {ADMIN_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap hover:underline ${isActive(link.href) ? "text-white" : "text-[#e6edf3]"}`}
          >
            {link.iconSrc && (
              <Image src={link.iconSrc} alt="" width={20} height={20} aria-hidden="true" className="inline-block" />
            )}{" "}
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={() => signOut(signOutOptions)}
        className="fixed right-4 top-6 z-20 hidden h-10 w-10 items-center justify-center rounded-full border border-[#30363d] bg-[#0d1117]/90 text-white backdrop-blur hover:border-[#8b949e] hover:bg-[#161b22] sm:right-8 md:inline-flex"
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
      >
        <LogOut className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-6 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#30363d] bg-[#0d1117]/90 text-white backdrop-blur transition hover:border-[#8b949e] hover:bg-[#161b22] md:hidden"
        aria-label="Abrir menú"
        title="Abrir menú"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-72 max-w-[85vw] border-l border-[#30363d] bg-[#0d1117] px-4 py-6 text-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menú de admin"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="" width={34} height={34} aria-hidden="true" />
            <span className="text-sm font-semibold">Admin</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#30363d] hover:border-[#8b949e] hover:bg-[#161b22]"
            aria-label="Cerrar menú"
            title="Cerrar menú"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-2" aria-label="Navegación móvil de admin">
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`rounded-md px-3 py-3 text-sm transition hover:bg-[#161b22] ${
                isActive(link.href) ? "bg-[#161b22] text-white" : "text-[#e6edf3]"
              }`}
            >
              {link.iconSrc && (
                <Image src={link.iconSrc} alt="" width={20} height={20} aria-hidden="true" className="inline-block" />
              )}{" "}
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => signOut(signOutOptions)}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#30363d] px-3 py-3 text-sm font-medium text-white transition hover:border-[#8b949e] hover:bg-[#161b22]"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Cerrar sesión
        </button>
      </aside>
    </>
  );
}
