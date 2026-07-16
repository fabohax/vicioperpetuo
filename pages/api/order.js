import { supabase } from "@/utils/supabaseClient";

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

const orderHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Metodo no permitido." });
  }

  const { email, phone, txid, bookTitle, bookAuthor, bookPrice, paymentMethod, deliveryLocation, honeypot } = req.body;
  const phoneForDisplay = String(phone || "").trim();
  const phoneForDatabase = phoneForDisplay.replace(/\D/g, "");
  const deliveryAddress = deliveryLocation?.address || "";
  const deliveryLat = Number(deliveryLocation?.lat);
  const deliveryLng = Number(deliveryLocation?.lng);
  const deliveryPlaceId = deliveryLocation?.placeId || "";
  const deliveryMapUrl = Number.isFinite(deliveryLat) && Number.isFinite(deliveryLng)
    ? `https://www.openstreetmap.org/?mlat=${deliveryLat}&mlon=${deliveryLng}#map=18/${deliveryLat}/${deliveryLng}`
    : "";

  // Honeypot check to detect bots
  if (honeypot) {
    return res.status(400).json({ success: false, error: "No pudimos validar el pedido." });
  }

  if (!email || !phoneForDatabase || !bookTitle || !bookAuthor || !bookPrice || !paymentMethod) {
    return res.status(400).json({ success: false, error: "Faltan datos del pedido. Revisa correo, telefono, metodo de pago y libro." });
  }

  if (!deliveryAddress || !deliveryMapUrl) {
    return res.status(400).json({ success: false, error: "Falta la direccion de entrega o el pin del mapa." });
  }

  // Insert the form data into Supabase `vpvp_store`
  try {
    const orderRecord = {
      email,
      phone: phoneForDatabase,
      txid,
      paymentmethod: paymentMethod,
      booktitle: bookTitle,
      bookauthor: bookAuthor,
      bookprice: bookPrice,
      delivery_address: deliveryAddress,
      delivery_lat: deliveryLat,
      delivery_lng: deliveryLng,
      delivery_place_id: deliveryPlaceId,
    };

    const { error } = await supabase
      .from("vpvp_store")
      .insert([orderRecord]);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error inserting into Supabase:", error);
    return res.status(500).json({ success: false, error: `No pudimos guardar el pedido en la base de datos: ${error.message}` });
  }

  // HTML template for the email sent to the admin
  const adminHtmlMail = `
    <div style="border: 1px solid #f0f0f0; border-radius: 10px; padding: 3em; margin: 0 auto;">
      <h2 style="color:#f00;font-weight: bold;">Nueva Orden:</h2>
      <table style="font-size: 16px; width: 100%;">
        <tr><td style="width: 50%;"><strong>Email:</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${escapeHtml(phoneForDisplay)}</td></tr>
        <tr><td><strong>TXID:</strong></td><td>${escapeHtml(txid)}</td></tr>
        <tr><td><strong>Book Title:</strong></td><td>${escapeHtml(bookTitle)}</td></tr>
        <tr><td><strong>Book Author:</strong></td><td>${escapeHtml(bookAuthor)}</td></tr>
        <tr><td><strong>Book Price:</strong></td><td>${escapeHtml(bookPrice)} PEN</td></tr>
        <tr><td><strong>Payment Method:</strong></td><td>${escapeHtml(paymentMethod)}</td></tr>
        <tr><td><strong>Delivery Address:</strong></td><td>${escapeHtml(deliveryAddress)}</td></tr>
        <tr><td><strong>Delivery Map:</strong></td><td><a href="${deliveryMapUrl}" target="_blank">${escapeHtml(deliveryMapUrl)}</a></td></tr>
      </table>
      <hr>
      <p><a href="https://vicioperpetuo.com" target="_blank" style="color:#000">vicioperpetuo.com</a></p>
    </div>
  `;

  // HTML template for the email sent to the user to confirm order received
  const userHtmlMail = `
    <div style="border: 1px solid #f0f0f0; border-radius: 10px; padding: 3em; margin: 0 auto;">
      <h2 style="color:#f00;font-weight: bold;">Order Confirmation</h2>
      <p>Dear ${escapeHtml(email)},</p>
      <p>We have received your order for the book <strong>${escapeHtml(bookTitle)}</strong> by ${escapeHtml(bookAuthor)}.</p>
      <p>Your order details are as follows:</p>
      <table style="font-size: 16px; width: 100%;">
        <tr><td><strong>Book Title:</strong></td><td>${escapeHtml(bookTitle)}</td></tr>
        <tr><td><strong>Book Author:</strong></td><td>${escapeHtml(bookAuthor)}</td></tr>
        <tr><td><strong>Book Price:</strong></td><td>${escapeHtml(bookPrice)} PEN</td></tr>
        <tr><td><strong>Email:</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${escapeHtml(phoneForDisplay)}</td></tr>
        <tr><td><strong>TXID:</strong></td><td>${txid ? escapeHtml(txid) : 'Not provided'}</td></tr>
        <tr><td><strong>Payment Method:</strong></td><td>${escapeHtml(paymentMethod)}</td></tr>
        <tr><td><strong>Delivery Address:</strong></td><td>${escapeHtml(deliveryAddress)}</td></tr>
      </table>
      <p>If there are any issues with your order, feel free to contact us at any time.</p>
      <br>
      <p>Thank you for choosing Vicio Perpetuo Vicio Perfecto.</p>
      <p>Best regards,</p>
      <p>Fabo</p>
      <p><a href="https://vicioperpetuo.com" target="_blank" style="color:#000">vicioperpetuo.com</a></p>
    </div>
  `;

  const emailJobs = [
    {
      label: "admin",
      to: ["fabohax@gmail.com", "edicionesvicioperpetuo@gmail.com"],
      subject: `✨ ${email} sent a new order`,
      html: adminHtmlMail,
    },
    {
      label: "solicitante",
      to: email,
      subject: `Order Confirmation - ${bookTitle}`,
      html: userHtmlMail,
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
      "Error sending order emails:",
      failedEmails.map(({ result, job }) => ({
        recipient: job.label,
        to: job.to,
        error: result.reason?.message || String(result.reason),
      }))
    );

    res.status(200).json({
      success: true,
      warning: "Pedido registrado, pero no pudimos enviar todos los correos de confirmacion.",
      failedEmails: failedEmails.map(({ job }) => job.label),
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: `Pedido recibido. Enviamos una confirmacion a ${email} y una notificacion a fabohax@gmail.com.`,
  });
};

export default orderHandler;
