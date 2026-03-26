import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL || "contact@jerold-dev.me";
const toEmail = process.env.RESEND_TO_EMAIL || "jeroldchristoperg@gmail.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Portfolio Inquiry | ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #f3f4f6; padding: 20px; border-radius: 12px; color: #111827;">
          <div style="background: #111827; color: #f9fafb; border-radius: 10px; padding: 16px 18px; margin-bottom: 14px;">
            <h2 style="margin: 0; font-size: 22px; line-height: 1.3;">New Portfolio Inquiry</h2>
            <p style="margin: 8px 0 0; font-size: 13px; color: #d1d5db;">A new message was submitted through your contact form.</p>
          </div>
          <div style="background: #ffffff; padding: 16px; border-radius: 10px; margin-bottom: 14px; border: 1px solid #e5e7eb;">
            <p style="margin: 0 0 12px; font-size: 15px;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0; font-size: 15px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
          </div>
          <div style="background: #ffffff; padding: 16px; border-radius: 10px; border: 1px solid #e5e7eb;">
            <h3 style="margin: 0 0 10px; font-size: 17px; color: #111827;">Message</h3>
            <p style="margin: 0; font-size: 15px; color: #374151; white-space: pre-wrap; line-height: 1.65;">${message}</p>
          </div>
          <p style="margin: 14px 4px 0; font-size: 12px; color: #6b7280;">Sent via your portfolio contact form.</p>
        </div>
      `,
    });

    if (result.error) {
      const raw = result.error.message || "Failed to send email";
      const isSandboxRestriction = /only send testing emails|verify a domain/i.test(raw);
      const isDomainNotVerified = /domain is not verified/i.test(raw);

      return res.status(400).json({
        error: isSandboxRestriction
          ? "Resend account is in test mode. Email is limited to your verified inbox until domain verification is complete."
          : isDomainNotVerified
            ? "Your custom sender domain is not verified in Resend yet. Use onboarding@resend.dev for testing or complete DNS verification."
            : raw,
      });
    }

    return res.status(200).json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
  }
}
