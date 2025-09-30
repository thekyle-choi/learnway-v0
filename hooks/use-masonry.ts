"use client"

import { useEffect, useRef, useState } from "react"

interface UseMasonryOptions {
  columns: {
    mobile: number
    tablet: number
    desktop: number
    xl: number
  }
  gap: number
}

export function useMasonry(options: UseMasonryOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columnCount, setColumnCount] = useState(options.columns.mobile)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width >= 1280) {
        setColumnCount(options.columns.xl)
      } else if (width >= 1024) {
        setColumnCount(options.columns.desktop)
      } else if (width >= 768) {
        setColumnCount(options.columns.tablet)
      } else {
        setColumnCount(options.columns.mobile)
      }
    }

    updateColumns()
    setIsLoaded(true)

    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [options.columns])

  const masonryStyles = {
    columnCount,
    columnGap: `${options.gap}px`,
    columnFill: "balance" as const,
  }

  return {
    containerRef,
    columnCount,
    isLoaded,
    masonryStyles,
  }
}
