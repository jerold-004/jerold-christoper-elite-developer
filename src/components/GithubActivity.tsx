import { ActivityCalendar } from "react-activity-calendar";
import { GitHubCalendar } from "react-github-calendar";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import SectionWrapper from "@/components/ui/SectionWrapper";
import "react-activity-calendar/tooltips.css";

const tooltipDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const tooltipText = (date: string, count: number) => {
  const contributionLabel = count === 1 ? "contribution" : "contributions";
  return `${count} ${contributionLabel} on ${tooltipDateFormatter.format(new Date(date))}`;
};

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type GitHubContributionResponse = {
  total: number;
  data: ContributionDay[];
};

const GithubActivity = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<ContributionDay[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchContributions = async () => {
      try {
        const response = await fetch("/api/github-contributions?username=JEROLD-creator653&range=last", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Failed to fetch GitHub contributions");

        const payload = (await response.json()) as GitHubContributionResponse;
        if (!Array.isArray(payload.data) || payload.data.length === 0) {
          throw new Error("Invalid contribution payload");
        }

        setData(payload.data);
        setTotal(payload.total ?? payload.data.reduce((sum, day) => sum + day.count, 0));
      } catch {
        if (!controller.signal.aborted) {
          setUseFallback(true);
        }
      }
    };

    fetchContributions();
    return () => controller.abort();
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <SectionWrapper id="github" className="pt-2 md:pt-4">
      <div className="text-center mb-10">
        <p className="text-xs md:text-sm font-mono text-primary tracking-[0.24em] mb-3">GITHUB CONTRIBUTIONS</p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          GitHub <span className="gradient-text">Activity Calendar</span>
        </h2>
      </div>

      <div className="github-calendar glass rounded-2xl p-8 gradient-border flex justify-center overflow-x-auto">
        {data && !useFallback ? (
          <ActivityCalendar
            data={data}
            colorScheme={isDark ? "dark" : "light"}
            blockSize={14}
            blockMargin={4}
            fontSize={14}
            showWeekdayLabels
            labels={{
              totalCount: `{{count}} contributions in the last year`,
            }}
            tooltips={{
              activity: {
                text: (activity) => tooltipText(activity.date, activity.count),
                withArrow: true,
              },
            }}
            theme={{
              light: [
                "hsl(214, 32%, 94%)",
                "hsl(244, 70%, 82%)",
                "hsl(244, 75%, 70%)",
                "hsl(244, 78%, 62%)",
                "hsl(244, 75%, 55%)",
              ],
              dark: [
                "hsl(220, 20%, 10%)",
                "hsl(250, 60%, 30%)",
                "hsl(250, 70%, 45%)",
                "hsl(250, 80%, 55%)",
                "hsl(250, 85%, 65%)",
              ],
            }}
          />
        ) : (
          <GitHubCalendar
            username="JEROLD-creator653"
            colorScheme={isDark ? "dark" : "light"}
            blockSize={14}
            blockMargin={4}
            fontSize={14}
            showWeekdayLabels
            tooltips={{
              activity: {
                text: (activity) => tooltipText(activity.date, activity.count),
                withArrow: true,
              },
            }}
            theme={{
              light: [
                "hsl(214, 32%, 94%)",
                "hsl(244, 70%, 82%)",
                "hsl(244, 75%, 70%)",
                "hsl(244, 78%, 62%)",
                "hsl(244, 75%, 55%)",
              ],
              dark: [
                "hsl(220, 20%, 10%)",
                "hsl(250, 60%, 30%)",
                "hsl(250, 70%, 45%)",
                "hsl(250, 80%, 55%)",
                "hsl(250, 85%, 65%)",
              ],
            }}
            labels={
              total
                ? { totalCount: `${total} contributions in the last year` }
                : undefined
            }
          />
        )}
      </div>
    </SectionWrapper>
  );
};

export default GithubActivity;
