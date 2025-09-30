"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

const projects = [
  { id: 1, src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80", title: "Design Work 1" },
  { id: 2, src: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?w=800&q=80", title: "Design Work 2" },
  { id: 3, src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80", title: "Design Work 3" },
  { id: 4, src: "https://images.unsplash.com/photo-1558403194-611308249627?w=800&q=80", title: "Design Work 4" },
  { id: 5, src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80", title: "Design Work 5" },
  { id: 6, src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80", title: "Design Work 6" },
  { id: 7, src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", title: "Design Work 7" },
  { id: 8, src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", title: "Design Work 8" },
  { id: 9, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", title: "Design Work 9" },
  { id: 10, src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80", title: "Design Work 10" },
  { id: 11, src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80", title: "Design Work 11" },
  { id: 12, src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80", title: "Design Work 12" },
  { id: 13, src: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80", title: "Design Work 13" },
  { id: 14, src: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&q=80", title: "Design Work 14" },
  { id: 15, src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80", title: "Design Work 15" },
  { id: 16, src: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=800&q=80", title: "Design Work 16" },
]

export function AngGrid() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Distribute projects into 4 columns
  const columns = [[], [], [], []] as typeof projects[]
  projects.forEach((project, index) => {
    columns[index % 4].push(project)
  })

  // Repeat projects for infinite scroll effect
  const repeatedColumns = columns.map(col => [...col, ...col, ...col, ...col])

  return (
    <div className="absolute inset-0 w-full">
      <div className="w-full h-[400vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8 xl:gap-10 h-full max-w-[1800px] mx-auto">
              {repeatedColumns.map((columnProjects, columnIndex) => {
                // 1,3열은 아래로(+), 2,4열은 위로(-)
                const direction = columnIndex % 2 === 0 ? 1 : -1
                const speed = 0.25
                const translateY = direction * scrollY * speed

                // 각 열의 시작 위치를 다르게
                // 1,3열(index 0,2): 헤더 아래에서 시작 (80px 아래)
                // 2,4열(index 1,3): 카드 반이 화면 위로 (-200px)
                const offsetY = columnIndex % 2 === 0 ? 80 : -200

                return (
                  <div
                    key={columnIndex}
                    className="flex flex-col gap-6 md:gap-7 lg:gap-8 xl:gap-10"
                    style={{
                      transform: `translateY(${translateY + offsetY}px)`,
                      willChange: "transform",
                    }}
                  >
                    {columnProjects.map((project, projectIndex) => (
                      <Link
                        key={`${project.id}-${projectIndex}`}
                        href={`/work/${project.id}`}
                        className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-900 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                      >
                        <Image
                          src={project.src}
                          alt={project.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}