"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/data/projects"

// 그리드에 표시할 프로젝트 데이터 (src와 id 매핑)
const gridProjects = projects.map((project) => ({
  id: project.id,
  src: project.type === "image" ? project.src : undefined,
  color: project.type === "color" ? project.color : undefined,
  title: project.title,
  type: project.type,
}))

export function AngGrid() {
  const scrollProgress = useMotionValue(0)
  const [isAnimating, setIsAnimating] = useState(true)

  // Trigger animation on mount (when returning from About page)
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 2000) // Animation complete after 2 seconds
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let accumulatedScroll = 0
    let velocity = 0
    let animationFrame: number
    let autoScrollFrame: number
    let autoScrollEnabled = true
    let autoScrollTimeout: NodeJS.Timeout | null = null
    
    // 자동 스크롤 속도 상수
    const AUTO_SCROLL_SPEED = 0.5
    const AUTO_SCROLL_RESUME_DELAY = 3000 // 3초 후 자동 스크롤 재개

    const animate = () => {
      // Apply damping to velocity
      velocity *= 0.92
      accumulatedScroll += velocity

      scrollProgress.set(accumulatedScroll)

      // Continue animation if there's movement
      if (Math.abs(velocity) > 0.01) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    const autoScroll = () => {
      if (autoScrollEnabled) {
        accumulatedScroll += AUTO_SCROLL_SPEED
        scrollProgress.set(accumulatedScroll)
        autoScrollFrame = requestAnimationFrame(autoScroll)
      }
    }

    // 초기 자동 스크롤 시작
    autoScrollFrame = requestAnimationFrame(autoScroll)

    const stopAutoScroll = () => {
      autoScrollEnabled = false
      cancelAnimationFrame(autoScrollFrame)
      
      // 기존 타이머 취소
      if (autoScrollTimeout) {
        clearTimeout(autoScrollTimeout)
      }
      
      // 일정 시간 후 자동 스크롤 재개
      autoScrollTimeout = setTimeout(() => {
        autoScrollEnabled = true
        autoScrollFrame = requestAnimationFrame(autoScroll)
      }, AUTO_SCROLL_RESUME_DELAY)
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // 자동 스크롤 중지
      stopAutoScroll()

      // Add to velocity for smooth acceleration
      velocity += e.deltaY * 0.18

      // Start animation loop
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(animate)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      cancelAnimationFrame(animationFrame)
      cancelAnimationFrame(autoScrollFrame)
      if (autoScrollTimeout) {
        clearTimeout(autoScrollTimeout)
      }
    }
  }, [scrollProgress])

  // Distribute into 4 columns
  const columns = [[], [], [], []] as typeof gridProjects[]
  gridProjects.forEach((project, index) => {
    columns[index % 4].push(project)
  })

  return (
    <motion.div
      className="fixed inset-0 w-full h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 헤더 영역을 덮지 않도록 pt-0 제거, 대신 개별 열에서 처리 */}
      <div className="absolute inset-0 px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8 xl:gap-10 h-full max-w-[1800px] mx-auto">
          {columns.map((columnProjects, columnIndex) => {
            const direction = columnIndex % 2 === 0 ? 1 : -1

            // 0,2열: 헤더 아래 (pt-24)
            // 1,3열: 헤더와 겹침 (pt-0)
            const startFromTop = columnIndex % 2 === 0

            return (
              <InfiniteColumn
                key={columnIndex}
                projects={columnProjects}
                direction={direction}
                scrollProgress={scrollProgress}
                startFromTop={startFromTop}
                columnIndex={columnIndex}
                isAnimating={isAnimating}
              />
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

function InfiniteColumn({
  projects,
  direction,
  scrollProgress,
  startFromTop,
  columnIndex,
  isAnimating,
}: {
  projects: typeof gridProjects
  direction: number
  scrollProgress: any
  startFromTop: boolean
  columnIndex: number
  isAnimating: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columnHeight, setColumnHeight] = useState(2000)

  // 실제 단일 세트 높이 측정
  useEffect(() => {
    if (containerRef.current) {
      const firstSet = containerRef.current.querySelector('[data-set="0"]')
      if (firstSet) {
        const height = firstSet.getBoundingClientRect().height
        setColumnHeight(height)
      }
    }
  }, [])

  // 무한 루프를 위한 y 변환
  const y = useTransform(scrollProgress, (latest: number) => {
    const speed = 0.6
    const travel = direction * latest * speed

    // modulo로 무한 반복
    const looped = ((travel % columnHeight) + columnHeight) % columnHeight

    // 시작 오프셋 적용
    // 1,3열: 헤더 아래 시작 (0)
    // 2,4열: 카드가 절반만 보이도록 음수 오프셋 적용 (카드 높이의 약 절반)
    const offset = startFromTop ? 96 : -400

    return looped + offset - columnHeight
  })

  return (
    <motion.div
      ref={containerRef}
      className={`relative h-full ${startFromTop ? 'pt-24' : 'pt-0'}`}
      style={{ overflow: 'visible' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: columnIndex * 0.1,
        ease: [0.22, 0.76, 0.27, 0.99]
      }}
    >
      <motion.div className="flex flex-col" style={{ y }}>
        {/* 3개 세트 렌더링 - 동일한 margin으로 연결 */}
        {[0, 1, 2].map((setIndex) => (
          <div key={setIndex} data-set={setIndex} className="flex flex-col">
            {projects.map((project, projectIndex) => {
              const totalIndex = setIndex * projects.length + projectIndex
              const staggerDelay = isAnimating ? (totalIndex % 8) * 0.05 + columnIndex * 0.02 : 0

              return (
                <motion.div
                  key={`${setIndex}-${project.id}-${projectIndex}`}
                  initial={isAnimating ? { opacity: 0, scale: 0.8, y: 30 } : false}
                  animate={isAnimating ? { opacity: 1, scale: 1, y: 0 } : false}
                  transition={{
                    duration: 0.6,
                    delay: staggerDelay,
                    ease: [0.22, 0.76, 0.27, 0.99]
                  }}
                  className="mb-6 md:mb-7 lg:mb-8 xl:mb-10"
                >
                  <Link
                    href={`/work/${project.id}`}
                    className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 hover:scale-[1.02] border border-white/20 block"
                    style={project.type === 'color' ? { backgroundColor: project.color } : { backgroundColor: '#1a1a1a' }}
                  >
                    {project.type === 'image' && project.src && (
                      <Image
                        src={project.src}
                        alt={project.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    )}
                    {project.type === 'color' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl font-bold opacity-10 mix-blend-overlay text-white">
                          {project.title.charAt(0)}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}