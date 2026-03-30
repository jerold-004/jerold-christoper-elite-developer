const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const PUBLIC_GITHUB_CONTRIBUTIONS_API_URL = "https://github-contributions-api.jogruber.de/v4/";

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function resolveDateRange(range) {
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
}

function normalizeData(days) {
  return days.map((day) => ({
    date: day.date,
    count: day.contributionCount,
    level: LEVEL_MAP[day.contributionLevel] ?? 0,
  }));
}

function normalizePublicData(days) {
  return days.map((day) => ({
    date: day.date,
    count: day.count,
    level: day.level,
  }));
}

async function fetchPublicContributions(username, range) {
  const response = await fetch(`${PUBLIC_GITHUB_CONTRIBUTIONS_API_URL}${username}?y=${range}`);
  const payload = await response.json();

  if (!response.ok || payload.error) {
    throw new Error(payload.error || "Failed to fetch public GitHub contributions");
  }

  const data = normalizePublicData(payload.contributions ?? []);
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return {
    username,
    range,
    total,
    data,
    source: "public-fallback",
    exact: false,
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.GITHUB_TOKEN;
  const username = (req.query?.username || process.env.GITHUB_USERNAME || "JEROLD-creator653").trim();
  const range = (req.query?.range || "last").trim();

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
      body: JSON.stringify({
        query,
        variables: { login: username, from, to },
      }),
    });

    const payload = await ghResponse.json();

    if (!ghResponse.ok || payload.errors?.length) {
      const message = payload.errors?.[0]?.message || "Failed to fetch GitHub contributions";
      return res.status(ghResponse.status || 500).json({ error: message });
    }

    const weeks = payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
    const days = weeks.flatMap((week) => week.contributionDays || []);
    const data = normalizeData(days);
    const total = payload.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ??
      data.reduce((sum, item) => sum + item.count, 0);

    return res.status(200).json({
      username,
      range,
      total,
      data,
      source: "github-graphql",
      exact: true,
    });
  } catch (error) {
    try {
      const fallback = await fetchPublicContributions(username, range);
      return res.status(200).json(fallback);
    } catch (fallbackError) {
      return res.status(500).json({
        error: fallbackError instanceof Error ? fallbackError.message : "Internal server error",
      });
    }
  }
}
