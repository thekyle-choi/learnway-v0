"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  category: string
  year: string
  src: string
  featured?: boolean
}

export function ProjectCard({ id, title, description, category, year, src, featured = false }: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/work/${id}`}>
      <article
        className={`group cursor-none ${featured ? "col-span-2 row-span-2" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`relative overflow-hidden rounded-lg tile-hover ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={title}
            fill
            className={`object-cover transition-all duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } ${isHovered ? "scale-110" : "scale-100"}`}
            onLoad={() => setIsLoaded(true)}
            sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
          />

          {!isLoaded && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black transition-all duration-500 ${
              isHovered ? "bg-opacity-40" : "bg-opacity-0"
            }`}
          />

          {/* Content */}
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
            <div
              className={`transition-all duration-500 ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium tracking-wider uppercase text-white opacity-80">{category}</span>
                <span className="text-xs text-white opacity-60">•</span>
                <span className="text-xs text-white opacity-60">{year}</span>
              </div>
              <h3 className={`text-white font-medium mb-2 ${featured ? "text-xl md:text-2xl" : "text-lg"}`}>{title}</h3>
              <p className={`text-white opacity-80 leading-relaxed ${featured ? "text-base max-w-md" : "text-sm"}`}>
                {description}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
