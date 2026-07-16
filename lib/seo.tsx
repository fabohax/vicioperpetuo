import Head from "next/head";

export const SITE_URL = "https://vicioperpetuo.com";
export const SITE_NAME = "Vicio Perpetuo Vicio Perfecto";
export const DEFAULT_TITLE = `${SITE_NAME} | Editorial peruana`;
export const DEFAULT_DESCRIPTION =
  "Editorial peruana fundada en 2011. Publicamos libros de poesia, narrativa y cuento, promoviendo autores peruanos e identidad cultural.";
export const DEFAULT_IMAGE = `${SITE_URL}/vicio.png`;

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "book";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const absoluteUrl = (value: string) => {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

export function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
}: SeoProps) {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={canonical} key="canonical" />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} key="robots" />
      <meta property="og:site_name" content={SITE_NAME} key="og:site_name" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:url" content={canonical} key="og:url" />
      <meta property="og:type" content={type === "book" ? "book" : type} key="og:type" />
      <meta property="og:image" content={imageUrl} key="og:image" />
      <meta property="og:image:alt" content={title} key="og:image:alt" />
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:image" content={imageUrl} key="twitter:image" />
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="json-ld"
        />
      ) : null}
    </Head>
  );
}
