import { CheckCircle2, Copy, Image as ImageIcon, UploadCloud } from "lucide-react";
import { useMemo, useState } from "react";

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
    reader.readAsDataURL(file);
  });

export default function PinataImageUpload({ value, onChange }) {
  const [localPreview, setLocalPreview] = useState("");
  const [cid, setCid] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const previewUrl = useMemo(() => localPreview || value || "", [localPreview, value]);

  const uploadImage = async (file) => {
    setError("");
    setCid("");

    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen.");
      return;
    }

    setIsUploading(true);
    setStatus("Subiendo imagen a IPFS...");

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setLocalPreview(dataUrl);

      const response = await fetch("/api/pinata-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          dataUrl,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "No se pudo subir la imagen.");
      }

      setCid(result.cid);
      onChange(result.url);
      setLocalPreview("");
      setStatus("Imagen subida.");
    } catch (uploadError) {
      setError(uploadError.message || "No se pudo subir la imagen.");
      setStatus("");
    } finally {
      setIsUploading(false);
    }
  };

  const copyCid = async () => {
    if (!cid) return;
    await navigator.clipboard.writeText(cid);
    setStatus("CID copiado.");
  };

  return (
    <div className="grid gap-3 sm:col-span-2">
      <div
        className="flex min-h-96 w-full items-end overflow-hidden rounded-md border border-[#30363d] bg-[#010409] bg-cover bg-center"
        style={{
          backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
        }}
      >
        <div className="flex w-full flex-col gap-3 bg-[#010409]/85 p-4 backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              name="imgurl"
              type="text"
              placeholder="URL de Imagen de Portada"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              className="min-w-0 flex-1 rounded-md border border-[#30363d] bg-[#010409] px-4 py-3 text-white outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
            />
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-4 py-3 font-semibold text-white hover:border-[#8b949e] hover:bg-[#1f2937]">
              <UploadCloud className="h-5 w-5" aria-hidden="true" />
              {isUploading ? "Subiendo..." : "Subir"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="sr-only"
                disabled={isUploading}
                onChange={(event) => uploadImage(event.target.files?.[0])}
              />
            </label>
          </div>

          <div className="flex flex-col gap-2 text-sm text-[#8b949e] sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-2">
              {cid ? <CheckCircle2 className="h-4 w-4 text-[#3fb950]" aria-hidden="true" /> : <ImageIcon className="h-4 w-4" aria-hidden="true" />}
              {error || status || "Sube una portada con Pinata o pega una URL."}
            </span>
            {cid ? (
              <button
                type="button"
                onClick={copyCid}
                className="inline-flex items-center gap-2 self-start rounded-md border border-[#30363d] px-3 py-2 text-white hover:border-[#8b949e] hover:bg-[#161b22] sm:self-auto"
              >
                <Copy className="h-4 w-4" aria-hidden="true" />
                {cid.slice(0, 12)}...
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
