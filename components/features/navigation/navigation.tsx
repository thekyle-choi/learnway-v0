"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const isAboutPage = pathname === "/about"
  const isProjectPage = pathname.startsWith("/work/")

  const handleAboutToggle = () => {
    if (isAboutPage || isProjectPage) {
      router.push("/")
    } else {
      router.push("/about")
    }
  }

  return (
    <>
      {/* Fixed header with Learnway logo */}
      <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none" style={{ mixBlendMode: 'difference' }}>
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-8 lg:px-10">
          {/* Learnway Logo - Left */}
          <div className="pointer-events-auto" style={{ mixBlendMode: 'normal' }}>
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-200 group-hover:scale-105">
                <Image src="/assets/learnway-logo.png" alt="Learnway Logo" fill className="object-contain" priority />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white text-xl md:text-2xl font-bold tracking-tight transition-all duration-200 group-hover:text-white/90">
                  Learnway
                </span>
                <span className="text-white text-xs md:text-sm font-light tracking-wide" style={{ opacity: 0.6 }}>with</span>
                <div className="relative w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:scale-105">
                  <Image src="/assets/v0-logo.webp" alt="v0 Logo" fill className="object-contain" />
                </div>
              </div>
            </Link>
          </div>

          {/* About/Close Button - Right */}
          <nav className="pointer-events-auto">
            <button
              onClick={handleAboutToggle}
              className="relative text-white text-xl md:text-2xl font-bold tracking-tight group"
              aria-label={isAboutPage || isProjectPage ? "Close and go home" : "Open about"}
            >
              <span className="relative">
                {isAboutPage || isProjectPage ? "Close" : "About"}
                <span
                  className="absolute left-0 bottom-0 w-full h-[2px] bg-white origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  style={{ bottom: '-4px' }}
                />
              </span>
            </button>
          </nav>
        </div>
      </header>
    </>
  )
}
