import { CustomCursor } from "@/components/shared/custom-cursor"
import { Navigation } from "@/components/features/navigation/navigation"
import { AnimatedText } from "@/components/shared/animated-text"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <CustomCursor />
      <Navigation />

      <div className="text-center px-6 md:px-8">
        <AnimatedText text="Project Not Found" className="text-display text-balance mb-6" delay={0.2} stagger={0.1} />
        <AnimatedText
          text="The project you're looking for doesn't exist or has been moved."
          className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
          delay={0.6}
          stagger={0.02}
        />
        <Link
          href="/"
          className="inline-block text-sm font-medium tracking-wider uppercase hover:opacity-60 transition-opacity duration-300 magnetic-hover border border-white border-opacity-20 px-6 py-3 rounded-full"
        >
          Back to Work
        </Link>
      </div>
    </main>
  )
}
