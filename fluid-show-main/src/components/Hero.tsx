import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import profilePhoto from "@/assets/profile-photo.png";

const Hero = () => {
  return <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 sm:px-6 md:px-12 lg:px-24 pt-20 md:pt-0">
      {/* Background glow effects with animation */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -right-1/4 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" 
      />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-6 md:gap-16">
        <div className="flex-1">
        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-primary font-medium mb-4 tracking-wide">
          Hello, I'm
        </motion.p>
        
        <motion.h1 initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.1
       }} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-4 sm:mb-6">
          ​Parth <span className="text-gradient"> Bhagat</span>
        </motion.h1>
        
        <motion.p initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mb-6 sm:mb-8">
          Creative developer crafting beautiful digital experiences 
          through thoughtful design and clean code.
        </motion.p>
        
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.3
      }} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a href="#contact" className="bg-primary text-primary-foreground px-6 sm:px-8 py-3 rounded-full font-medium hover:glow-primary transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 text-sm sm:text-base animate-glow-pulse">
              Get in Touch
            </a>
            
            <Link 
              to="/resume"
              className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-medium border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              <Download size={18} />
              Resume
            </Link>
          </div>
          
          <div className="flex gap-3 sm:gap-4">
            <motion.a whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }} href="https://github.com/parthpbhagat" target="_blank" rel="noopener noreferrer" className="p-2.5 sm:p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
              <Github size={18} className="sm:w-5 sm:h-5" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.95 }} href="https://www.linkedin.com/in/parth-p-bhagat-203162369" target="_blank" rel="noopener noreferrer" className="p-2.5 sm:p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
              <Linkedin size={18} className="sm:w-5 sm:h-5" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }} href="mailto:parthpbhagat@gmail.com" className="p-2.5 sm:p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
              <Mail size={18} className="sm:w-5 sm:h-5" />
            </motion.a>
          </div>
        </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
          className="flex-shrink-0"
        >
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl hover:shadow-primary/20 hover:shadow-2xl transition-shadow duration-500"
          >
            <img src={profilePhoto} alt="Parth Bhagat" className="w-full h-full object-cover object-top" />
          </motion.div>
        </motion.div>
      </div>
      
      <motion.a href="#about" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.6,
      delay: 0.8
    }} className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors">
        <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity
      }}>
          <ArrowDown size={24} />
        </motion.div>
      </motion.a>
    </section>;
};
export default Hero;