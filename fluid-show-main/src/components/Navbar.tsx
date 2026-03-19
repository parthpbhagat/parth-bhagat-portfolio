import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [{
  label: "About",
  href: "#about"
}, {
  label: "Projects",
  href: "#projects"
}, {
  label: "Skills",
  href: "#skills"
}, {
  label: "Contact",
  href: "#contact"
}];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map(link => link.href.replace("#", ""));
    
    const observerOptions = {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return <motion.nav initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6
  }} className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 lg:px-24 py-4 sm:py-6 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-3 sm:py-4" : ""}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-center">

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => <a 
            key={link.label} 
            href={link.href} 
            className={cn(
              "text-sm transition-colors relative",
              activeSection === link.href.replace("#", "")
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {link.label}
            {activeSection === link.href.replace("#", "") && (
              <motion.span
                layoutId="activeSection"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </a>)}
          <a href="#contact" className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:glow-primary transition-all duration-300">
            Hire Me
          </a>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && <motion.div initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map(link => <a 
              key={link.label} 
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className={cn(
                "text-lg transition-colors py-2",
                activeSection === link.href.replace("#", "")
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </a>)}
            <a href="#contact" onClick={() => setIsOpen(false)} className="bg-primary text-primary-foreground px-5 py-3 rounded-full text-sm font-medium text-center mt-2">
              Hire Me
            </a>
          </div>
        </motion.div>}
    </motion.nav>;
};
export default Navbar;