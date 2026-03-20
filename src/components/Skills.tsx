import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, Database, FileSpreadsheet, Code2, BrainCircuit } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

const skills = [
  {
    icon: BarChart3,
    title: "Power BI",
    description: "Interactive dashboards, DAX calculations, data modeling, and compelling data visualizations."
  },
  {
    icon: FileSpreadsheet,
    title: "Advanced Excel",
    description: "Pivot tables, VLOOKUP, complex formulas, data cleaning, and dashboard creation for business insights."
  },
  {
    icon: Code2,
    title: "Python",
    description: "Data analysis with Pandas, NumPy, visualization with Matplotlib & Seaborn, and automation scripts."
  },
  {
    icon: Database,
    title: "SQL",
    description: "Complex queries, joins, subqueries, window functions, and database management for data extraction."
  },
  {
    icon: BrainCircuit,
    title: "Machine Learning",
    description: "Supervised & unsupervised learning, model building, feature engineering, and predictive analytics."
  },
];
const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="skills" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-secondary/30 relative" ref={ref}>
      <AnimatedBackground variant="grid" />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-primary font-medium mb-4 block">What I Do</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            My <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px hsl(38 92% 50% / 0.1)" }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors duration-300"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
              >
                <skill.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-serif font-semibold text-lg mb-2 text-foreground">{skill.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>;
};
export default Skills;