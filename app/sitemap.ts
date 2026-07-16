import type { MetadataRoute } from "next";
import { supabase } from "@/utils/supabaseClient";
import { SITE_URL } from "@/lib/seo";

const staticRoutes = [
  "",
  "tienda",
  "autores",
  "nosotros",
  "servicios",
  "poesia",
  "narrativa",
  "cuento",
  "postular",
  "contacto",
  "terminos",
  "privacidad",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}/${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "tienda" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "tienda" ? 0.9 : 0.7,
  }));

  const { data: books } = await supabase.from("vpvp_books").select("isbn, created_at");
  const seen = new Set<string>();
  const bookEntries = (books || []).flatMap((book: { isbn?: string | null; created_at?: string | null }) => {
    const isbn = typeof book.isbn === "string" ? book.isbn.trim() : "";
    if (!isbn || seen.has(isbn)) return [];
    seen.add(isbn);

    return [
      {
        url: `${SITE_URL}/o/${encodeURIComponent(isbn)}`,
        lastModified: book.created_at ? new Date(book.created_at) : now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
    ];
  });

  return [...staticEntries, ...bookEntries];
}
