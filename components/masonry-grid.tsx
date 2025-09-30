"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface MasonryGridProps {
  children: React.ReactNode
  columns?: {
    mobile: number
    tablet: number
    desktop: number
    xl: number
  }
  gap?: number
}

export function MasonryGrid({
  children,
  columns = { mobile: 2, tablet: 3, desktop: 4, xl: 5 },
  gap = 24,
}: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columnCount, setColumnCount] = useState(columns.mobile)

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width >= 1280) {
        setColumnCount(columns.xl)
      } else if (width >= 1024) {
        setColumnCount(columns.desktop)
      } else if (width >= 768) {
        setColumnCount(columns.tablet)
      } else {
        setColumnCount(columns.mobile)
      }
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [columns])

  return (
    <div
      ref={containerRef}
      className="masonry-grid"
      style={{
        columnCount,
        columnGap: `${gap}px`,
        columnFill: "balance",
      }}
    >
      {children}
    </div>
  )
}
