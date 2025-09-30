import { CustomCursor } from "@/components/custom-cursor"
import { Navigation } from "@/components/navigation"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white page-transition">
      <CustomCursor />
      <Navigation />

      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-display text-balance mb-8 md:mb-12">About</h1>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="text-headline mb-4 md:mb-6">Studio</h2>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4 md:mb-6">
                We are a creative studio focused on bold, minimal design and editorial experiences. Our work spans
                digital interfaces, brand identity, and experimental projects.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Founded in 2024, we believe in the power of simplicity and the impact of thoughtful design decisions.
              </p>
            </div>

            <div>
              <h2 className="text-headline mb-4 md:mb-6">Approach</h2>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4 md:mb-6">
                Every project begins with understanding. We dive deep into the problem space, exploring constraints and
                opportunities to craft solutions that are both beautiful and functional.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Our process emphasizes collaboration, iteration, and attention to the smallest details that make the
                biggest difference.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
