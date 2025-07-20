"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface WelcomeScreenProps {
  onComplete: () => void
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")

  const steps = [
    {
      title: "Welcome to BudgetBuddy! 🎉",
      subtitle: "Your AI-powered finance companion",
      content: (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl mb-8">
          💰
        </motion.div>
      ),
    },
    {
      title: "What's your name?",
      subtitle: "Let's personalize your experience",
      content: (
        <div className="w-full max-w-sm">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="text-center text-lg glass border-white/30"
          />
        </div>
      ),
    },
    {
      title: `Hey ${name}! 👋`,
      subtitle: "Ready to make budgeting fun?",
      content: (
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="text-6xl mb-8"
        >
          🚀
        </motion.div>
      ),
    },
  ]

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-red-600"
    >
      <div className="text-center text-white p-8 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-4">{steps[step].title}</h1>
            <p className="text-xl mb-8 opacity-90">{steps[step].subtitle}</p>

            <div className="flex justify-center mb-8">{steps[step].content}</div>

            <Button
              onClick={nextStep}
              disabled={step === 1 && !name.trim()}
              className="neon-button bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full"
            >
              {step === steps.length - 1 ? "Let's Go! 🎯" : "Next"}
            </Button>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === step ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
