"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useBudget } from "@/components/budget-context"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Analytics } from "@vercel/analytics/next"
import {
  Moon,
  Sun,
  Target,
  TrendingUp,
  Plus,
  BarChart3,
  Trophy,
  Zap,
  Award,
  MessageSquare,
  Sparkles,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import AchievementModal from "@/components/achievement-modal"
import GoalModal from "@/components/goal-modal"
import IncomeModal from "@/components/income-modal"
import BreakdownModal from "@/components/breakdown-modal"
import AICoachView from "@/components/ai-coach-view"
import LiveInsightsView from "@/components/live-insights-view"
import MoneyAnimation from "@/components/money-animation"
import { useSound } from "@/hooks/use-sound"

type ViewType = "overview" | "goals" | "insights" | "achievements" | "coach"

const MotionButton = motion(Button)

export default function Home() {
  const { user, goals, transactions, addXP, updateGoal } = useBudget()
  const { theme, setTheme } = useTheme()
  const { playSound } = useSound()

  const [mounted, setMounted] = useState(false)
  const [currentView, setCurrentView] = useState<ViewType>("overview")
  const [showAchievements, setShowAchievements] = useState(false)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showIncomeModal, setShowIncomeModal] = useState(false)
  const [showBreakdownModal, setShowBreakdownModal] = useState(false)
  const [showMoneyAnimation, setShowMoneyAnimation] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const savingsGoalProgress = goals.length > 0
    ? (goals.reduce((sum, g) => sum + g.current / g.target, 0) / goals.length) * 100
    : 0

  const achievements = [
    { id: "first-steps", title: "First Steps", description: "Set up your first budget", rarity: "common", icon: "⭐", progress: 100, unlocked: true },
    { id: "streak-saver", title: "Streak Saver", description: "Save money for 7 days in a row", rarity: "rare", icon: "🎯", progress: 77, unlocked: false },
    { id: "budget-master", title: "Budget Master", description: "Stay under budget for 3 months", rarity: "epic", icon: "🏆", progress: 33, unlocked: false },
    { id: "legendary-saver", title: "Legendary Saver", description: "Reach ₹50000 in savings", rarity: "legendary", icon: "💎", progress: 36, unlocked: false },
  ]

  const getRarityColor = (rarity: string) =>
    ({ common: "bg-gray-500", rare: "bg-blue-500", epic: "bg-purple-500", legendary: "bg-yellow-500" }[rarity] || "bg-gray-500")

  const handleAddToGoal = (goalId: string, amount: number) => {
    const goal = goals.find(g => g.id === goalId)
    if (goal) {
      updateGoal(goalId, { current: goal.current + amount })
      addXP(25)
      setShowMoneyAnimation(true)
      toast({ title: "Goal Updated! 🎯", description: `Added ₹${amount.toLocaleString()} to ${goal.title}. +25 XP earned!` })
    }
  }

  function Overview({ user, totalIncome, totalExpenses, savingsGoalProgress }: any) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative overflow-hidden rounded-2xl p-6 glass-effect">
        <div className="absolute inset-0 gradient-purple-cyan opacity-20"></div>
        <div className="relative">
          <h2 className="text-xl font-display text-white mb-2">Every rupee saved is a rupee earned!</h2>
          <div className="text-2xl">💰</div>
        </div>
      </motion.div>

      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-4">
        <div className="gradient-purple-cyan h-2 rounded-full"></div>
        <div className="flex justify-between items-center">
          <span className="text-white font-medium">Level {user.level} • {user.xp} XP</span>
          <div className="text-yellow-400 font-bold">⚡ {user.xp.toLocaleString()}</div>
        </div>
        <Progress value={((user.xp % 500) / 500) * 100} className="h-2" />
        <div className="text-white/70 text-xs">{500 - (user.xp % 500)} XP to next level</div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-effect p-6 border-white/10">
          <p className="text-white/70 text-sm">Monthly Income</p>
          <p className="text-white text-2xl">₹{totalIncome.toLocaleString()}</p>
        </Card>
        <Card className="glass-effect p-6 border-white/10">
          <p className="text-white/70 text-sm">Spent This Month</p>
          <p className="text-white text-2xl">₹{totalExpenses.toLocaleString()}</p>
        </Card>
        <Card className="glass-effect p-6 border-white/10">
          <p className="text-white/70 text-sm">Savings Goal</p>
          <p className="text-white text-2xl">{savingsGoalProgress.toFixed(1)}% complete</p>
          <Progress value={savingsGoalProgress} className="h-2 mt-2" />
        </Card>
      </div>
    </div>
  )
}
function Goals({ goals, handleAddToGoal, playSound }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-white font-display text-xl">Savings Goals 🎯</h2>
      <div className="space-y-4">
        {goals.map((goal: any) => {
          const progress = (goal.current / goal.target) * 100
          return (
            <Card key={goal.id} className="glass-effect p-6 border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white">{goal.title}</h3>
                  <p className="text-white/70 text-sm">{progress.toFixed(1)}% complete</p>
                  <Progress value={progress} className="h-2 mt-1" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => { handleAddToGoal(goal.id, 500); playSound("click") }} size="sm">+₹500</Button>
                  <Button onClick={() => { handleAddToGoal(goal.id, 1000); playSound("click") }} size="sm">+₹1000</Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function Achievements({ achievements, getRarityColor }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-white font-display text-xl">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((a: any) => (
          <Card key={a.id} className={`glass-effect p-6 border-white/10 ${a.unlocked ? "ring-2 ring-yellow-400" : ""}`}>
            <div className="flex items-start space-x-3">
              <div className="text-3xl">{a.icon}</div>
              <div className="flex-1">
                <h3 className="text-white">{a.title}</h3>
                <p className="text-white/70 text-sm">{a.description}</p>
                <Badge className={`${getRarityColor(a.rarity)} text-white text-xs mt-1`}>{a.rarity}</Badge>
                <Progress value={a.progress} className="h-2 mt-2" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="container mx-auto px-4 py-8 pb-24 sm:pb-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-white font-display text-3xl">FINTASM</h1>
            <p className="text-white/70 font-accent">Advanced Finance Tracking</p>
          </div>
          <Button onClick={() => { setTheme(theme === "dark" ? "light" : "dark"); playSound("click") }}
            variant="ghost" size="icon" className="text-white hover:bg-white/10">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Quick actions */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-wrap gap-3 mb-6">
          <Button onClick={() => { setShowGoalModal(true); playSound("click") }} className="gradient-purple-cyan text-white neon-glow flex-1 sm:flex-none">
            <Target className="w-4 h-4 mr-2" /> Set New Goal
          </Button>
          <Button onClick={() => { setShowIncomeModal(true); playSound("click") }} className="gradient-pink-orange text-white neon-glow flex-1 sm:flex-none">
            <Plus className="w-4 h-4 mr-2" /> Add Income
          </Button>
          <Button onClick={() => { setShowBreakdownModal(true); playSound("click") }} className="glass-effect text-white border-white/20 hover:bg-white/10 flex-1 sm:flex-none">
            <BarChart3 className="w-4 h-4 mr-2" /> View Breakdown
          </Button>
          <Button onClick={() => { setShowAchievements(true); playSound("click") }} className="glass-effect text-white border-white/20 hover:bg-white/10 flex-1 sm:flex-none">
            <Trophy className="w-4 h-4 mr-2" /> Achievements
          </Button>
        </motion.div>

        {/* Top nav */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-wrap gap-2 mb-8">
          {[
            { id: "overview", label: "Overview", icon: Award },
            { id: "goals", label: "Goals", icon: Target },
            { id: "insights", label: "Live Insights", icon: TrendingUp },
            { id: "achievements", label: "Achievements", icon: Trophy },
            { id: "coach", label: "AI Coach", icon: MessageSquare },
          ].map(({ id, label, icon: Icon }) => (
            <Button key={id} onClick={() => { setCurrentView(id as ViewType); playSound("click") }}
              variant={currentView === id ? "default" : "ghost"}
              className={`font-medium ${currentView === id ? "bg-white text-black" : "text-white/70 hover:text-white hover:bg-white/10"} flex-1 sm:flex-none`}>
              <Icon className="w-4 h-4 mr-2" /> {label}
            </Button>
          ))}
        </motion.div>

        {/* View */}
        <AnimatePresence mode="wait">
          <motion.div key={currentView} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {currentView === "overview" && <Overview user={user} totalIncome={totalIncome} totalExpenses={totalExpenses} savingsGoalProgress={savingsGoalProgress} />}
            {currentView === "goals" && <Goals goals={goals} handleAddToGoal={handleAddToGoal} playSound={playSound} />}
            {currentView === "achievements" && <Achievements achievements={achievements} getRarityColor={getRarityColor} />}
            {currentView === "insights" && <LiveInsightsView />}
            {currentView === "coach" && <AICoachView />}
          </motion.div>
        </AnimatePresence>

        {/* Bottom nav */}
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 p-4 z-40">
          <div className="flex justify-around">
            {[
              { id: "overview", icon: Award, label: "Home" },
              { id: "goals", icon: Target, label: "Goals" },
              { id: "coach", icon: MessageSquare, label: "AI Coach" },
              { id: "achievements", icon: Trophy, label: "Rewards", badge: "2" },
            ].map(({ id, icon: Icon, label, badge }) => (
              <MotionButton key={id} whileTap={{ scale: 0.95 }} onClick={() => { setCurrentView(id as ViewType); playSound("click") }}
                variant="ghost"
                className={`flex flex-col items-center space-y-1 relative p-2 rounded-lg ${currentView === id ? "text-blue-400 bg-white/10" : "text-white/70 hover:bg-white/5"}`}>
                <Icon className="w-5 h-5" />
                <span className="text-xs">{label}</span>
                {badge && <Badge className="absolute -top-1 -right-1 bg-red-500 text-xs">{badge}</Badge>}
              </MotionButton>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <AchievementModal open={showAchievements} onOpenChange={setShowAchievements} achievements={achievements} />
      <GoalModal open={showGoalModal} onOpenChange={setShowGoalModal} />
      <IncomeModal open={showIncomeModal} onOpenChange={setShowIncomeModal} />
      <BreakdownModal open={showBreakdownModal} onOpenChange={setShowBreakdownModal} transactions={transactions} />
      <MoneyAnimation trigger={showMoneyAnimation} onComplete={() => setShowMoneyAnimation(false)} />
    </div>
  )
}

// Include Overview, Goals, Achievements components below ↓
// (For brevity here, but you already have them; if you'd like, say “include full Overview & Goals & Achievements code too” and I’ll paste!)
