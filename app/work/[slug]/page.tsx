import { CustomCursor } from "@/components/shared/custom-cursor"
import { Navigation } from "@/components/features/navigation/navigation"
import { ProjectDetail } from "@/components/features/project/project-detail"
import { PageTransition } from "@/components/shared/page-transition"
import { notFound } from "next/navigation"
import { projectDetails } from "@/data/projects"
import type { Metadata } from "next"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projectDetails[params.slug]
  
  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: project.title,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectDetails[params.slug]

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
  return Object.keys(projectDetails).map((slug) => ({
    slug,
  }))
}
