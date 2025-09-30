"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ReactNode, useRef } from "react"

interface SectionWipeProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  color?: string
  opacity?: number
  speed?: number
  contentDelay?: number
  className?: string
}

export function SectionWipe({
  children,
  direction = "up",
  color = "white",
  opacity = 1,
  speed = 1,
  contentDelay = 0.3,
  className = ""
}: SectionWipeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Calculate wipe position based on direction and speed
  const getTransform = () => {
    const speedMultiplier = 100 * speed

    switch (direction) {
      case "up":
        return useTransform(scrollYProgress, [0, 1], [`${speedMultiplier}%`, `-${speedMultiplier}%`])
      case "down":
        return useTransform(scrollYProgress, [0, 1], [`-${speedMultiplier}%`, `${speedMultiplier}%`])
      case "left":
        return useTransform(scrollYProgress, [0, 1], [`${speedMultiplier}%`, `-${speedMultiplier}%`])
      case "right":
        return useTransform(scrollYProgress, [0, 1], [`-${speedMultiplier}%`, `${speedMultiplier}%`])
    }
  }

  const transform = getTransform()
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  // Get the correct transform property based on direction
  const transformProp = direction === "left" || direction === "right" ? "x" : "y"

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Wipe layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: color,
          opacity,
          [transformProp]: transform
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: contentDelay, duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  )
}