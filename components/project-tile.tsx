"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ProjectTileProps {
  id: string
  title: string
  type: "image" | "color" | "mockup"
  src?: string
  color?: string
  aspectRatio?: "square" | "portrait" | "landscape"
  delay?: number
}

export function ProjectTile({ id, title, type, src, color, aspectRatio = "square", delay = 0 }: ProjectTileProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const aspectClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  }

  return (
    <Link href={`/work/${id}`}>
      <div
        className={`masonry-item tile-hover stagger-item relative overflow-hidden rounded-lg md:rounded-xl group cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.015] ${aspectClasses[aspectRatio]}`}
        style={{ animationDelay: `${delay}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {type === "color" && (
          <div className="w-full h-full flex items-center justify-center relative" style={{ backgroundColor: color }}>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-black opacity-10 mb-2">{title.charAt(0)}</div>
              <div className="text-xs font-medium tracking-wider uppercase text-black opacity-30">
                {title.split(" ")[0]}
              </div>
            </div>
          </div>
        )}

        {type === "image" && src && (
          <div className="relative w-full h-full bg-gray-900">
            <Image
              src={src || "/placeholder.svg"}
              alt={title}
              fill
              unoptimized
              className={`object-cover transition-all duration-700 ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
              } ${isHovered ? "scale-110" : "scale-100"}`}
              onLoad={() => setIsLoaded(true)}
              onError={() => setIsLoaded(true)}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {!isLoaded && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}
          </div>
        )}

        {type === "mockup" && src && (
          <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
            <div className="relative w-full h-full max-w-[80%] max-h-[80%]">
              <Image
                src={src || "/placeholder.svg"}
                alt={title}
                fill
                className={`object-contain transition-all duration-700 ${
                  isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                } ${isHovered ? "scale-105" : "scale-100"}`}
                onLoad={() => setIsLoaded(true)}
                sizes="(max-width: 768px) 40vw, (max-width: 1024px) 26vw, 20vw"
              />
              {!isLoaded && <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg" />}
            </div>
          </div>
        )}

        <div
          className={`absolute inset-0 bg-black transition-all duration-300 flex items-end p-4 md:p-5 ${
            isHovered ? "bg-opacity-30" : "bg-opacity-0"
          }`}
        >
          <div
            className={`transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <h3 className="text-white text-xs md:text-sm font-medium mb-0.5">{title}</h3>
            <p className="text-white text-[10px] md:text-xs opacity-70 tracking-wide">
              {type === "color" ? "Brand Identity" : type === "mockup" ? "UI/UX Design" : "Visual Design"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
