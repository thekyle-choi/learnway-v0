import { CustomCursor } from "@/components/custom-cursor"
import { Navigation } from "@/components/navigation"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white page-transition">
      <CustomCursor />
      <Navigation />

      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-display text-balance mb-8 md:mb-12">Contact</h1>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="text-headline mb-4 md:mb-6">Get in Touch</h2>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6 md:mb-8">
                Ready to start a project? Have a question about our work? We'd love to hear from you.
              </p>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-xs md:text-sm font-medium tracking-wider uppercase mb-2 opacity-60">Email</h3>
                  <a
                    href="mailto:hello@creativestudio.com"
                    className="text-base md:text-lg hover:opacity-60 transition-opacity duration-300 break-all"
                  >
                    hello@creativestudio.com
                  </a>
                </div>

                <div>
                  <h3 className="text-xs md:text-sm font-medium tracking-wider uppercase mb-2 opacity-60">Phone</h3>
                  <a
                    href="tel:+1234567890"
                    className="text-base md:text-lg hover:opacity-60 transition-opacity duration-300"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-headline mb-4 md:mb-6">New Business</h2>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4 md:mb-6">
                For new project inquiries, please include details about your timeline, budget, and project scope.
              </p>
              <p className="text-xs md:text-sm font-medium tracking-wider uppercase opacity-60">
                Response time: 24-48 hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
