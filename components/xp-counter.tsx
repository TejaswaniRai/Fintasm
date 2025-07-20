"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface XPCounterProps {
  currentXP: number
  level: number
}

export default function XPCounter({ currentXP, level }: XPCounterProps) {
  const [showXPGain, setShowXPGain] = useState(false)
  const [xpGain, setXPGain] = useState(0)
  const [prevXP, setPrevXP] = useState(currentXP)

  const xpForNextLevel = level * 500
  const xpProgress = ((currentXP % 500) / 500) * 100

  useEffect(() => {
    if (currentXP > prevXP) {
      const gain = currentXP - prevXP
      setXPGain(gain)
      setShowXPGain(true)
      setPrevXP(currentXP)

      setTimeout(() => {
        setShowXPGain(false)
      }, 2000)
    }
  }, [currentXP, prevXP])

  return (
    <Card className="glass p-4 border-white/20 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">Level {level}</h3>
          <p className="text-white/70 text-sm">{currentXP} XP</p>
        </div>
        <div className="text-right">
          <p className="text-white/70 text-sm">Next Level</p>
          <p className="text-white font-semibold">{xpForNextLevel} XP</p>
        </div>
      </div>

      <div className="mt-3">
        <Progress value={xpProgress} className="h-2" />
        <p className="text-white/70 text-xs mt-1">{500 - (currentXP % 500)} XP to next level</p>
      </div>

      <AnimatePresence>
        {showXPGain && (
          <motion.div
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: -50, opacity: 0, scale: 1.2 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 text-yellow-400 font-bold text-lg pointer-events-none"
          >
            +{xpGain} XP
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating XP particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [-10, -20, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </Card>
  )
}
