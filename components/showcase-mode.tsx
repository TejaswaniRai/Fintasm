"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Play, Pause } from "lucide-react"

interface ShowcaseModeProps {
  onClose: () => void
}

const showcaseSteps = [
  {
    title: "Welcome to BudgetBuddy! 🎉",
    description: "Your AI-powered finance companion for Gen Z",
    duration: 3000,
  },
  {
    title: "Gamified Savings Goals 🎯",
    description: "Track your progress with beautiful visualizations and earn XP",
    duration: 4000,
  },
  {
    title: "AI Finance Coach 🤖",
    description: "Get personalized advice and insights about your spending",
    duration: 4000,
  },
  {
    title: "Fun Challenges 🎲",
    description: "Spin the wheel for money-saving challenges and rewards",
    duration: 4000,
  },
  {
    title: "Avatar Customization 👤",
    description: "Unlock new avatars and accessories as you level up",
    duration: 4000,
  },
  {
    title: "Real-time Insights 📊",
    description: "Beautiful charts and mood indicators for your financial health",
    duration: 4000,
  },
  {
    title: "Streak Tracking 🔥",
    description: "Build healthy financial habits with daily streak tracking",
    duration: 4000,
  },
  {
    title: "Dark/Light Mode 🌙",
    description: "Switch between themes for the perfect experience",
    duration: 3000,
  },
]

export default function ShowcaseMode({ onClose }: ShowcaseModeProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const stepDuration = showcaseSteps[currentStep].duration
    const interval = 50 // Update every 50ms
    const increment = (interval / stepDuration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStep < showcaseSteps.length - 1) {
            setCurrentStep((prev) => prev + 1)
            return 0
          } else {
            setIsPlaying(false)
            return 100
          }
        }
        return prev + increment
      })
    }, interval)

    return () => clearInterval(timer)
  }, [currentStep, isPlaying])

  const nextStep = () => {
    if (currentStep < showcaseSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setProgress(0)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      setProgress(0)
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 z-50 flex items-center justify-center p-4"
    >
      {/* Close button */}
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="max-w-2xl w-full text-center">
        {/* Main showcase content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass p-12 border-white/20 mb-8">
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {currentStep === 0 && "🎉"}
                {currentStep === 1 && "🎯"}
                {currentStep === 2 && "🤖"}
                {currentStep === 3 && "🎲"}
                {currentStep === 4 && "👤"}
                {currentStep === 5 && "📊"}
                {currentStep === 6 && "🔥"}
                {currentStep === 7 && "🌙"}
              </motion.div>

              <h1 className="text-4xl font-bold text-white mb-4">{showcaseSteps[currentStep].title}</h1>
              <p className="text-xl text-white/80 mb-8">{showcaseSteps[currentStep].description}</p>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <motion.div className="bg-white/10 rounded-lg p-4" whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl mb-2">💰</div>
                  <p className="text-white text-sm">Indian Currency</p>
                </motion.div>
                <motion.div className="bg-white/10 rounded-lg p-4" whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl mb-2">📱</div>
                  <p className="text-white text-sm">Mobile First</p>
                </motion.div>
                <motion.div className="bg-white/10 rounded-lg p-4" whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl mb-2">🎮</div>
                  <p className="text-white text-sm">Gamified</p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="bg-white/20 rounded-full h-2 mb-2">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-white/70 text-sm">
            Step {currentStep + 1} of {showcaseSteps.length}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center space-x-4">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
            className="glass border-white/20 text-white hover:bg-white/20 bg-transparent"
          >
            Previous
          </Button>

          <Button onClick={togglePlayPause} className="neon-button bg-white/20 hover:bg-white/30 text-white">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button
            onClick={nextStep}
            disabled={currentStep === showcaseSteps.length - 1}
            variant="outline"
            className="glass border-white/20 text-white hover:bg-white/20 bg-transparent"
          >
            Next
          </Button>
        </div>

        {/* Skip to app */}
        <Button
          onClick={onClose}
          className="mt-6 neon-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-3"
        >
          Start Using BudgetBuddy! 🚀
        </Button>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
