import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, ChevronLeft, ChevronRight, X, BarChart3 } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import { supabase } from "@/integrations/supabase/client";

// Fallback imports for when DB is empty
import adventureworksDashboard1 from "@/assets/projects/adventureworks-dashboard-1.png";
import adventureworksDashboard2 from "@/assets/projects/adventureworks-dashboard-2.png";
import adventureworksDashboard3 from "@/assets/projects/adventureworks-dashboard-3.png";
import adventureworksDashboard4 from "@/assets/projects/adventureworks-dashboard-4.png";
import coffeeShopSales from "@/assets/projects/coffee-shop-sales.png";
import pizzaDashboard1 from "@/assets/projects/pizza-sales-dashboard-1.png";
import pizzaDashboard2 from "@/assets/projects/pizza-sales-dashboard-2.png";
import trafficAccidentDashboard from "@/assets/projects/traffic-accident-dashboard.png";
import trafficAccidentCar from "@/assets/projects/traffic-accident-car.jpg";
import iplDashboard1 from "@/assets/projects/ipl-dashboard-1.png";
import iplDashboard2 from "@/assets/projects/ipl-dashboard-2.png";
import iplDashboard3 from "@/assets/projects/ipl-dashboard-3.png";
import iplDashboard4 from "@/assets/projects/ipl-dashboard-4.png";
import iplDashboard5 from "@/assets/projects/ipl-dashboard-5.png";

interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  color: string;
  github: string;
  featured: boolean;
  highlights: string[];
  images: string[];
}

