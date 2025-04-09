import * as dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendWelcomeEmail = async (userEmail, userName) => {
  // Recupera i dettagli configurabili tramite variabili d'ambiente
  const logoUrl = process.env.APP_LOGO_URL || "https://example.com/logo.png";
  const loginUrl = process.env.APP_LOGIN_URL || "https://example.com/login";

  const mailOptions = {
    from: process.env.SMTP_FROM || '"Your App" <no-reply@example.com>',
    to: userEmail,
    subject: "Bine ai venit!",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <img src="${logoUrl}" alt="Logo" style="width: 120px; margin-bottom: 20px;" />
        <h2>Bine ai venit, ${userName}!</h2>
        <p>Îți mulțumim că te-ai înregistrat. Contul tău a fost creat cu succes.</p>
        <p>Pentru a accesa contul tău, apasă pe butonul de mai jos:</p>
        <a href="${loginUrl}" style="display: inline-block; padding: 12px 25px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #2196F3; text-decoration: none; border-radius: 4px;">Accesează contul</a>
        <p>Dacă nu ai creat acest cont, te rugăm să ignori acest mesaj.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendForgotPasswordEmail = async (userEmail, resetToken) => {
  const logoUrl = process.env.APP_LOGO_URL || "https://example.com/logo.png";
  // Costruisce l'URL per il reset della password usando una variabile d'ambiente (base URL) e il token
  const resetUrl = `${
    process.env.APP_RESET_PASSWORD_URL || "https://example.com/reset-password"
  }/${resetToken}`;

  const mailOptions = {
    from: process.env.SMTP_FROM || '"Your App" <no-reply@example.com>',
    to: userEmail,
    subject: "Resetare parolă",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <img src="${logoUrl}" alt="Logo" style="width: 120px; margin-bottom: 20px;" />
        <h2>Resetare parolă</h2>
        <p>Se pare că ți-ai uitat parola. Nu-ți face griji! Apasă pe butonul de mai jos pentru a reseta parola:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 25px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #f44336; text-decoration: none; border-radius: 4px;">Resetează parola</a>
        <p>Dacă nu ai solicitat resetarea parolei, te rugăm să ignori acest mesaj.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
