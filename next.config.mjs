const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  (process.env.SUPABASE_ID ? `https://${process.env.SUPABASE_ID}.supabase.co` : "");

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_API_KEY || "";

/** @type {import('next').Config} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_SUPABASE_URL: supabaseUrl,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey,
    },
    images: {
      remotePatterns: [
        { protocol: "https", hostname: "vicioperpetuo.com" },
        { protocol: "https", hostname: "i.imgur.com" },
        { protocol: "https", hostname: "hax.pe" },
      ],
    },
  };
  
  export default nextConfig;
  
