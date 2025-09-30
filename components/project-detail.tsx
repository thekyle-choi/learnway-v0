"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AnimatedText } from "./animated-text"
import { StaggerContainer } from "./stagger-container"
import { StaggerItem } from "./stagger-item"

interface ProjectDetailProps {
  project: {
    title: string
    category: string
    year: string
    client: string
    services: string[]
    description: string
    hero: string
    gallery: string[]
    nextProject: string
  }
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  const handleImageLoad = (src: string) => {
    setLoadedImages((prev) => new Set(prev).add(src))
  }

  return (
    <article className="pt-24 md:pt-32 pb-12 md:pb-16">
      {/* Hero Section */}
      <section className="px-4 md:px-6 lg:px-8 mb-12 md:mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-end mb-12 md:mb-16">
            <div>
              <AnimatedText
                text={project.title}
                className="text-display text-balance mb-4 md:mb-6"
                delay={0.2}
                stagger={0.1}
              />
              <AnimatedText
                text={project.description}
                className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed"
                delay={0.6}
                stagger={0.02}
              />
            </div>

            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-xs md:text-sm font-medium tracking-wider uppercase mb-2 opacity-60">Client</h3>
                <p className="text-base md:text-lg">{project.client}</p>
              </div>

              <div>
                <h3 className="text-xs md:text-sm font-medium tracking-wider uppercase mb-2 opacity-60">Year</h3>
                <p className="text-base md:text-lg">{project.year}</p>
              </div>

              <div>
                <h3 className="text-xs md:text-sm font-medium tracking-wider uppercase mb-2 opacity-60">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="px-2 md:px-3 py-1 text-xs md:text-sm bg-white bg-opacity-10 rounded-full border border-white border-opacity-20"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-lg">
            <Image
              src={project.hero || "/placeholder.svg"}
              alt={project.title}
              fill
              className={`object-cover transition-all duration-1000 ${
                loadedImages.has(project.hero) ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              onLoad={() => handleImageLoad(project.hero)}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
            {!loadedImages.has(project.hero) && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 md:px-6 lg:px-8 mb-12 md:mb-16">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="space-y-12 md:space-y-16">
            {project.gallery.map((image, index) => (
              <StaggerItem key={image}>
                <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-lg">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    className={`object-cover transition-all duration-1000 ${
                      loadedImages.has(image) ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                    onLoad={() => handleImageLoad(image)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  />
                  {!loadedImages.has(image) && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Navigation */}
      <section className="px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 md:py-8 border-t border-white border-opacity-10">
            <Link
              href="/"
              className="text-xs md:text-sm font-medium tracking-wider uppercase hover:opacity-60 transition-opacity duration-300 magnetic-hover"
            >
              ← Back to Work
            </Link>

            <Link
              href={`/work/${project.nextProject}`}
              className="text-xs md:text-sm font-medium tracking-wider uppercase hover:opacity-60 transition-opacity duration-300 magnetic-hover"
            >
              Next Project →
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
