import { supabase } from "@/utils/supabaseClient";

const ADMIN_EMAILS = ["fabohax@gmail.com", "edicionesvicioperpetuo@gmail.com"];

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getResendErrorMessage = (errorBody) => {
  if (!errorBody) return "Resend no devolvio detalles del error.";
  if (typeof errorBody === "string") return errorBody;
  return errorBody.message || errorBody.error || JSON.stringify(errorBody);
};

const sendResendEmail = async ({ to, subject, html }) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Falta configurar RESEND_API_KEY.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "Vicio Perpetuo <pedidos@vicioperpetuo.com>",
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    let errorBody = null;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = await response.text();
    }

    throw new Error(`Resend ${response.status}: ${getResendErrorMessage(errorBody)}`);
  }

  return response.json();
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Metodo no permitido." });
  }

  const { name, lastname, email, phone, honeypot } = req.body;
  const cleanName = String(name || "").trim();
  const cleanLastname = String(lastname || "").trim();
  const cleanEmail = String(email || "").trim().toLowerCase();
  const cleanPhone = String(phone || "").trim();

  if (honeypot) {
    return res.status(400).json({ success: false, error: "No pudimos validar la postulacion." });
  }

  if (!cleanName || !cleanLastname || !cleanEmail || !cleanPhone) {
    return res.status(400).json({ success: false, error: "Faltan datos necesarios para la postulacion." });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(cleanEmail)) {
    return res.status(400).json({ success: false, error: "Correo electronico invalido." });
  }

  try {
    const { error } = await supabase
      .from("vpvp_postus")
      .insert([{ name: cleanName, lastname: cleanLastname, email: cleanEmail, phone: cleanPhone }]);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error inserting application into Supabase:", error);
    return res.status(500).json({
      success: false,
      error: `No pudimos guardar la postulacion en la base de datos: ${error.message}`,
    });
  }

  const adminHtml = `
    <div style="border:1px solid #f0f0f0;border-radius:10px;padding:3em;margin:0 auto;font-family:Arial,sans-serif;">
      <h2 style="margin-top:0;">Nueva postulacion</h2>
      <table style="font-size:16px;width:100%;">
        <tr><td><strong>Nombre:</strong></td><td>${escapeHtml(cleanName)} ${escapeHtml(cleanLastname)}</td></tr>
        <tr><td><strong>Correo:</strong></td><td>${escapeHtml(cleanEmail)}</td></tr>
        <tr><td><strong>Telefono:</strong></td><td>${escapeHtml(cleanPhone)}</td></tr>
      </table>
      <p><a href="https://vicioperpetuo.com" target="_blank">vicioperpetuo.com</a></p>
    </div>
  `;

  const userHtml = `
    <div style="border:1px solid #f0f0f0;border-radius:10px;padding:3em;margin:0 auto;font-family:Arial,sans-serif;">
      <h2 style="margin-top:0;">Postulacion recibida</h2>
      <p>Hola ${escapeHtml(cleanName)}, hemos recibido tu informacion.</p>
      <p>Nos pondremos en contacto contigo pronto.</p>
      <p>Gracias por escribir a Vicio Perpetuo Vicio Perfecto.</p>
      <p><a href="https://vicioperpetuo.com" target="_blank">vicioperpetuo.com</a></p>
    </div>
  `;

  const emailJobs = [
    {
      label: "admin",
      to: ADMIN_EMAILS,
      subject: `Nueva postulacion: ${cleanName} ${cleanLastname}`,
      html: adminHtml,
    },
    {
      label: "solicitante",
      to: cleanEmail,
      subject: "Postulacion recibida",
      html: userHtml,
    },
  ];

  const emailResults = await Promise.allSettled(
    emailJobs.map(({ to, subject, html }) => sendResendEmail({ to, subject, html }))
  );
  const failedEmails = emailResults
    .map((result, index) => ({ result, job: emailJobs[index] }))
    .filter(({ result }) => result.status === "rejected");

  if (failedEmails.length > 0) {
    console.error(
      "Error sending application emails:",
      JSON.stringify(failedEmails.map(({ result, job }) => ({
        recipient: job.label,
        to: job.to,
        error: result.reason?.message || String(result.reason),
      })))
    );

    return res.status(200).json({
      success: true,
      warning: "Postulacion registrada, pero no pudimos enviar todos los correos de confirmacion.",
      failedEmails: failedEmails.map(({ job }) => job.label),
    });
  }

  return res.status(200).json({
    success: true,
    message: "Postulacion recibida. Enviamos una confirmacion por correo.",
  });
}
