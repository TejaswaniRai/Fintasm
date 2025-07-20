"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface StreakCalendarProps {
  streak: number
}

export default function StreakCalendar({ streak }: StreakCalendarProps) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const weeks = 4

  const generateCalendarData = () => {
    const data = []
    for (let week = 0; week < weeks; week++) {
      const weekData = []
      for (let day = 0; day < 7; day++) {
        const dayIndex = week * 7 + day
        const hasActivity = dayIndex < streak || Math.random() > 0.3
        weekData.push({
          day: dayIndex,
          hasActivity,
          isStreak: dayIndex < streak,
        })
      }
      data.push(weekData)
    }
    return data
  }

  const calendarData = generateCalendarData()

  return (
    <Card className="glass p-6 border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">Savings Streak</h3>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🔥</span>
          <span className="text-white font-bold">{streak} days</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map((day) => (
            <div key={day} className="text-white/70 text-xs font-medium py-1">
              {day}
            </div>
          ))}
        </div>

        {calendarData.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((day, dayIndex) => (
              <motion.div
                key={`${weekIndex}-${dayIndex}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (weekIndex * 7 + dayIndex) * 0.02 }}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-xs font-medium
                  ${
                    day.isStreak
                      ? "bg-gradient-to-r from-orange-400 to-red-500 text-white"
                      : day.hasActivity
                        ? "bg-white/20 text-white"
                        : "bg-white/5 text-white/30"
                  }
                `}
                whileHover={{ scale: 1.1 }}
              >
                {day.isStreak && "🔥"}
                {day.hasActivity && !day.isStreak && "✓"}
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-white/70 text-sm">Keep it up! You're on a {streak}-day streak! 🎯</p>
      </div>
    </Card>
  )
}
