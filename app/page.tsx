"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { Navigation } from "@/components/navigation"
import { AngGrid } from "@/components/ang-grid"
import { PageTransition } from "@/components/page-transition"

export default function HomePage() {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-black">
        <CustomCursor />
        <AngGrid />
        <Navigation />
      </div>
    </PageTransition>
  )
}
