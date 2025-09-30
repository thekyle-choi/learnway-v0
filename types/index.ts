export type AspectRatio = "square" | "portrait" | "landscape"
export type ProjectSize = "small" | "medium" | "large"
export type ProjectType = "color" | "image"

export interface Project {
  id: string
  title: string
  type: ProjectType
  src?: string
  color?: string
  aspectRatio: AspectRatio
  size: ProjectSize
}

export interface ProjectDetail {
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

export type ProjectDataMap = Record<string, ProjectDetail>