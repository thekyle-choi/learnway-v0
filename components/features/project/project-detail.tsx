"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AnimatedText } from "@/components/shared/animated-text"
import { StaggerContainer } from "@/components/shared/stagger-container"
import { StaggerItem } from "@/components/shared/stagger-item"

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
    <article className="min-h-screen">
      {/* Hero Section - Full Width */}
      <section className="relative h-screen w-full">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <Image
            src={project.hero || "/placeholder.svg"}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-1000 ${
              loadedImages.has(project.hero) ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            onLoad={() => handleImageLoad(project.hero)}
            priority
            sizes="100vw"
          />
          {!loadedImages.has(project.hero) && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Project Title - Overlay */}
        <div className="absolute inset-0 flex items-end justify-center pb-16 md:pb-24 px-6 md:px-12">
          <div className="text-center max-w-5xl">
            <AnimatedText
              text={project.title}
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-4 md:mb-6 tracking-tight"
              delay={0.3}
              stagger={0.05}
            />
            <div className="text-white/80 text-sm md:text-base lg:text-lg uppercase tracking-widest font-light">
              {project.category} — {project.year}
            </div>
          </div>
        </div>
      </section>

      {/* Project Info Section */}
      <section className="bg-black text-white py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Left - Description */}
            <div className="lg:col-span-7">
              <h2 className="text-xs md:text-sm uppercase tracking-wider text-white/40 mb-8 font-light">
                About
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed font-light text-white/90">
                {project.description}
              </p>
            </div>

            {/* Right - Details */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h3 className="text-xs md:text-sm uppercase tracking-wider text-white/40 mb-4 font-light">
                  Client
                </h3>
                <p className="text-xl md:text-2xl font-light">{project.client}</p>
              </div>

              <div>
                <h3 className="text-xs md:text-sm uppercase tracking-wider text-white/40 mb-4 font-light">Year</h3>
                <p className="text-xl md:text-2xl font-light">{project.year}</p>
              </div>

              <div>
                <h3 className="text-xs md:text-sm uppercase tracking-wider text-white/40 mb-4 font-light">Services</h3>
                <ul className="space-y-2">
                  {project.services.map((service) => (
                    <li key={service} className="text-lg md:text-xl font-light text-white/80">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-black px-6 md:px-12 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="space-y-24 md:space-y-32">
            {project.gallery.map((image, index) => (
              <StaggerItem key={image}>
                <div className="relative w-full overflow-hidden">
                  {/* Varying aspect ratios for visual interest */}
                  <div className={`relative ${index % 3 === 0 ? "aspect-[16/9]" : index % 3 === 1 ? "aspect-[4/3]" : "aspect-[3/2]"} overflow-hidden`}>
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className={`object-cover transition-all duration-1000 ${
                        loadedImages.has(image) ? "opacity-100 scale-100" : "opacity-0 scale-105"
                      }`}
                      onLoad={() => handleImageLoad(image)}
                      sizes="(max-width: 768px) 100vw, 90vw"
                    />
                    {!loadedImages.has(image) && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}
                  </div>
                  {/* Optional caption */}
                  <div className="mt-6 text-white/40 text-xs md:text-sm uppercase tracking-wider font-light">
                    Image {index + 1} / {project.gallery.length}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="bg-black text-white px-6 md:px-12 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 py-12 md:py-16 border-t border-white/10">
            <Link
              href="/"
              className="group flex items-center gap-3 text-sm md:text-base uppercase tracking-wider font-light hover:text-white/60 transition-colors duration-300"
            >
              <span className="inline-block transform group-hover:-translate-x-1 transition-transform duration-300">
                ←
              </span>
              All Work
            </Link>

            <Link
              href={`/work/${project.nextProject}`}
              className="group flex items-center gap-3 text-sm md:text-base uppercase tracking-wider font-light hover:text-white/60 transition-colors duration-300"
            >
              Next Project
              <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}