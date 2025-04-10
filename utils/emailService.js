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
  const logoUrl =
    "https://res.cloudinary.com/dombhm6kq/image/upload/v1744197948/agmnailsacademy/logo/fplme9k0usg15ctnzhjd.png";
  const loginUrl = process.env.APP_LOGIN_URL;

  const mailOptions = {
    from:
      process.env.SMTP_FROM ||
      '"AGM Nails Shop & Academy" <no-reply@agmnails.com>',
    to: userEmail,
    subject: "Bine ai venit!",
    html: `
      <div
        style="
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 20px;
          background-color: #1a1a1a;
          color: white;
        "
      >
        <img
          src="https://res.cloudinary.com/dombhm6kq/image/upload/v1744197948/agmnailsacademy/logo/fplme9k0usg15ctnzhjd.png"
          alt="Logo"
          style="width: 70%; margin-bottom: 20px; max-width: 350px"
        />
        <h2>Bine ai venit, ${userName}!</h2>
        <p>
          Îți mulțumim că te-ai înregistrat. Contul tău a fost creat cu succes.
        </p>
        <p>Pentru a accesa contul tău, apasă pe butonul de mai jos:</p>
        <a
          href="${loginUrl}"
          style="
            display: inline-block;
            padding: 12px 25px;
            margin: 20px 0;
            font-size: 16px;
            color: #fff;
            background-color: #dba04d;
            text-decoration: none;
            border-radius: 4px;
          "
          >Accesează contul</a
        >
        <p>Dacă nu ai creat acest cont, te rugăm să ignori acest mesaj.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendForgotPasswordEmail = async (userEmail, resetUrl) => {
  const logoUrl =
    "https://res.cloudinary.com/dombhm6kq/image/upload/v1744197948/agmnailsacademy/logo/fplme9k0usg15ctnzhjd.png";

  const mailOptions = {
    from:
      process.env.SMTP_FROM ||
      '"AGM Nails Shop & Academy" <no-reply@agmnails.com>',
    to: userEmail,
    subject: "Resetare parolă",
    html: `
      <div 
        style="
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 20px;
          background-color: #1a1a1a;
          color: white;
        ">
        <img
          src="https://res.cloudinary.com/dombhm6kq/image/upload/v1744197948/agmnailsacademy/logo/fplme9k0usg15ctnzhjd.png"
          alt="Logo"
          style="width: 70%; margin-bottom: 20px; max-width: 350px"
        />
        <h2>Resetare parolă</h2>
        <p>Se pare că ți-ai uitat parola. Nu-ți face griji! Apasă pe butonul de mai jos pentru a reseta parola:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 25px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #dba04d; text-decoration: none; border-radius: 4px;">Resetează parola</a>
        <p>Dacă nu ai solicitat resetarea parolei, te rugăm să ignori acest mesaj.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
