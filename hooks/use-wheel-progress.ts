"use client"

import { useEffect, useState, useCallback, useRef } from "react"

interface WheelProgressOptions {
  /** Sensitivity of wheel events (higher = more sensitive) */
  sensitivity?: number
  /** Maximum scroll progress (0 to 1) */
  maxProgress?: number
  /** Damping factor for smooth animation */
  damping?: number
  /** Enable inertia after wheel stops */
  inertia?: boolean
}

export function useWheelProgress({
  sensitivity = 0.001,
  maxProgress = 1,
  damping = 0.1,
  inertia = true,
}: WheelProgressOptions = {}) {
  const [progress, setProgress] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const rafRef = useRef<number>()
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const velocityRef = useRef(0)

  // Smooth animation loop
  const animate = useCallback(() => {
    const target = targetProgressRef.current
    const current = currentProgressRef.current
    const vel = velocityRef.current

    // Apply damping to velocity
    velocityRef.current *= 0.95

    // Smooth interpolation towards target
    const diff = target - current
    const newProgress = current + diff * damping + vel * 0.1

    currentProgressRef.current = newProgress
    setProgress(newProgress)
    setVelocity(velocityRef.current)

    // Continue animation if there's movement
    if (Math.abs(diff) > 0.001 || Math.abs(velocityRef.current) > 0.001) {
      rafRef.current = requestAnimationFrame(animate)
    }
  }, [damping])

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault()

      // Calculate delta with sensitivity
      const delta = event.deltaY * sensitivity

      // Update target progress
      const newTarget = Math.max(0, Math.min(maxProgress, targetProgressRef.current + delta))
      targetProgressRef.current = newTarget

      // Add to velocity for inertia
      if (inertia) {
        velocityRef.current += delta * 0.5
      }

      // Start animation if not already running
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate)
      }
    },
    [sensitivity, maxProgress, inertia, animate],
  )

  useEffect(() => {
    // Add wheel event listener to document
    document.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      document.removeEventListener("wheel", handleWheel)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleWheel])

  return { progress, velocity }
}
