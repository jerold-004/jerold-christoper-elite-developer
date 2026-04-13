import { useState, type SVGProps } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, Instagram } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { toast } from "sonner";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const sendEmailEndpoint = apiBaseUrl ? `${apiBaseUrl}/api/send-email` : "/api/send-email";

const LeetCodeLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"
      fill="currentColor"
    />
  </svg>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSending(true);
    try {
      const response = await fetch(sendEmailEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      toast.success("Message sent successfully! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message. Please try again.");
      console.error("Email error:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <SectionWrapper id="contact">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-16 items-start"
      >
        {/* Left */}
        <motion.div variants={staggerItem} className="space-y-8">
          <div>
            <p className="text-sm font-mono text-primary tracking-wider mb-4">GET IN TOUCH</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's build something <span className="gradient-text">amazing</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.
            </p>
          </div>

          <div className="flex gap-4">
            {[
              { icon: Github, href: "https://github.com/JEROLD-creator653", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/jerold-christoper-g", label: "LinkedIn" },
              { icon: LeetCodeLogo, href: "https://leetcode.com/u/jerold_0808/", label: "LeetCode", iconClassName: "text-[#FFA116]" },
              { icon: Instagram, href: "https://www.instagram.com/jerold_0808/", label: "Instagram" },
              { icon: Mail, href: "mailto:jeroldchristoperg@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label, iconClassName }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px hsl(250 85% 65% / 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="p-4 glass rounded-2xl gradient-border hover:bg-card/80 transition-colors"
                aria-label={label}
              >
                <Icon className={`w-5 h-5 ${iconClassName ?? "text-foreground"}`} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={staggerItem}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 gradient-border space-y-6"
        >
          {[
            { name: "name" as const, label: "Name", type: "text", placeholder: "Your name" },
            { name: "email" as const, label: "Email", type: "email", placeholder: "your@email.com" },
          ].map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium text-foreground">{field.label}</label>
              <input
                type={field.type}
                value={form[field.name]}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
            </div>
          ))}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your project..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm resize-none"
            />
          </div>
          <motion.button
            type="submit"
            disabled={sending}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(250 85% 65% / 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
          >
            {sending ? "Sending..." : "Send Message"}
            <Send className="w-4 h-4" />
          </motion.button>
        </motion.form>
      </motion.div>
    </SectionWrapper>
  );
};

export default Contact;
