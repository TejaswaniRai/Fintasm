"use client"

import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Achievement {
  id: string
  title: string
  description: string
  rarity: string
  icon: string
  progress: number
  unlocked: boolean
}

interface AchievementModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  achievements: Achievement[]
}

export default function AchievementModal({ open, onOpenChange, achievements }: AchievementModalProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-effect border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">🏆 Achievements</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-effect p-4 rounded-lg border-white/10 ${
                achievement.unlocked ? "ring-2 ring-yellow-400" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <Badge className={`${getRarityColor(achievement.rarity)} text-white text-xs`}>
                      {achievement.rarity}
                    </Badge>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{achievement.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">{achievement.progress}% complete</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
