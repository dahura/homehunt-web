import { motion } from "framer-motion"
import { Bot } from "lucide-react"

export function AnimatedLogo() {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      <Bot className="w-6 h-6" />
    </motion.div>
  )
}

