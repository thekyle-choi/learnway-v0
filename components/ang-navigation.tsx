"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function AngNavigation() {
  const pathname = usePathname()

  return (
    <>
      {/* Logo - 왼쪽 상단 */}
      <div className="fixed top-6 left-6 md:left-10 lg:left-14 xl:left-20 z-[200]">
        <Link href="/" className="text-white text-sm font-medium tracking-tight hover:opacity-70 transition-opacity">
          Ang Studio®
        </Link>
      </div>

      {/* Navigation - 오른쪽 상단 */}
      <nav className="fixed top-6 right-6 md:right-10 lg:right-14 xl:right-20 z-[200]">
        <div className="flex items-center gap-6 md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-normal text-white transition-opacity duration-200 ${
                pathname === item.href ? "opacity-100" : "opacity-70 hover:opacity-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}