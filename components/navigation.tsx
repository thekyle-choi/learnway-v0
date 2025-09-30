"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Fixed header with Learnway logo */}
      <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-8 lg:px-10">
          {/* Learnway Logo - Left */}
          <div className="pointer-events-auto">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-200 group-hover:scale-105">
                <Image src="/assets/learnway-logo.png" alt="Learnway Logo" fill className="object-contain" priority />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white text-xl md:text-2xl font-bold tracking-tight transition-all duration-200 group-hover:text-white/90">
                  Learnway
                </span>
                <span className="text-white/60 text-xs md:text-sm font-light tracking-wide">with</span>
                <div className="relative w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:scale-105">
                  <Image src="/assets/v0-logo.webp" alt="v0 Logo" fill className="object-contain" />
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Right */}
          <nav className="hidden md:block pointer-events-auto">
            <div className="flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium tracking-tight transition-opacity duration-200 hover:opacity-60 ${
                    pathname === item.href ? "opacity-100" : "opacity-80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Navigation Toggle - Right */}
          <nav className="md:hidden pointer-events-auto">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-sm font-medium tracking-tight transition-opacity duration-200 hover:opacity-60"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? "Close" : "Menu"}
            </button>
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-95 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
            <div className="text-center space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-2xl font-medium tracking-tight transition-opacity duration-200 hover:opacity-60 ${
                    pathname === item.href ? "opacity-100" : "opacity-80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
