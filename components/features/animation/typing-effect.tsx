"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type TypingEffectProps = {
  texts: string[]
  typingSpeed?: number
  deleteSpeed?: number
  cursorType?: "|" | "_" | "▌"
  cursorColor?: string
  variant?: string
  startDelay?: number
  onComplete?: () => void
  loop?: boolean
  pauseAfterTyping?: number
}

export function TypingEffect({
  texts,
  typingSpeed = 100,
  deleteSpeed = 50,
  cursorType = "|",
  cursorColor = "white",
  variant = "text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold",
  startDelay = 0,
  onComplete,
  loop = false,
  pauseAfterTyping = 2000,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    // 커서 깜빡임 효과
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (isComplete) return

    const currentText = texts[currentIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // 타이핑 중
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1))
          } else {
            // 현재 문장 타이핑 완료
            if (loop) {
              // 루프 모드: 잠시 대기 후 삭제 시작
              setTimeout(() => {
                setIsDeleting(true)
              }, pauseAfterTyping)
            } else {
              // 루프 없음: 마지막 문장이면 완료
              if (currentIndex === texts.length - 1) {
                setIsComplete(true)
                onComplete?.()
              } else {
                // 다음 문장으로
                setTimeout(() => {
                  setIsDeleting(true)
                }, pauseAfterTyping)
              }
            }
          }
        } else {
          // 삭제 중
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            // 삭제 완료, 다음 문장으로
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      displayText.length === 0 && !isDeleting ? startDelay : isDeleting ? deleteSpeed : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [
    displayText,
    isDeleting,
    currentIndex,
    texts,
    typingSpeed,
    deleteSpeed,
    startDelay,
    loop,
    pauseAfterTyping,
    onComplete,
    isComplete,
  ])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center"
    >
      <span className={variant}>
        {displayText}
        <span
          className="inline-block ml-1"
          style={{
            color: cursorColor,
            opacity: showCursor ? 1 : 0,
            transition: "opacity 0.1s",
          }}
        >
          {cursorType}
        </span>
      </span>
    </motion.div>
  )
}
