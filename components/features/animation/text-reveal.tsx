"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface TextRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
}

export function TextReveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 40
}: TextRevealProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration,
          delay,
          ease: [0.22, 0.76, 0.27, 0.99]
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}