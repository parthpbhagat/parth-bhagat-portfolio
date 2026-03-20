import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import { supabase } from "@/integrations/supabase/client";

interface AboutData {
  title: string;
  title_highlight: string;
  paragraph1: string;
  paragraph2: string;
  skills: string[];
}

const fallback: AboutData = {
  title: "Turning ideas into",
  title_highlight: "reality",
  paragraph1: "I'm Parth Bhagat, a passionate Data Analyst with a keen eye for creating seamless digital experiences. With expertise in modern web technologies, I bring creative visions to life through clean, efficient code.",
  paragraph2: "When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or enjoying a good cup of coffee.",
  skills: ["Python", "SQL", "Advance Excel", "Power BI", "Tailwind"],
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [data, setData] = useState<AboutData>(fallback);

  useEffect(() => {
    supabase.from("about_info").select("*").limit(1).single().then(({ data: row }) => {
      if (row) setData(row as AboutData);
    });
  }, []);

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 relative" ref={ref}>
      <AnimatedBackground variant="subtle" />
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-primary font-medium mb-4 block">
            About Me
          </motion.span>

          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl md:text-4xl font-serif font-bold mb-6">
            {data.title} <span className="text-gradient">{data.title_highlight}</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-muted-foreground mb-6 leading-relaxed">
            {data.paragraph1}
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="text-muted-foreground mb-8 leading-relaxed">
            {data.paragraph2}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-secondary rounded-full text-sm text-secondary-foreground cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
