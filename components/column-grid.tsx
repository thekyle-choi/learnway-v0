"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useScrollProgressContext } from "./scroll-canvas"
import { ProjectTile } from "./project-tile"
import { useMemo } from "react"

const projects = [
  {
    id: "neon-identity",
    title: "Neon Identity",
    type: "color" as const,
    color: "#00f85a",
    aspectRatio: "square" as const,
    size: "medium" as const,
  },
  {
    id: "mobile-app",
    title: "Mobile App Design",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    aspectRatio: "portrait" as const,
    size: "large" as const,
  },
  {
    id: "editorial-layout",
    title: "Editorial Layout",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80",
    aspectRatio: "landscape" as const,
    size: "medium" as const,
  },
  {
    id: "orange-brand",
    title: "Orange Brand",
    type: "color" as const,
    color: "#ff5a1f",
    aspectRatio: "square" as const,
    size: "small" as const,
  },
  {
    id: "web-interface",
    title: "Web Interface",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80",
    aspectRatio: "square" as const,
    size: "medium" as const,
  },
  {
    id: "cyan-project",
    title: "Cyan Project",
    type: "color" as const,
    color: "#87e6ef",
    aspectRatio: "portrait" as const,
    size: "large" as const,
  },
  {
    id: "product-shots",
    title: "Product Photography",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    aspectRatio: "landscape" as const,
    size: "medium" as const,
  },
  {
    id: "tablet-ui",
    title: "Tablet UI",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    aspectRatio: "landscape" as const,
    size: "large" as const,
  },
  {
    id: "lilac-design",
    title: "Lilac Design",
    type: "color" as const,
    color: "#b9a8c9",
    aspectRatio: "square" as const,
    size: "small" as const,
  },
  {
    id: "typography-poster",
    title: "Typography Poster",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    aspectRatio: "portrait" as const,
    size: "medium" as const,
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    aspectRatio: "landscape" as const,
    size: "large" as const,
  },
  {
    id: "phone-mockup",
    title: "Phone App",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    aspectRatio: "portrait" as const,
    size: "medium" as const,
  },
  {
    id: "architecture-1",
    title: "Architecture",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80",
    aspectRatio: "square" as const,
    size: "medium" as const,
  },
  {
    id: "pink-gradient",
    title: "Pink Gradient",
    type: "color" as const,
    color: "#ff006e",
    aspectRatio: "landscape" as const,
    size: "medium" as const,
  },
  {
    id: "design-work",
    title: "Design Work",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1558403194-611308249627?w=800&q=80",
    aspectRatio: "portrait" as const,
    size: "medium" as const,
  },
]

const customEase = [0.22, 0.76, 0.27, 0.99] as const

export function ColumnGrid() {
  const { scrollY, prefersReducedMotion } = useScrollProgressContext()

  const columns = useMemo(() => {
    const cols = [[], [], [], []] as (typeof projects)[]
    projects.forEach((project, index) => {
      cols[index % 4].push(project)
    })
    return cols
  }, [])

  const getColumnY = (columnIndex: number) => {
    if (prefersReducedMotion) return 0

    // Alternating directions: col 0,2 move up (-), col 1,3 move down (+)
    const direction = columnIndex % 2 === 0 ? -1 : 1

    // Speed multiplier - adjust this to control how fast columns move
    const speed = 0.15

    return direction * scrollY * speed
  }

  return (
    <div className="absolute inset-0 w-full px-4 md:px-5 lg:px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[2000px]">
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5"
          role="grid"
          aria-label="Project portfolio grid"
        >
          {columns.map((columnProjects, columnIndex) => (
            <motion.div
              key={columnIndex}
              className="column-track"
              style={{
                y: getColumnY(columnIndex),
                willChange: "transform",
              }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      duration: 0.6,
                      delay: columnIndex * 0.06,
                      ease: customEase,
                    }
              }
              role="gridcell"
              aria-label={`Column ${columnIndex + 1} of ${columns.length}`}
            >
              <div className="flex flex-col space-y-3 md:space-y-4 lg:space-y-5">
                {[...columnProjects, ...columnProjects, ...columnProjects].map((project, projectIndex) => (
                  <ProjectTile
                    key={`${project.id}-${Math.floor(projectIndex / columnProjects.length)}`}
                    id={project.id}
                    title={project.title}
                    type={project.type}
                    src={project.src}
                    color={project.color}
                    aspectRatio={project.aspectRatio}
                    delay={0}
                    aria-label={`Project ${projectIndex + 1}: ${project.title}`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
