"use client"

import type React from "react"

import { useEffect, useState, useCallback, useRef } from "react"

interface ScrollProgressOptions {
  /** Element to track scroll progress for */
  target?: React.RefObject<HTMLElement>
  /** Offset from top when tracking starts (in vh) */
  offset?: number
  /** Duration of scroll tracking (in vh) */
  duration?: number
  /** Throttle scroll events for performance */
  throttle?: number
}

export function useScrollProgress({
  target,
  offset = 0,
  duration = 200,
  throttle = 16, // ~60fps
}: ScrollProgressOptions = {}) {
  const [progress, setProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const rafRef = useRef<number>()
  const lastUpdateRef = useRef<number>(0)

  const updateProgress = useCallback(() => {
    if (!target?.current) return

    const now = performance.now()
    if (now - lastUpdateRef.current < throttle) return
    lastUpdateRef.current = now

    const element = target.current
    const rect = element.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    // Calculate when element enters viewport
    const elementTop = rect.top
    const elementHeight = rect.height

    // Start tracking when element top hits the offset point
    const startPoint = viewportHeight * (offset / 100)
    const trackingDistance = viewportHeight * (duration / 100)

    // Calculate progress (0 to 1)
    const scrollDistance = startPoint - elementTop
    const rawProgress = scrollDistance / trackingDistance
    const clampedProgress = Math.max(0, Math.min(1, rawProgress))

    setProgress(clampedProgress)
    setIsInView(elementTop < viewportHeight && elementTop + elementHeight > 0)
  }, [target, offset, duration, throttle])

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    rafRef.current = requestAnimationFrame(updateProgress)
  }, [updateProgress])

  useEffect(() => {
    updateProgress()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", updateProgress, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateProgress)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleScroll, updateProgress])

  return { progress, isInView }
}
