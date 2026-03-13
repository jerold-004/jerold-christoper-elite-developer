import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp } from "@/lib/animations";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const SectionWrapper = ({ children, id, className = "" }: SectionWrapperProps) => {
  return (
    <motion.section
      id={id}
      className={`relative py-24 px-6 md:px-12 lg:px-20 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </motion.section>
  );
};

export default SectionWrapper;
