import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import Counter from "@/components/ui/Counter";
import { ElegantShapeBackground } from "@/components/ui/shape-landing-hero";

const About = () => {
  return (
    <SectionWrapper id="about" className="relative overflow-hidden">
      <ElegantShapeBackground />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Image */}
        <motion.div variants={staggerItem} className="flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden gradient-border">
            <img
              src="/me2.png"
              alt="Jerold Christoper"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div variants={staggerItem} className="space-y-6">
          <p className="text-sm font-mono text-primary tracking-wider">ABOUT ME</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Crafting the future, <span className="gradient-text">one line at a time</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            I'm Jerold Christoper, a Full Stack Developer and AI/ML enthusiast focused on building
            intelligent, scalable software solutions that solve real-world problems. I am currently
            pursuing B.E. in Computer Science Engineering (Artificial Intelligence and Machine Learning)
            at Sri Sairam Engineering College.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I actively explore the intersection of artificial intelligence, backend systems, and modern
            web technologies to create impactful digital products. My work includes a machine
            learning-based UPI fraud detection system, PathFindAR intelligent navigation platform,
            and a production-ready e-commerce application built with scalable architecture.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            My technical focus spans machine learning, backend development, and full-stack application
            design using Python, Java, React, Next.js, Node.js, and modern AI frameworks. Driven by
            curiosity and continuous learning, I aim to contribute to intelligent systems and AI-powered
            platforms that create meaningful real-world impact.
          </p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4 pt-4"
          >
            {[
              { label: "Projects", value: 15, suffix: "+", places: [10, 1] },
              { label: "Contributions", value: 506, places: [100, 10, 1] },
              { label: "Technologies", value: 20, suffix: "+", places: [10, 1] },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl px-6 py-4 text-center">
                <p className="text-2xl font-bold text-primary inline-flex items-center justify-center">
                  <Counter
                    value={stat.value}
                    places={stat.places}
                    fontSize={40}
                    padding={2}
                    gap={2}
                    horizontalPadding={0}
                    fontWeight={700}
                    gradientHeight={0}
                    textColor="hsl(var(--primary))"
                    inViewOnce={false}
                  />
                  {stat.suffix ? <span>{stat.suffix}</span> : null}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};

export default About;
