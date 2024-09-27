// /pages/api/apply.js
import nodemailer from 'nodemailer';
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { name, lastname, email, phone, adminMails } = req.body;

  if (!name || !lastname || !email || !phone) {
    return res.status(400).json({ message: 'Faltan datos necesarios para la postulación.' });
  }

  try {
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('vpvp_postus')
      .insert([{ name, lastname, email, phone }]);

    if (error) {
      throw new Error(`Error al insertar los datos en Supabase: ${error.message}`);
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: [email, ...adminMails],
      subject: 'Postulación Recibida',
      text: `Hola ${name}, hemos recibido tu postulación.\n Detalles:\nNombre: ${name} ${lastname}\nCorreo: ${email}\nTeléfono: ${phone}.\n-\nEstaremos en contacto contigo. Gracias. \n --- \nvicioperpetuo.com`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Correo enviado y datos insertados exitosamente.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'Error interno del servidor.' });
  }
}
