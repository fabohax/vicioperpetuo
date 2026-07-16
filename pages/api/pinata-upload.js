import { auth } from "@/auth";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "12mb",
    },
  },
};

const cleanFileName = (fileName) =>
  String(fileName || "cover")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);

const readPinataError = async (response) => {
  try {
    const body = await response.json();
    return body?.error?.details || body?.error || body?.message || JSON.stringify(body);
  } catch {
    return response.text();
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo no permitido." });
  }

  const session = await auth(req, res);
  if (!session) {
    return res.status(401).json({ error: "Debes iniciar sesion para subir imagenes." });
  }

  const pinataJwt = process.env.PINATA_JWT;
  if (!pinataJwt) {
    return res.status(500).json({ error: "Falta configurar PINATA_JWT." });
  }

  const { fileName, contentType, dataUrl } = req.body || {};
  const match = typeof dataUrl === "string" ? dataUrl.match(/^data:(.+);base64,(.+)$/) : null;
  const imageType = contentType || match?.[1];

  if (!match || !imageType || !ALLOWED_IMAGE_TYPES.has(imageType)) {
    return res.status(400).json({ error: "Sube una imagen JPG, PNG, WEBP o GIF valida." });
  }

  const buffer = Buffer.from(match[2], "base64");
  if (!buffer.length || buffer.length > MAX_IMAGE_BYTES) {
    return res.status(400).json({ error: "La imagen debe pesar menos de 8 MB." });
  }

  const uploadName = cleanFileName(fileName);
  const formData = new FormData();
  const blob = new Blob([buffer], { type: imageType });

  formData.append("file", blob, uploadName);
  formData.append("pinataMetadata", JSON.stringify({ name: uploadName }));
  formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

  const pinataResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${pinataJwt}`,
    },
    body: formData,
  });

  if (!pinataResponse.ok) {
    const message = await readPinataError(pinataResponse);
    return res.status(502).json({ error: `Pinata ${pinataResponse.status}: ${message}` });
  }

  const pinataData = await pinataResponse.json();
  const cid = pinataData.IpfsHash;

  if (!cid) {
    return res.status(502).json({ error: "Pinata no devolvio un CID." });
  }

  return res.status(200).json({
    cid,
    url: `https://ipfs.io/ipfs/${cid}`,
    isDuplicate: Boolean(pinataData.isDuplicate),
  });
}
