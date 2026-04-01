const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs text-muted-foreground mb-3">
          Profiles:
          {" "}
          <a href="https://linkedin.com/in/jerold-christoper-g" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">LinkedIn</a>
          {" "}|{" "}
          <a href="https://github.com/JEROLD-creator653" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">GitHub</a>
          {" "}|{" "}
          <a href="https://leetcode.com/u/jerold_0808/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">LeetCode</a>
          {" "}|{" "}
          <a href="https://www.instagram.com/jerold_0808/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">Instagram</a>
        </p>
        <p className="text-sm text-muted-foreground">
          © 2026{" "}
          <span className="gradient-text font-semibold">Jerold Christoper</span>
          .All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
