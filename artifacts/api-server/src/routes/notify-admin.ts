import { Router } from "express";
import { Resend } from "resend";
import { logger } from "../lib/logger";

const router = Router();

router.post("/notify-admin", async (req, res) => {
  const { firstName, lastName, email, phone, accountType, createdAt } = req.body;

  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
    req.log.warn("RESEND_API_KEY or ADMIN_EMAIL not configured — skipping email");
    res.json({ success: true, skipped: true });
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const accountTypeLabel =
      accountType === "personnel"
        ? "Compte Personnel"
        : accountType === "courant"
          ? "Compte Courant"
          : "Compte Premium";

    const createdAtFormatted = new Date(createdAt).toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
    });

    await resend.emails.send({
      from: "NELLOA BANK <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: "🏦 Nouvelle inscription NELLOA BANK",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1E3A8A; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">NELLOA BANK</h1>
            <p style="color: #93C5FD; margin: 8px 0 0 0;">Nouvelle inscription</p>
          </div>
          <div style="padding: 24px; background: #F8FAFC; border: 1px solid #E2E8F0;">
            <h2 style="color: #1E3A8A; margin-top: 0;">Détails du nouvel inscrit</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748B; width: 40%;">Prénom</td>
                <td style="padding: 8px 0; color: #1E293B; font-weight: 600;">${firstName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B;">Nom</td>
                <td style="padding: 8px 0; color: #1E293B; font-weight: 600;">${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B;">Email</td>
                <td style="padding: 8px 0; color: #1E293B; font-weight: 600;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B;">Téléphone</td>
                <td style="padding: 8px 0; color: #1E293B; font-weight: 600;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B;">Type de compte</td>
                <td style="padding: 8px 0; color: #1E293B; font-weight: 600;">${accountTypeLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B;">Date d'inscription</td>
                <td style="padding: 8px 0; color: #1E293B; font-weight: 600;">${createdAtFormatted}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #EFF6FF; border-radius: 8px; border-left: 4px solid #3B82F6;">
              <p style="margin: 0; color: #1E3A8A;">Connectez-vous au panel admin pour gérer ce compte.</p>
            </div>
          </div>
          <div style="padding: 16px; text-align: center; color: #64748B; font-size: 12px;">
            © 2025 NELLOA BANK — Email automatique
          </div>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to send admin notification email");
    res.status(500).json({ error: "Échec de l'envoi de l'email" });
  }
});

export default router;
