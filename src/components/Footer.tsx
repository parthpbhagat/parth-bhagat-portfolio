import { motion } from "framer-motion";

const Footer = () => {
  return <motion.footer 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="py-8 px-6 md:px-12 lg:px-24 border-t border-border"
  >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <p className="text-sm text-muted-foreground">
          Built with passion and code.
        </p>
      </div>
    </motion.footer>;
};
export default Footer;