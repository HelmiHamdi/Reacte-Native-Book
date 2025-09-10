import dotenv from "dotenv";
import { sendEmail } from "./lib/mailer.js";
import path from "path";
import { fileURLToPath } from "url";

// Obtenir le répertoire actuel (équivalent de __dirname en ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement depuis le dossier parent
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function testEmail() {
  try {
    console.log("🧪 Test d'envoi d'email...");
    console.log("Compte utilisé:", process.env.SMTP_USER);
    
    // Vérifier que les variables sont bien chargées
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("❌ Variables d'environnement manquantes");
      console.log("SMTP_USER:", process.env.SMTP_USER ? "Défini" : "Indéfini");
      console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Défini" : "Indéfini");
      return;
    }
    
    await sendEmail({
      to: process.env.SMTP_USER, // Envoyer à vous-même pour tester
      subject: "Test d'email depuis InspireRead",
      text: "Félicitations ! Votre configuration email fonctionne correctement.\n\nSi vous recevez cet email, cela signifie que votre application peut maintenant envoyer des emails pour la réinitialisation de mots de passe.",
    });
    
    console.log("✅ Email de test envoyé avec succès!");
  } catch (error) {
    console.error("❌ Échec de l'envoi de l'email:", error.message);
  }
}

testEmail();