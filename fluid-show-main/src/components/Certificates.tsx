import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Award, ExternalLink, BookOpen, X, Download, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import { supabase } from "@/integrations/supabase/client";

// Import certificate images as fallbacks
import hackerrankPython from "@/assets/certificates/hackerrank-python-basic.jpg";
import hackerrankSoftware from "@/assets/certificates/hackerrank-software-engineer.jpg";
import hackerrankSqlBasic from "@/assets/certificates/hackerrank-sql-basic.jpg";
import hackerrankSqlInter from "@/assets/certificates/hackerrank-sql-intermediate.jpg";
import hackerrankSqlAdv from "@/assets/certificates/hackerrank-sql-advanced.jpg";
import hpDataScience from "@/assets/certificates/hp-life-data-science.jpg";
import hpSuccessMindset from "@/assets/certificates/hp-life-success-mindset.jpg";
import simpliDataScience from "@/assets/certificates/simplilearn-data-science.jpg";
import simpliDatabricks from "@/assets/certificates/databricks-ml.jpg";
import simpliPowerBI from "@/assets/certificates/simplilearn-power-bi.jpg";
import simpliExcel from "@/assets/certificates/simplilearn-excel.jpg";
import simpliGenAI from "@/assets/certificates/simplilearn-genai-aws.jpg";
import simpliCrewAI from "@/assets/certificates/simplilearn-crewai.jpg";
import officemasterPowerBI from "@/assets/certificates/officemaster-powerbi.jpg";
import techwar2026 from "@/assets/certificates/techwar-2026.jpg";
import futureforward2026 from "@/assets/certificates/futureforward-2026.jpg";

// Fallback local image map (keyed by certificate name)
const localImageMap: Record<string, string> = {
  "Python (Basic)": hackerrankPython,
  "Software Engineer": hackerrankSoftware,
  "SQL (Basic)": hackerrankSqlBasic,
  "SQL (Intermediate)": hackerrankSqlInter,
  "SQL (Advanced)": hackerrankSqlAdv,
  "Data Science & Analytics": hpDataScience,
  "Success Mindset": hpSuccessMindset,
  "Introduction to Data Science": simpliDataScience,
  "Get Started with Databricks for ML": simpliDatabricks,
  "Power BI for Beginners": simpliPowerBI,
  "Introduction to MS Excel": simpliExcel,
  "Generative AI with AWS": simpliGenAI,
  "Resume Review Agentic System with CrewAI": simpliCrewAI,
  "Power BI Workshop": officemasterPowerBI,
  "TechWar 2026 - Python Analyzers": techwar2026,
  "FutureForward 2026 - Industry Mentors Meet": futureforward2026,
};

interface CertData {
  name: string;
  category: string;
  link: string;
  date: string;
  issuer: string;
  image_url: string;
  skills: string[];
  status: string;
}

const categoryTitles: Record<string, string> = {
  hackerrank: "HackerRank Certificates",
  hp_life: "HP Life Certificates",
  simplilearn: "SimpliLearn Certificates",
  other: "Other Certificates",
};

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [dbCerts, setDbCerts] = useState<CertData[] | null>(null);

  useEffect(() => {
    supabase
      .from("certificates")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setDbCerts(data as unknown as CertData[]);
        }
      });
  }, []);

  // Resolve image: use DB image_url if set, else fallback to local import
  const getImage = (cert: CertData) => cert.image_url || localImageMap[cert.name] || "";

  const nsdcCerts = dbCerts?.filter((c) => c.category === "nsdc") || [];
  const groupedSections = ["hackerrank", "hp_life", "simplilearn", "other"].map((cat, i) => ({
    title: categoryTitles[cat],
    certs: (dbCerts?.filter((c) => c.category === cat) || []),
    delay: 0.3 + i * 0.1,
  })).filter(s => s.certs.length > 0);

  // All images for lightbox navigation
  const allImages = useMemo(() => {
    if (!dbCerts) return Object.values(localImageMap);
    return dbCerts.map(c => getImage(c)).filter(Boolean);
  }, [dbCerts]);

  useEffect(() => {
    if (!previewImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewImage(null);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const idx = allImages.indexOf(previewImage);
        if (idx === -1) return;
        const next = e.key === "ArrowRight"
          ? (idx + 1) % allImages.length
          : (idx - 1 + allImages.length) % allImages.length;
        setPreviewImage(allImages[next]);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [previewImage, allImages]);

  const CertList = ({ certs }: { certs: CertData[] }) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {certs.map((cert, idx) => {
        const img = getImage(cert);
        return (
          <div
            key={idx}
            className="flex items-center justify-between gap-2 p-2.5 sm:p-3 bg-secondary/50 rounded-xl cursor-pointer hover:bg-secondary/80 transition-colors"
            onClick={() => img && setPreviewImage(img)}
          >
            <div>
              <p className="text-sm font-medium">{cert.name}</p>
              <p className="text-xs text-muted-foreground">{cert.issuer ? `${cert.issuer} • ` : ""}{cert.date}</p>
            </div>
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="certificates" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 relative" ref={ref}>
      <AnimatedBackground variant="subtle" />
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-primary font-medium mb-4 block">Certifications</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Skills & <span className="text-gradient">Certificates</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {/* NSDC Certificate */}
          {nsdcCerts.map((cert, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="bg-card border border-border rounded-2xl p-5 sm:p-8 relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-serif font-bold">{cert.name}</h3>
                    {cert.status && <span className="px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-xs font-medium">{cert.status}</span>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-secondary rounded-full text-xs text-secondary-foreground">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {groupedSections.map((section) => (
            <motion.div key={section.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: section.delay }} className="bg-card border border-border rounded-2xl p-5 sm:p-8 relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-bold mb-4">{section.title}</h3>
                  <CertList certs={section.certs} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Preview Lightbox */}
      {previewImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setPreviewImage(null)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <a
              href={previewImage}
              download="certificate"
              className="p-2 bg-primary/20 rounded-full text-white hover:bg-primary/40 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={24} />
            </a>
            <button onClick={() => setPreviewImage(null)} className="p-2 text-white hover:text-primary transition-colors">
              <X size={28} />
            </button>
          </div>

          <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary/20 rounded-full text-white text-sm font-medium z-10">
            {allImages.indexOf(previewImage) + 1} / {allImages.length}
          </div>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-primary/20 rounded-full text-white hover:bg-primary/40 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); const idx = allImages.indexOf(previewImage); if (idx !== -1) setPreviewImage(allImages[(idx - 1 + allImages.length) % allImages.length]); }}
          >
            <ChevronLeft size={28} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-primary/20 rounded-full text-white hover:bg-primary/40 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); const idx = allImages.indexOf(previewImage); if (idx !== -1) setPreviewImage(allImages[(idx + 1) % allImages.length]); }}
          >
            <ChevronRight size={28} />
          </button>

          <motion.img
            key={previewImage}
            src={previewImage}
            alt="Certificate preview"
            className="max-w-full max-h-[85vh] object-contain rounded-lg cursor-grab active:cursor-grabbing"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_e, info) => {
              const threshold = 50;
              const idx = allImages.indexOf(previewImage);
              if (idx === -1) return;
              if (info.offset.x < -threshold) setPreviewImage(allImages[(idx + 1) % allImages.length]);
              else if (info.offset.x > threshold) setPreviewImage(allImages[(idx - 1 + allImages.length) % allImages.length]);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  );
};

export default Certificates;
