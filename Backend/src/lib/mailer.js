import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  try {
    console.log("Tentative d'envoi d'email à:", to);
    console.log("Utilisation de l'hôte SMTP:", process.env.SMTP_HOST);
    
    // Configuration du transporteur email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // Utilise SSL pour le port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Vérifier la configuration
    console.log("Configuration SMTP:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER
    });

    // Options de l'email
    const mailOptions = {
      from: `"📘➕InspireRead➕📘" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      text: text,
    };

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email envoyé avec succès:", info.messageId);
    
    return info;
  } catch (error) {
    console.error("❌ Erreur d'envoi d'email:", error);
    throw new Error("Impossible d'envoyer l'email: " + error.message);
  }
};