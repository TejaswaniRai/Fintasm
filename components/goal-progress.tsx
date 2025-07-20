/*"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Goal {
  id: string
  title: string
  target: number
  current: number
  deadline: string
  category: string
}

interface GoalProgressProps {
  goals: Goal[]
}

export default function GoalProgress({ goals }: GoalProgressProps) {
  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      gadgets: "📱",
      travel: "✈️",
      savings: "💰",
      education: "📚",
      health: "🏥",
    }
    return emojis[category] || "🎯"
  }

  return (
    <Card className="glass p-6 border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">Savings Goals</h3>
        <Button size="sm" className="neon-button bg-white/20 hover:bg-white/30 text-white">
          <Plus className="h-4 w-4 mr-1" />
          Add Goal
        </Button>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100
          const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

          return (
            <motion.div
              key={goal.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getCategoryEmoji(goal.category)}</span>
                  <div>
                    <h4 className="text-white font-medium">{goal.title}</h4>
                    <p className="text-white/70 text-sm">{daysLeft} days left</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">₹{goal.current.toLocaleString()}</p>
                  <p className="text-white/70 text-sm">of ₹{goal.target.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">{progress.toFixed(1)}% complete</span>
                  <span className="text-white/70">₹{(goal.target - goal.current).toLocaleString()} to go</span>
                </div>
              </div>

              {progress >= 100 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2 text-center">
                  <span className="text-2xl">🎉</span>
                  <p className="text-green-400 font-semibold">Goal Achieved!</p>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}
*/
"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Goal {
  id: string
  title: string
  target: number
  current: number
  deadline: string
  category: string
}

interface GoalProgressProps {
  goals: Goal[]
}

export default function GoalProgress({ goals }: GoalProgressProps) {
  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      gadgets: "📱",
      travel: "✈️",
      savings: "💰",
      education: "📚",
      health: "🏥",
    }
    return emojis[category] || "🎯"
  }

  return (
    <Card className="glass p-6 border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">Savings Goals</h3>
        <Button size="sm" className="neon-button bg-white/20 hover:bg-white/30 text-white">
          <Plus className="h-4 w-4 mr-1" />
          Add Goal
        </Button>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => {
          const target = goal.target || 1 // Avoid division by zero
          const progress = (goal.current / target) * 100

          const deadlineDate = new Date(goal.deadline)
          const now = new Date()
          const daysLeft =
            !isNaN(deadlineDate.getTime())
              ? Math.max(Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)), 0)
              : "N/A"

          return (
            <motion.div
              key={goal.id || `${goal.title}-${index}`}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getCategoryEmoji(goal.category)}</span>
                  <div>
                    <h4 className="text-white font-medium">{goal.title}</h4>
                    <p className="text-white/70 text-sm">
                      {typeof daysLeft === "number" ? `${daysLeft} days left` : "No deadline"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">₹{goal.current.toLocaleString()}</p>
                  <p className="text-white/70 text-sm">of ₹{goal.target.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">{progress.toFixed(1)}% complete</span>
                  <span className="text-white/70">₹{Math.max(goal.target - goal.current, 0).toLocaleString()} to go</span>
                </div>
              </div>

              {progress >= 100 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mt-2 text-center"
                >
                  <span className="text-2xl">🎉</span>
                  <p className="text-green-400 font-semibold">Goal Achieved!</p>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}
