import { GitHubCalendar } from "react-github-calendar";
import SectionWrapper from "@/components/ui/SectionWrapper";

const GithubActivity = () => {
  return (
    <SectionWrapper id="github">
      <div className="text-center mb-12">
        <p className="text-sm font-mono text-primary tracking-wider mb-4">OPEN SOURCE</p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Coding <span className="gradient-text">Activity</span>
        </h2>
      </div>

      <div className="glass rounded-2xl p-8 gradient-border flex justify-center overflow-x-auto">
        <GitHubCalendar
          username="JEROLD-creator653"
          colorScheme="dark"
          blockSize={14}
          blockMargin={4}
          fontSize={14}
          theme={{
            dark: ["hsl(220, 20%, 10%)", "hsl(250, 60%, 30%)", "hsl(250, 70%, 45%)", "hsl(250, 80%, 55%)", "hsl(250, 85%, 65%)"],
          }}
        />
      </div>
    </SectionWrapper>
  );
};

export default GithubActivity;
