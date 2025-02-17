import { motion } from "framer-motion";

export function TypingAnimation({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 1 }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.05,
        repeat: text.length,
        repeatType: "loop",
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: index * 0.05,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
