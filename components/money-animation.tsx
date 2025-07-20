"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MoneyAnimationProps {
  trigger: boolean
  onComplete?: () => void
}

export default function MoneyAnimation({ trigger, onComplete }: MoneyAnimationProps) {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    if (trigger) {
      setShowAnimation(true)
      setTimeout(() => {
        setShowAnimation(false)
        onComplete?.()
      }, 2000)
    }
  }, [trigger, onComplete])

  return (
    <AnimatePresence>
      {showAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                scale: 0,
                rotate: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1.2, 0.8],
                rotate: [0, 180, 360],
                y: [-50, -200, -400],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            >
              {["💰", "💵", "🪙", "💸", "🤑"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
