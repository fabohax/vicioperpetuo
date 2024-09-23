import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const orderHandler = async (req, res) => {
  const { email, phone, txid, bookTitle, bookAuthor, bookPrice, paymentMethod, honeypot } = req.body;

  // Honeypot check to detect bots
  if (honeypot) {
    return res.status(400).json({ message: "Bot detected" });
  }

  // Insert the form data into Supabase `vpvp_store`
  try {
    const { data, error } = await supabase
      .from("vpvp_store")
      .insert([{ 
        email, 
        phone, 
        txid, 
        paymentmethod: paymentMethod, 
        booktitle: bookTitle, 
        bookauthor: bookAuthor, 
        bookprice: bookPrice 
      }]);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error inserting into Supabase:", error);
    return res.status(500).json({ success: false, error: "Failed to save to database" });
  }

  // Set up nodemailer
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // HTML template for the email sent to the admin
  const adminHtmlMail = `
    <div style="border: 1px solid #f0f0f0; border-radius: 10px; padding: 3em; margin: 0 auto;">
      <h2 style="color:#f00;font-weight: bold;">Nueva Orden:</h2>
      <table style="font-size: 16px; width: 100%;">
        <tr><td style="width: 50%;"><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
        <tr><td><strong>TXID:</strong></td><td>${txid}</td></tr>
        <tr><td><strong>Book Title:</strong></td><td>${bookTitle}</td></tr>
        <tr><td><strong>Book Author:</strong></td><td>${bookAuthor}</td></tr>
        <tr><td><strong>Book Price:</strong></td><td>${bookPrice} PEN</td></tr>
        <tr><td><strong>Payment Method:</strong></td><td>${paymentMethod}</td></tr>
      </table>
      <hr>
      <p><a href="https://vicioperpetuo.com" target="_blank" style="color:#000">vicioperpetuo.com</a></p>
    </div>
  `;

  // HTML template for the email sent to the user to confirm order received
  const userHtmlMail = `
    <div style="border: 1px solid #f0f0f0; border-radius: 10px; padding: 3em; margin: 0 auto;">
      <h2 style="color:#f00;font-weight: bold;">Order Confirmation</h2>
      <p>Dear ${email},</p>
      <p>We have received your order for the book <strong>${bookTitle}</strong> by ${bookAuthor}.</p>
      <p>Your order details are as follows:</p>
      <table style="font-size: 16px; width: 100%;">
        <tr><td><strong>Book Title:</strong></td><td>${bookTitle}</td></tr>
        <tr><td><strong>Book Author:</strong></td><td>${bookAuthor}</td></tr>
        <tr><td><strong>Book Price:</strong></td><td>${bookPrice} PEN</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
        <tr><td><strong>TXID:</strong></td><td>${txid ? txid : 'Not provided'}</td></tr>
        <tr><td><strong>Payment Method:</strong></td><td>${paymentMethod}</td></tr>
      </table>
      <p>If there are any issues with your order, feel free to contact us at any time.</p>
      <br>
      <p>Thank you for choosing Vicio Perpetuo Vicio Perfecto.</p>
      <p>Best regards,</p>
      <p>Fabo</p>
      <p><a href="https://vicioperpetuo.com" target="_blank" style="color:#000">vicioperpetuo.com</a></p>
    </div>
  `;

  const adminMailOptions = {
    from: "Fabo Hax <fabohax@gmail.com>",
    to: ['fabohax@gmail.com'],
    subject: `✨ ${email} sent a new order`,
    html: adminHtmlMail,
  };

  const userMailOptions = {
    from: "Fabo Hax <fabohax@gmail.com>",
    to: email,
    subject: `Order Confirmation - ${bookTitle}`,
    html: userHtmlMail,
  };

  // Send emails
  try {
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    res.status(200).json({ message: `Order received. A confirmation has been sent to ${email}.` });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
};

export default orderHandler;
