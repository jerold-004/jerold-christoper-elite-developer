import express from "express";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const fromEmail = process.env.RESEND_FROM_EMAIL || "contact@jerold-dev.me";
const toEmail = process.env.RESEND_TO_EMAIL || "jeroldchristoperg@gmail.com";

app.use(cors());
app.use(express.json());

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const PUBLIC_GITHUB_CONTRIBUTIONS_API_URL = "https://github-contributions-api.jogruber.de/v4/";
const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const resolveDateRange = (range) => {
  const now = new Date();
  const to = now.toISOString();

  if (range === "last") {
    const fromDate = new Date(now);
    fromDate.setDate(fromDate.getDate() - 365);
    return { from: fromDate.toISOString(), to };
  }

  const year = Number(range);
  if (Number.isFinite(year) && year >= 2008 && year <= 2100) {
    const from = new Date(Date.UTC(year, 0, 1, 0, 0, 0)).toISOString();
    const toYear = new Date(Date.UTC(year, 11, 31, 23, 59, 59)).toISOString();
    return { from, to: toYear };
  }

  const fallback = new Date(now);
  fallback.setDate(fallback.getDate() - 365);
  return { from: fallback.toISOString(), to };
};

const normalizeContributionData = (days) =>
  days.map((day) => ({
    date: day.date,
    count: day.contributionCount,
    level: LEVEL_MAP[day.contributionLevel] ?? 0,
  }));

const normalizePublicContributionData = (days) =>
  days.map((day) => ({
    date: day.date,
    count: day.count,
    level: day.level,
  }));

const fetchPublicContributions = async (username, range) => {
  const response = await fetch(`${PUBLIC_GITHUB_CONTRIBUTIONS_API_URL}${username}?y=${range}`);
  const payload = await response.json();

  if (!response.ok || payload.error) {
    throw new Error(payload.error || "Failed to fetch public GitHub contributions");
  }

  const data = normalizePublicContributionData(payload.contributions ?? []);
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return { username, range, total, data, source: "public-fallback", exact: false };
};

app.post("/api/send-email", async (req, res) => {
  if (!resend) {
    return res.status(500).json({
      error: "Email API is not configured. Set RESEND_API_KEY in environment.",
    });
  }

  const { name, email, message } = req.body;

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

    res.json({ success: true, id: result.data.id });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/github-contributions", async (req, res) => {
  const token = process.env.GITHUB_TOKEN;
  const username = (req.query.username || process.env.GITHUB_USERNAME || "JEROLD-creator653").trim();
  const range = (req.query.range || "last").trim();

  if (!token) {
    try {
      const fallback = await fetchPublicContributions(username, range);
      return res.status(200).json(fallback);
    } catch (error) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to fetch contributions",
      });
    }
  }

  const { from, to } = resolveDateRange(range);

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const ghResponse = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables: { login: username, from, to } }),
    });

    const payload = await ghResponse.json();
    if (!ghResponse.ok || payload.errors?.length) {
      const message = payload.errors?.[0]?.message || "Failed to fetch GitHub contributions";
      return res.status(ghResponse.status || 500).json({ error: message });
    }

    const weeks = payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
    const days = weeks.flatMap((week) => week.contributionDays || []);
    const data = normalizeContributionData(days);
    const total = payload.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ??
      data.reduce((sum, item) => sum + item.count, 0);

    return res.status(200).json({ username, range, total, data, source: "github-graphql", exact: true });
  } catch (error) {
    try {
      const fallback = await fetchPublicContributions(username, range);
      return res.status(200).json(fallback);
    } catch (fallbackError) {
      console.error("Error fetching GitHub contributions:", fallbackError);
      return res.status(500).json({
        error: fallbackError instanceof Error ? fallbackError.message : "Internal server error",
      });
    }
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✉️  Email server running on http://localhost:${PORT}`);
});
