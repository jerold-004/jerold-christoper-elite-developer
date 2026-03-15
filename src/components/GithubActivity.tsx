import { GitHubCalendar } from "react-github-calendar";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import SectionWrapper from "@/components/ui/SectionWrapper";

const GithubActivity = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
        <GitHubCalendar
          username="JEROLD-creator653"
          colorScheme={isDark ? "dark" : "light"}
          blockSize={14}
          blockMargin={4}
          fontSize={14}
          showWeekdayLabels
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
      </div>
    </SectionWrapper>
  );
};

export default GithubActivity;
