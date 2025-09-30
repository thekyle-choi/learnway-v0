"use client"

import { ProjectTile } from "./project-tile"
import { StaggerContainer } from "./stagger-container"
import { StaggerItem } from "./stagger-item"

const projects = [
  {
    id: "neon-identity",
    title: "Neon Identity",
    type: "color" as const,
    color: "#00f85a",
    aspectRatio: "square" as const,
  },
  {
    id: "mobile-app",
    title: "Mobile App Design",
    type: "mockup" as const,
    src: "/mobile-app-mockup.png",
    aspectRatio: "portrait" as const,
  },
  {
    id: "editorial-layout",
    title: "Editorial Layout",
    type: "image" as const,
    src: "/editorial-magazine-layout.png",
    aspectRatio: "landscape" as const,
  },
  {
    id: "orange-brand",
    title: "Orange Brand",
    type: "color" as const,
    color: "#ff5a1f",
    aspectRatio: "square" as const,
  },
  {
    id: "web-interface",
    title: "Web Interface",
    type: "image" as const,
    src: "/web-interface-design.jpg",
    aspectRatio: "square" as const,
  },
  {
    id: "cyan-project",
    title: "Cyan Project",
    type: "color" as const,
    color: "#87e6ef",
    aspectRatio: "portrait" as const,
  },
  {
    id: "product-shots",
    title: "Product Photography",
    type: "image" as const,
    src: "/product-photography-still-life.png",
    aspectRatio: "landscape" as const,
  },
  {
    id: "tablet-ui",
    title: "Tablet UI",
    type: "mockup" as const,
    src: "/tablet-interface-mockup.jpg",
    aspectRatio: "landscape" as const,
  },
  {
    id: "lilac-design",
    title: "Lilac Design",
    type: "color" as const,
    color: "#b9a8c9",
    aspectRatio: "square" as const,
  },
  {
    id: "typography-poster",
    title: "Typography Poster",
    type: "image" as const,
    src: "/typography-poster.png",
    aspectRatio: "portrait" as const,
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    type: "image" as const,
    src: "/brand-identity-design.png",
    aspectRatio: "landscape" as const,
  },
  {
    id: "phone-mockup",
    title: "Phone App",
    type: "mockup" as const,
    src: "/phone-app-mockup.jpg",
    aspectRatio: "portrait" as const,
  },
]

export function ProjectGrid() {
  return (
    <section className="px-6 md:px-8 pb-16">
      <div className="max-w-7xl mx-auto">
        <StaggerContainer className="masonry-grid">
          {projects.map((project, index) => (
            <StaggerItem key={project.id}>
              <ProjectTile
                id={project.id}
                title={project.title}
                type={project.type}
                src={project.src}
                color={project.color}
                aspectRatio={project.aspectRatio}
                delay={0} // Now handled by StaggerItem
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