const fallbackProjects: ProjectData[] = [
  {
    title: "AdventureWorks Sales Dashboard",
    description: "Comprehensive Power BI dashboard analyzing $24.9M revenue, 25.2K orders, and 2.2% return rate.",
    tags: ["Power BI", "DAX", "Data Modeling", "Data Visualization"],
    color: "from-blue-500/20 to-cyan-600/20",
    github: "https://github.com/parthpbhagat",
    featured: true,
    images: [adventureworksDashboard1, adventureworksDashboard2, adventureworksDashboard3, adventureworksDashboard4],
    highlights: ["$24.9M Revenue Analysis", "25.2K Orders Tracked", "Customer Segmentation", "Key Influencer Analysis"]
  },
  {
    title: "Hotel Booking Analysis",
    description: "Data analysis project exploring hotel booking patterns, cancellation rates, and customer behavior insights.",
    tags: ["Python", "SQL", "Excel", "HTML", "CSS"],
    color: "from-amber-500/20 to-orange-600/20",
    github: "https://github.com/parthpbhagat/hotel_booking_analysis",
    featured: false, images: [], highlights: []
  },
  {
    title: "Motor Rewinding Data Entry",
    description: "Web-based data entry system for motor rewinding business operations and record management.",
    tags: ["HTML", "CSS", "SQL"],
    color: "from-emerald-500/20 to-teal-600/20",
    github: "https://github.com/parthpbhagat/hotel_booking_analysis",
    featured: false, images: [], highlights: []
  },
  {
    title: "Coffee Shop Sales Data",
    description: "Comprehensive Excel dashboard analyzing coffee shop sales across multiple cities.",
    tags: ["Excel", "Data Analysis", "Data Visualization", "Dashboard"],
    color: "from-amber-600/20 to-yellow-600/20",
    github: "https://github.com/parthpbhagat/excel",
    featured: true,
    images: [coffeeShopSales],
    highlights: ["Multi-City Analysis", "Category Revenue Tracking", "Monthly Trend Analysis", "Interactive Filters"]
  },
  {
    title: "Pizza Sales Analysis Dashboard",
    description: "Power BI dashboard analyzing pizza sales with $817.86K revenue, 50K total quantity, and 21.35K orders.",
    tags: ["Power BI", "DAX", "Data Modeling", "Data Visualization"],
    color: "from-red-500/20 to-orange-600/20",
    github: "https://github.com/parthpbhagat/pizza_sale_analysis_dashboard",
    featured: true,
    images: [pizzaDashboard1, pizzaDashboard2],
    highlights: ["$817.86K Revenue", "50K Quantity Sold", "Category Analysis", "Hourly Trend Insights"]
  },
  {
    title: "Traffic Accident Analysis – India",
    description: "Power BI dashboard analyzing 541K traffic cases, 212K deaths, and 483K injuries across Indian states & UTs.",
    tags: ["Power BI", "Data Analysis", "Data Visualization", "Dashboard"],
    color: "from-indigo-500/20 to-blue-600/20",
    github: "https://github.com/parthpbhagat/Traffic-Accident-Analysis-India",
    featured: true,
    images: [trafficAccidentDashboard, trafficAccidentCar],
    highlights: ["541K Traffic Cases", "212K Total Deaths", "State-wise Analysis", "Accident Type Distribution"]
  },
  {
    title: "Tata IPL Data Analytics Dashboard",
    description: "Interactive Power BI dashboard analyzing IPL match data (2008-2024) with 374K+ total runs, team performance, batting stats, player dossiers, and toss analysis.",
    tags: ["Power BI", "DAX", "Data Modeling", "Data Visualization"],
    color: "from-blue-600/20 to-indigo-600/20",
    github: "https://github.com/parthpbhagat/tata-ipl-analysis",
    featured: true,
    images: [iplDashboard1, iplDashboard2, iplDashboard3, iplDashboard4, iplDashboard5],
    highlights: ["374K+ Total Runs", "Team Performance Analysis", "Player Dossier", "Batting & Bowling Stats"]
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectImages, setCurrentProjectImages] = useState<string[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>(fallbackProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error || !data || data.length === 0) return; // Use fallback

      const projectsWithImages = await Promise.all(
        data.map(async (p: any) => {
          const { data: images } = await supabase
            .from("project_images")
            .select("image_url")
            .eq("project_id", p.id)
            .order("sort_order", { ascending: true });
          return {
            title: p.title,
            description: p.description,
            tags: p.tags || [],
            color: p.color,
            github: p.github,
            featured: p.featured,
            highlights: p.highlights || [],
            images: (images || []).map((img: any) => img.image_url),
          };
        })
      );
      setProjects(projectsWithImages);
    };

    fetchProjects();
  }, []);

  const openLightbox = (images: string[], index: number) => {
    setCurrentProjectImages(images);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % currentProjectImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + currentProjectImages.length) % currentProjectImages.length);

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 relative" ref={ref}>
      <AnimatedBackground variant="default" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">My Work</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.map((project) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="mb-12 group relative bg-card border-2 border-primary/30 rounded-2xl overflow-hidden hover:border-primary/60 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-medium">
              <BarChart3 size={14} />
              Featured Power BI Project
            </div>

            {project.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-3 sm:p-4 pt-14">
                {project.images.map((img, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    onClick={() => openLightbox(project.images, imgIndex)}
                  >
                    <img
                      src={img}
                      alt={`${project.title} Dashboard ${imgIndex + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="p-4 sm:p-6 pt-2">
              <div className="flex items-start justify-between mb-4 gap-3">
                <h3 className="text-xl sm:text-2xl font-serif font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
              </div>

              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>

              {project.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs text-primary font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-secondary rounded-full text-xs text-secondary-foreground">{tag}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {otherProjects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className={`aspect-[16/10] bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,hsl(var(--background))_100%)]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-foreground/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-foreground/5 rounded-full group-hover:scale-125 transition-transform duration-700 delay-100" />
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <h3 className="text-lg sm:text-xl font-serif font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-secondary rounded-full text-xs text-secondary-foreground">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-primary transition-colors">
            <X size={32} />
          </button>
          <button onClick={prevImage} className="absolute left-4 text-white hover:text-primary transition-colors">
            <ChevronLeft size={48} />
          </button>
          <img
            src={currentProjectImages[currentImageIndex]}
            alt="Dashboard preview"
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
          <button onClick={nextImage} className="absolute right-4 text-white hover:text-primary transition-colors">
            <ChevronRight size={48} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentImageIndex + 1} / {currentProjectImages.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
