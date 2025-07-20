"use client"

import { motion } from "framer-motion"
import { useBudget } from "./budget-context"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Moon, Sun, TrendingUp, Target, Zap } from "lucide-react"
import BudgetChart from "./budget-chart"
import GoalProgress from "./goal-progress"
import XPCounter from "./xp-counter"
import MoodIndicator from "./mood-indicator"
import StreakCalendar from "./streak-calendar"

export default function Dashboard() {
  const { user, goals, transactions } = useBudget()
  const { theme, setTheme } = useTheme()

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">
            Hey {user.name}! {user.avatar}
          </h1>
          <p className="text-white/80">
            Level {user.level} • {user.xp} XP
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <MoodIndicator mood={user.mood} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white hover:bg-white/20"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </motion.div>

      {/* XP Counter */}
      <XPCounter currentXP={user.xp} level={user.level} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <Card className="glass p-6 text-white border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Savings</p>
                <p className="text-2xl font-bold">₹{user.totalSavings.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="glass p-6 text-white border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Savings Rate</p>
                <p className="text-2xl font-bold">{savingsRate.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="glass p-6 text-white border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Streak</p>
                <p className="text-2xl font-bold">{user.streak} days 🔥</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Budget Chart */}
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }}>
        <BudgetChart transactions={transactions} />
      </motion.div>

      {/* Goals Progress */}
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
        <GoalProgress goals={goals} />
      </motion.div>

      {/* Streak Calendar */}
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 }}>
        <StreakCalendar streak={user.streak} />
      </motion.div>

      {/* Badges */}
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
        <Card className="glass p-6 border-white/20">
          <h3 className="text-white font-semibold mb-4">Your Badges</h3>
          <div className="flex space-x-2">
            {user.badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-3xl float-animation"
              >
                {badge}
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
