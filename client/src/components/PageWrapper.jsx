import { motion } from "framer-motion"
export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.38, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}
