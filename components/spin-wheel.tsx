"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useBudget } from "./budget-context"

const challenges = [
  { text: "Skip coffee for 3 days", reward: 50, emoji: "☕" },
  { text: "Cook at home this week", reward: 100, emoji: "🍳" },
  { text: "Use public transport", reward: 75, emoji: "🚌" },
  { text: "No online shopping for 5 days", reward: 150, emoji: "🛒" },
  { text: "Pack lunch for work", reward: 80, emoji: "🥪" },
  { text: "Walk instead of cab", reward: 60, emoji: "🚶" },
  { text: "Cancel unused subscription", reward: 200, emoji: "📱" },
  { text: "DIY instead of buying", reward: 120, emoji: "🔨" },
]

export default function SpinWheel() {
  const { addXP, addBadge } = useBudget()
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<(typeof challenges)[0] | null>(null)
  const [rotation, setRotation] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    const spins = 5 + Math.random() * 5 // 5-10 full rotations
    const finalRotation = rotation + spins * 360 + Math.random() * 360
    setRotation(finalRotation)

    setTimeout(() => {
      const selectedIndex = Math.floor(Math.random() * challenges.length)
      setSelectedChallenge(challenges[selectedIndex])
      setIsSpinning(false)
      setShowConfetti(true)
      addXP(challenges[selectedIndex].reward)

      // Add badge for completing challenges
      if (Math.random() > 0.7) {
        addBadge("🎯")
      }

      setTimeout(() => setShowConfetti(false), 3000)
    }, 3000)
  }

  const acceptChallenge = () => {
    if (selectedChallenge) {
      addXP(selectedChallenge.reward)
      setSelectedChallenge(null)
    }
  }

  return (
    <div className="p-4 space-y-6">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Card className="glass p-6 border-white/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Savings Challenge Wheel</h2>
          <p className="text-white/70">Spin to get a fun money-saving challenge!</p>
        </Card>
      </motion.div>

      {/* Wheel */}
      <div className="flex justify-center">
        <div className="relative">
          <motion.div
            className="w-80 h-80 rounded-full border-8 border-white/30 relative overflow-hidden"
            style={{
              background: `conic-gradient(
                from 0deg,
                #ff6b6b 0deg 45deg,
                #4ecdc4 45deg 90deg,
                #45b7d1 90deg 135deg,
                #96ceb4 135deg 180deg,
                #ffeaa7 180deg 225deg,
                #dda0dd 225deg 270deg,
                #98d8c8 270deg 315deg,
                #f7dc6f 315deg 360deg
              )`,
            }}
            animate={{ rotate: rotation }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            {challenges.map((challenge, index) => {
              const angle = (index * 360) / challenges.length
              return (
                <div
                  key={index}
                  className="absolute w-full h-full flex items-center justify-center text-white font-bold text-sm"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "center",
                  }}
                >
                  <div
                    className="text-center"
                    style={{
                      transform: `rotate(${-angle}deg) translateY(-120px)`,
                    }}
                  >
                    <div className="text-2xl mb-1">{challenge.emoji}</div>
                    <div className="text-xs max-w-16 leading-tight">
                      {challenge.text.split(" ").slice(0, 2).join(" ")}
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
          </div>

          {/* Center button */}
          <Button
            onClick={spinWheel}
            disabled={isSpinning}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full neon-button bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
          >
            {isSpinning ? "🎲" : "SPIN!"}
          </Button>
        </div>
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  y: [-100, -200],
                  x: [0, Math.random() * 200 - 100],
                }}
                transition={{ duration: 2, delay: Math.random() * 0.5 }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Challenge Result */}
      <AnimatePresence>
        {selectedChallenge && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4"
          >
            <Card className="glass p-8 border-white/20 text-center max-w-sm w-full">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl mb-4"
              >
                {selectedChallenge.emoji}
              </motion.div>

              <h3 className="text-white font-bold text-xl mb-2">Challenge Unlocked!</h3>
              <p className="text-white/80 mb-4">{selectedChallenge.text}</p>

              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full mb-6 font-bold">
                +{selectedChallenge.reward} XP Reward!
              </div>

              <div className="space-y-3">
                <Button
                  onClick={acceptChallenge}
                  className="w-full neon-button bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  Accept Challenge! 🎯
                </Button>
                <Button
                  onClick={() => setSelectedChallenge(null)}
                  variant="outline"
                  className="w-full glass border-white/20 text-white hover:bg-white/20"
                >
                  Maybe Later
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Challenge History */}
      <Card className="glass p-6 border-white/20">
        <h3 className="text-white font-semibold mb-4">Recent Challenges</h3>
        <div className="space-y-3">
          {challenges.slice(0, 3).map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between bg-white/10 rounded-lg p-3"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{challenge.emoji}</span>
                <span className="text-white text-sm">{challenge.text}</span>
              </div>
              <div className="text-yellow-400 font-semibold text-sm">+{challenge.reward} XP</div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}
