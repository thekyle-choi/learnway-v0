"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CustomCursor } from "@/components/shared/custom-cursor"
import { Navigation } from "@/components/features/navigation/navigation"
import { AngGrid } from "@/components/ang-grid"
import { PageTransition } from "@/components/shared/page-transition"
import { TypingEffect } from "@/components/features/animation/typing-effect"

// 모듈 레벨 변수로 첫 방문 여부 추적 (새로고침 시 초기화됨)
let hasVisitedBefore = false

export default function HomePage() {
  const [showTyping, setShowTyping] = useState(!hasVisitedBefore)
  const [showContent, setShowContent] = useState(hasVisitedBefore)

  useEffect(() => {
    // Add no-scroll class to body for homepage
    document.body.classList.add('no-scroll')

    // Cleanup: remove no-scroll class when leaving page
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])

  const handleTypingComplete = () => {
    // 방문 표시 (다음 클라이언트 사이드 라우팅에서는 타이핑 효과 안 나타남)
    hasVisitedBefore = true
    
    // 타이핑 완료 후 잠시 대기
    setTimeout(() => {
      setShowTyping(false)
      // 타이핑 효과가 사라진 후 컨텐츠 표시
      setTimeout(() => {
        setShowContent(true)
      }, 300)
    }, 1000)
  }

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-black" style={{ isolation: 'isolate' }}>
        <CustomCursor />
        
        <AnimatePresence mode="wait">
          {showTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            >
              <TypingEffect
                texts={["Open Innovation GS"]}
                typingSpeed={80}
                cursorColor="#ffffff"
                variant="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white"
                startDelay={500}
                onComplete={handleTypingComplete}
                loop={false}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {showContent && (
          <>
            <AngGrid />
            <Navigation />
          </>
        )}
      </div>
    </PageTransition>
  )
}
