"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const ScrollProgressContext = createContext<{
  scrollY: number
  prefersReducedMotion: boolean
}>({ scrollY: 0, prefersReducedMotion: false })

interface ScrollProgressProviderProps {
  children: React.ReactNode
}

export function ScrollProgressProvider({
  children,
}: ScrollProgressProviderProps) {
  const [scrollY, setScrollY] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const rafRef = useRef<number>()

  const updateScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setScrollY(currentScrollY)
    console.log('ScrollY updated:', currentScrollY)
  }, [])

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    rafRef.current = requestAnimationFrame(updateScroll)
  }, [updateScroll])

  useEffect(() => {
    updateScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", updateScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleScroll, updateScroll])

  const contextValue = {
    scrollY: prefersReducedMotion ? 0 : scrollY,
    prefersReducedMotion,
  }

  return (
    <ScrollProgressContext.Provider value={contextValue}>
      {children}
    </ScrollProgressContext.Provider>
  )
}

export const useScrollProgressContext = () => useContext(ScrollProgressContext)
