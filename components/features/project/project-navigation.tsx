"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

interface ProjectNavigationProps {
  currentProject: string
  nextProject: string
  previousProject?: string
}

export function ProjectNavigation({ currentProject, nextProject, previousProject }: ProjectNavigationProps) {
  const router = useRouter()

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" && previousProject) {
      router.push(`/work/${previousProject}`)
    } else if (e.key === "ArrowRight") {
      router.push(`/work/${nextProject}`)
    } else if (e.key === "Escape") {
      router.push("/")
    }
  }

  return (
    <nav
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      onKeyDown={handleKeyNavigation}
      tabIndex={0}
    >
      <div className="flex items-center gap-4 px-6 py-3 bg-black bg-opacity-80 backdrop-blur-sm rounded-full border border-white border-opacity-20">
        <Link
          href="/"
          className="text-xs font-medium tracking-wider uppercase hover:opacity-60 transition-opacity duration-300"
        >
          Work
        </Link>

        <div className="w-px h-4 bg-white opacity-20" />

        {previousProject && (
          <Link
            href={`/work/${previousProject}`}
            className="text-xs font-medium tracking-wider uppercase hover:opacity-60 transition-opacity duration-300"
          >
            ←
          </Link>
        )}

        <span className="text-xs opacity-60">{currentProject}</span>

        <Link
          href={`/work/${nextProject}`}
          className="text-xs font-medium tracking-wider uppercase hover:opacity-60 transition-opacity duration-300"
        >
          →
        </Link>
      </div>
    </nav>
  )
}
