"use client"

import { CustomCursor } from "@/components/shared/custom-cursor"
import { Navigation } from "@/components/features/navigation/navigation"
import { TextReveal } from "@/components/features/animation/text-reveal"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect } from "react"

const expertise = [
  "Digital Innovation",
  "Design Thinking",
  "Agile Transformation",
  "Data Analytics",
  "Product Strategy",
  "Service Design",
  "User Research",
  "Business Development"
]

const partners = [
  "GS Retail", "GS Energy", "GS Caltex", "GS E&C", "GS Global",
  "GS Power", "GS EPS", "GS Sports", "GS Homeshopping", "GS Shop",
  "GS25", "GS Fresh", "GS The Fresh", "Parnas Hotel", "GS Futures"
]

const values = [
  { number: "2000+", label: "Innovators" },
  { number: "500+", label: "Projects" },
  { number: "15", label: "GS Affiliates" },
  { number: "87%", label: "Success Rate" }
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    document.title = "about - 52g with v0"
    
    return () => {
      document.title = "52g with v0"
    }
  }, [])

  return (
    <main className="bg-black text-white min-h-screen" ref={containerRef}>
      <CustomCursor />
      <Navigation />

      {/* Hero Section - Full Height */}
      <section className="min-h-screen flex items-center justify-center relative px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl w-full">
          <motion.div style={{ y: titleY }}>
            <TextReveal delay={0.1} y={100}>
              <h1 className="text-[8vw] md:text-[10vw] lg:text-[12vw] font-bold leading-[0.85] tracking-[-0.04em]">
                OPEN &
              </h1>
            </TextReveal>
            <TextReveal delay={0.2} y={100}>
              <h1 className="text-[8vw] md:text-[10vw] lg:text-[12vw] font-bold leading-[0.85] tracking-[-0.04em]">
                TOGETHER
              </h1>
            </TextReveal>
          </motion.div>

          <motion.div
            style={{ opacity: subtitleOpacity }}
            className="mt-12 md:mt-16 max-w-2xl"
          >
            <TextReveal delay={0.4}>
              <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/80">
                Open Innovation GS — where innovation meets collaboration.
                Transforming workplace challenges into opportunities across GS Group's ecosystem.
              </p>
            </TextReveal>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-[1px] h-16 bg-white/20" />
        </motion.div>
      </section>

      {/* Expertise Grid */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm md:text-base uppercase tracking-[0.3em] text-white/50 mb-8">
              EXPERTISE
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-8">
            {expertise.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <p className="text-lg md:text-xl lg:text-2xl font-light">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Text */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
                52g is GS Group's open innovation community
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                Working as an innovation catalyst across GS affiliates, we bring over a decade of experience in digital transformation.
                Based in Seoul, we collaborate with teams, startups and independent innovators across diverse industries,
                addressing varied project and transformation needs.
              </p>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                Our mission is simple: Make Innovation Simply Open. We believe that every challenge
                is an opportunity for transformation when approached with the right mindset, tools, and collaborative spirit.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center md:text-left"
              >
                <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2">
                  {value.number}
                </h3>
                <p className="text-sm md:text-base uppercase tracking-[0.2em] text-white/50">
                  {value.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm md:text-base uppercase tracking-[0.3em] text-white/50 mb-12">
              GS AFFILIATES
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center"
              >
                <div className="text-center">
                  <p className="text-sm md:text-base font-medium text-white/60 hover:text-white transition-colors">
                    {partner}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISO Platform Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm md:text-base uppercase tracking-[0.3em] text-white/50 mb-4">
                INNOVATION PLATFORM
              </h2>
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                MISO
              </h3>
              <p className="text-2xl md:text-3xl font-light text-white/80">
                Make Innovation Simply Open
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center"
            >
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                  Our digital innovation platform connecting ideas with execution.
                  A unified workspace where teams across GS Group can ideate, prototype,
                  and launch innovative solutions together.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="px-4 py-2 border border-white/20 rounded-full text-sm">
                    Idea Launchpad
                  </span>
                  <span className="px-4 py-2 border border-white/20 rounded-full text-sm">
                    Team Matching
                  </span>
                  <span className="px-4 py-2 border border-white/20 rounded-full text-sm">
                    Impact Analytics
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8">
                Let's work it out
                <br />
                <span className="text-white/40">together</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/50 mb-2">
                  Email
                </p>
                <a
                  href="mailto:innovation@52g.gs"
                  className="text-xl md:text-2xl hover:text-white/60 transition-colors"
                >
                  innovation@52g.gs
                </a>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/50 mb-2">
                  Website
                </p>
                <a
                  href="https://www.52g.gs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl md:text-2xl hover:text-white/60 transition-colors"
                >
                  www.52g.gs
                </a>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/50 mb-2">
                  Location
                </p>
                <p className="text-xl md:text-2xl">
                  Seoul, South Korea
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 lg:px-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-sm text-white/40">
            © 2024 52g Open Innovation GS
          </p>
          <p className="text-sm text-white/40">
            All rights reserved
          </p>
        </div>
      </footer>
    </main>
  )
}