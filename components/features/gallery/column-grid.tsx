"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useScrollProgressContext } from "./scroll-canvas"
import { ProjectTile } from "./project-tile"
import { useMemo } from "react"
import { projects } from "@/data/projects"
import { ANIMATION, GRID } from "@/data/constants"

export function ColumnGrid() {
  const { scrollY, prefersReducedMotion } = useScrollProgressContext()

  const columns = useMemo(() => {
    const cols = Array.from({ length: GRID.COLUMNS }, () => []) as (typeof projects)[]
    projects.forEach((project, index) => {
      cols[index % GRID.COLUMNS].push(project)
    })
    return cols
  }, [])

  const getColumnY = (columnIndex: number) => {
    if (prefersReducedMotion) return 0

    const direction = columnIndex % 2 === 0 ? -1 : 1
    return direction * scrollY * ANIMATION.COLUMN_SPEED
  }

  return (
    <div className="absolute inset-0 w-full px-8 md:px-16 lg:px-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8"
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
                      ease: ANIMATION.CUSTOM_EASE,
                    }
              }
              role="gridcell"
              aria-label={`Column ${columnIndex + 1} of ${columns.length}`}
            >
              <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
                {Array.from({ length: GRID.REPETITIONS }).flatMap(() => columnProjects).map((project, projectIndex) => (
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
