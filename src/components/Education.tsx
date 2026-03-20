import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });

  const education = [
    {
      degree: "Degree Certificate",
      institution: "",
      year: "2018",
      description: "Completed undergraduate degree program."
    },
    {
      degree: "12th Standard (ARTS)",
      institution: "",
      year: "2015",
      description: "Result: 53.54%"
    },
    {
      degree: "10th Standard",
      institution: "",
      year: "2013",
      description: "Result: 55.60%"
    }
  ];

  return (
    <section id="education" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-secondary/30 relative" ref={ref}>
      <AnimatedBackground variant="accent" />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Education</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Academic <span className="text-gradient">Background</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="bg-card border border-border rounded-2xl p-5 sm:p-8 relative overflow-hidden group hover:border-primary/50 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-bold mb-2">{edu.degree}</h3>
                  <p className="text-primary font-medium mb-2">{edu.institution}</p>
                  <p className="text-muted-foreground text-sm mb-3">{edu.description}</p>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Graduated {edu.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
