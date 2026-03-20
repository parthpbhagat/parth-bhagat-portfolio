import { motion, Variants } from "framer-motion";

const Signature = () => {
  const name = "Parth Bhagat";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Faster stagger for handwriting feel
        delayChildren: 1.0,   // Wait a bit before starting
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, x: -10, y: 10, rotate: -5 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    },
  };

  return (
    <div className="flex justify-start items-center my-4 sm:my-6 overflow-visible py-12 md:py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-7xl sm:text-8xl md:text-9xl text-gradient font-bold drop-shadow-md leading-[1.3] py-4"
        style={{
          fontFamily: "'Great Vibes', cursive",
          paddingRight: "100px", // prevent clipping of italic letters
        }}
      >
        {name.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block"
            style={{
              whiteSpace: char === " " ? "pre" : "normal",
              marginRight: char === " " ? "0.5rem" : "-0.05rem" // subtle overlap
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default Signature;
