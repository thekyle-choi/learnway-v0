"use client"

import type React from "react"

import { motion } from "framer-motion"

interface StaggerContainerProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

export function StaggerContainer({ children, delay = 0, className }: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </motion.div>
  )
}
