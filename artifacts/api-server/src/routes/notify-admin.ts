import { Router } from "express";
import { Resend } from "resend";
import { logger } from "../lib/logger";

const router = Router();

router.post("/notify-admin", async (req, res) => {
  const {
    firstName, lastName, email, phone, accountType, createdAt,
    birthDate, nationality, idNumber,
    address, postalBox, city, postalCode, country,
  } = req.body;

  const accountTypeLabel: Record<string, string> = {
    personnel: "Compte Personnel",
    courant: "Compte Courant",
    premium: "Compte Premium",
    epargne: "Compte Épargne",
  };

  const label = accountTypeLabel[accountType] ?? accountType;
  const createdAtFormatted = new Date(createdAt).toLocaleString("fr-FR", { timeZone: "Europe/Paris" });

  // Always log — visible even without Resend configured
  logger.info(
    {
      firstName, lastName, email, phone,
      accountType: label, createdAt: createdAtFormatted,
      birthDate, nationality, idNumber,
      address, postalBox, city, postalCode, country,
    },
    "🏦 Nouvelle inscription NELLOA BANK"
  );

  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
    req.log.warn("RESEND_API_KEY ou ADMIN_EMAIL non configuré — email ignoré");
    res.json({ success: true, skipped: true });
    return;
  }

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 12px;color:#64748B;background:#F8FAFC;font-size:13px;width:40%;border-bottom:1px solid #E2E8F0;">${label}</td>
      <td style="padding:8px 12px;color:#1E293B;font-weight:600;font-size:13px;border-bottom:1px solid #E2E8F0;">${value || '—'}</td>
    </tr>`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;">
      <div style="background:#1E3A8A;padding:28px 24px;text-align:center;">
        <h1 style="color:white;margin:0;font-size:22px;letter-spacing:1px;">NELLOA BANK</h1>
        <p style="color:#93C5FD;margin:6px 0 0;font-size:14px;">Nouvelle inscription client</p>
      </div>

      <div style="padding:24px;background:#ffffff;">
        <h2 style="color:#1E3A8A;margin:0 0 16px;font-size:16px;">Identité</h2>
        <table style="width:100%;border-collapse:collapse;border:1px solid #E2E8F0;border-radius:8px;overflow:hidden;">
          ${row('Prénom', firstName)}
          ${row('Nom', lastName)}
          ${row('Date de naissance', birthDate)}
          ${row('Nationalité', nationality)}
          ${row('N° pièce d\'identité', idNumber)}
        </table>

        <h2 style="color:#1E3A8A;margin:20px 0 16px;font-size:16px;">Contact</h2>
        <table style="width:100%;border-collapse:collapse;border:1px solid #E2E8F0;border-radius:8px;overflow:hidden;">
          ${row('Email', email)}
          ${row('Téléphone', phone)}
        </table>

        <h2 style="color:#1E3A8A;margin:20px 0 16px;font-size:16px;">Adresse postale</h2>
        <table style="width:100%;border-collapse:collapse;border:1px solid #E2E8F0;border-radius:8px;overflow:hidden;">
          ${row('Rue / N°', address)}
          ${row('Boîte postale', postalBox ?? '—')}
          ${row('Ville', city)}
          ${row('Code postal', postalCode)}
          ${row('Pays', country)}
        </table>

        <h2 style="color:#1E3A8A;margin:20px 0 16px;font-size:16px;">Compte</h2>
        <table style="width:100%;border-collapse:collapse;border:1px solid #E2E8F0;border-radius:8px;overflow:hidden;">
          ${row('Type de compte', label)}
          ${row('Date d\'inscription', createdAtFormatted)}
        </table>

        <div style="margin-top:24px;padding:16px;background:#EFF6FF;border-radius:8px;border-left:4px solid #3B82F6;">
          <p style="margin:0;color:#1E3A8A;font-size:13px;">Connectez-vous au panel admin pour approuver ou rejeter ce compte.</p>
        </div>
      </div>

      <div style="padding:14px;text-align:center;color:#94A3B8;font-size:11px;background:#F8FAFC;">
        © 2025 NELLOA BANK — Email automatique de notification
      </div>
    </div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "NELLOA BANK <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `🏦 Nouvelle inscription — ${firstName} ${lastName} (${label})`,
      html,
    });
    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Échec envoi email admin");
    res.status(500).json({ error: "Échec de l'envoi de l'email" });
  }
});

export default router;
