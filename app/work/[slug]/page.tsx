import { CustomCursor } from "@/components/custom-cursor"
import { Navigation } from "@/components/navigation"
import { ProjectDetail } from "@/components/project-detail"
import { PageTransition } from "@/components/page-transition"
import { notFound } from "next/navigation"

// Sample project data - in a real app this would come from a CMS or API
const projectData = {
  "neon-identity": {
    title: "Neon Identity",
    category: "Brand Identity",
    year: "2024",
    client: "Tech Startup",
    services: ["Brand Strategy", "Visual Identity", "Digital Design"],
    description:
      "A bold brand identity for an emerging tech startup, featuring vibrant neon green as the primary color to convey innovation and energy.",
    hero: "/brand-identity-design.png",
    gallery: ["/brand-identity-design.png", "/typography-poster.png", "/web-interface-design.jpg"],
    nextProject: "mobile-app",
  },
  "mobile-app": {
    title: "Mobile App Design",
    category: "UI/UX Design",
    year: "2024",
    client: "Fintech Company",
    services: ["User Research", "UI Design", "Prototyping"],
    description:
      "A comprehensive mobile banking application designed with user experience at the forefront, featuring intuitive navigation and accessible design patterns.",
    hero: "/mobile-app-mockup.png",
    gallery: ["/mobile-app-mockup.png", "/phone-app-mockup.jpg", "/tablet-interface-mockup.jpg"],
    nextProject: "editorial-layout",
  },
  "editorial-layout": {
    title: "Editorial Layout",
    category: "Print Design",
    year: "2024",
    client: "Design Magazine",
    services: ["Editorial Design", "Typography", "Layout"],
    description:
      "A sophisticated editorial layout system for a contemporary design magazine, emphasizing readability and visual hierarchy through thoughtful typography.",
    hero: "/editorial-magazine-layout.png",
    gallery: ["/editorial-magazine-layout.png", "/typography-poster.png", "/brand-identity-design.png"],
    nextProject: "web-interface",
  },
  "web-interface": {
    title: "Web Interface",
    category: "Web Design",
    year: "2024",
    client: "SaaS Platform",
    services: ["Interface Design", "User Experience", "Design System"],
    description:
      "A clean and functional web interface for a SaaS platform, focusing on usability and scalability across different user types and workflows.",
    hero: "/web-interface-design.jpg",
    gallery: ["/web-interface-design.jpg", "/tablet-interface-mockup.jpg", "/mobile-app-mockup.png"],
    nextProject: "product-shots",
  },
  "product-shots": {
    title: "Product Photography",
    category: "Photography",
    year: "2024",
    client: "Lifestyle Brand",
    services: ["Art Direction", "Photography", "Post-Production"],
    description:
      "Elegant product photography showcasing lifestyle products with careful attention to lighting, composition, and brand consistency.",
    hero: "/product-photography-still-life.png",
    gallery: ["/product-photography-still-life.png", "/brand-identity-design.png", "/editorial-magazine-layout.png"],
    nextProject: "neon-identity",
  },
}

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectData[params.slug as keyof typeof projectData]

  if (!project) {
    notFound()
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white">
        <CustomCursor />
        <Navigation />
        <ProjectDetail project={project} />
      </main>
    </PageTransition>
  )
}

export function generateStaticParams() {
  return Object.keys(projectData).map((slug) => ({
    slug,
  }))
}
