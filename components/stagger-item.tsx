"use client"

import type React from "react"

import { motion } from "framer-motion"

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.76, 0.27, 0.99],
    },
  },
}

export function StaggerItem({ children, className, delay = 0 }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={itemVariants} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </motion.div>
  )
}
