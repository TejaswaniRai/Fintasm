"use client"

import { motion } from "framer-motion"

interface MoodIndicatorProps {
  mood: "happy" | "neutral" | "sad"
}

export default function MoodIndicator({ mood }: MoodIndicatorProps) {
  const getMoodData = (mood: string) => {
    switch (mood) {
      case "happy":
        return { emoji: "😊", color: "text-green-400", message: "Great spending!" }
      case "neutral":
        return { emoji: "😐", color: "text-yellow-400", message: "Watch your budget" }
      case "sad":
        return { emoji: "😢", color: "text-red-400", message: "Overspending alert!" }
      default:
        return { emoji: "😊", color: "text-green-400", message: "Great spending!" }
    }
  }

  const moodData = getMoodData(mood)

  return (
    <motion.div
      className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="text-2xl"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        {moodData.emoji}
      </motion.span>
      <span className={`text-sm font-medium ${moodData.color}`}>{moodData.message}</span>
    </motion.div>
  )
}
