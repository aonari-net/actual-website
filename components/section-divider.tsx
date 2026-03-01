"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function SectionDivider() {
  const { ref, isVisible } = useScrollAnimation(0.5)

  return (
    <div ref={ref} className="flex items-center justify-center py-4">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={isVisible ? { width: "100px", opacity: 1 } : {}}
        transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
        style={{ maxWidth: "100px" }}
      />
    </div>
  )
}
