import { useEffect } from "react";
import { motion } from "framer-motion";
import Signature from "./Signature";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  useEffect(() => {
    // Wait for the signature animation to finish and show up for a bit (approx 3s)
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="scale-125 md:scale-150">
        <Signature />
      </div>
    </motion.div>
  );
};

export default Preloader;
