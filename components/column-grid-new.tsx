"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

const projects = [
  { id: 1, src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80", title: "Design Work 1" },
  { id: 2, src: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?w=600&q=80", title: "Design Work 2" },
  { id: 3, src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80", title: "Design Work 3" },
  { id: 4, src: "https://images.unsplash.com/photo-1558403194-611308249627?w=600&q=80", title: "Design Work 4" },
  { id: 5, src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&q=80", title: "Design Work 5" },
  { id: 6, src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80", title: "Design Work 6" },
  { id: 7, src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", title: "Design Work 7" },
  { id: 8, src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", title: "Design Work 8" },
  { id: 9, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", title: "Design Work 9" },
  { id: 10, src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80", title: "Design Work 10" },
  { id: 11, src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80", title: "Design Work 11" },
  { id: 12, src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&q=80", title: "Design Work 12" },
]

export function ColumnGrid() {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Distribute projects into 4 columns
  const columns = [[], [], [], []] as typeof projects[]
  projects.forEach((project, index) => {
    columns[index % 4].push(project)
  })

  // Repeat projects to create infinite effect
  const repeatedColumns = columns.map(col => [...col, ...col, ...col])

  return (
    <div ref={containerRef} className="w-full px-4 md:px-6 lg:px-8 py-20 md:py-24">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {repeatedColumns.map((columnProjects, columnIndex) => {
            // Calculate transform based on scroll
            const direction = columnIndex % 2 === 0 ? -1 : 1
            const speed = 0.3
            const translateY = direction * scrollY * speed

            return (
              <div
                key={columnIndex}
                className="flex flex-col gap-4 md:gap-5 lg:gap-6"
                style={{
                  transform: `translateY(${translateY}px)`,
                  willChange: "transform",
                }}
              >
                {columnProjects.map((project, projectIndex) => (
                  <Link
                    key={`${project.id}-${projectIndex}`}
                    href={`/work/${project.id}`}
                    className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-900 cursor-pointer transition-transform duration-200 hover:scale-[1.015]"
                  >
                    <Image
                      src={project.src}
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                    <div className="absolute inset-0 p-4 md:p-5 flex items-end">
                      <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <h3 className="text-white text-xs md:text-sm font-medium">{project.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}