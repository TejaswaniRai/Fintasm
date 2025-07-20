"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useBudget } from "@/components/budget-context"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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

export default function Home() {
  const { user, goals, transactions, addXP, updateGoal } = useBudget()
  const { theme, setTheme } = useTheme()
  const [currentView, setCurrentView] = useState<ViewType>("overview")
  const [showAchievements, setShowAchievements] = useState(false)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showIncomeModal, setShowIncomeModal] = useState(false)
  const [showBreakdownModal, setShowBreakdownModal] = useState(false)
  const [showMoneyAnimation, setShowMoneyAnimation] = useState(false)
  const { playSound } = useSound()

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const savingsGoalProgress =
    goals.length > 0 ? (goals.reduce((sum, g) => sum + g.current / g.target, 0) / goals.length) * 100 : 0

  const achievements = [
    {
      id: "first-steps",
      title: "First Steps",
      description: "Set up your first budget",
      rarity: "common",
      icon: "⭐",
      progress: 100,
      unlocked: true,
    },
    {
      id: "streak-saver",
      title: "Streak Saver",
      description: "Save money for 7 days in a row",
      rarity: "rare",
      icon: "🎯",
      progress: 77,
      unlocked: false,
    },
    {
      id: "budget-master",
      title: "Budget Master",
      description: "Stay under budget for 3 months",
      rarity: "epic",
      icon: "🏆",
      progress: 33,
      unlocked: false,
    },
    {
      id: "legendary-saver",
      title: "Legendary Saver",
      description: "Reach ₹50000 in savings",
      rarity: "legendary",
      icon: "💎",
      progress: 36,
      unlocked: false,
    },
  ]

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

  const handleAddToGoal = (goalId: string, amount: number) => {
    const goal = goals.find((g) => g.id === goalId)
    if (goal) {
      updateGoal(goalId, { current: goal.current + amount })
      addXP(25)
      setShowMoneyAnimation(true) // Trigger money animation
      toast({
        title: "Goal Updated! 🎯",
        description: `Added ₹${amount.toLocaleString()} to ${goal.title}. +25 XP earned!`,
      })
    }
  }

  const renderTopActions = () => (
    <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-wrap gap-3 mb-6">
      <Button
        onClick={() => {
          setShowGoalModal(true)
          playSound("click")
        }}
        className="gradient-purple-cyan text-white font-medium neon-glow flex-1 sm:flex-none"
      >
        <Target className="w-4 h-4 mr-2" />
        Set New Goal
      </Button>
      <Button
        onClick={() => {
          setShowIncomeModal(true)
          playSound("click")
        }}
        className="gradient-pink-orange text-white font-medium neon-glow flex-1 sm:flex-none"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Income
      </Button>
      <Button
        onClick={() => {
          setShowBreakdownModal(true)
          playSound("click")
        }}
        className="glass-effect text-white font-medium border-white/20 hover:bg-white/10 flex-1 sm:flex-none"
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        View Breakdown
      </Button>
      <Button
        onClick={() => {
          setShowAchievements(true)
          playSound("click")
        }}
        className="glass-effect text-white font-medium border-white/20 hover:bg-white/10 flex-1 sm:flex-none"
      >
        <Trophy className="w-4 h-4 mr-2" />
        Achievements
      </Button>
    </motion.div>
  )

  const renderNavigation = () => (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-wrap gap-2 mb-8">
      {[
        { id: "overview", label: "Overview", icon: Award }, // Changed icon to Award
        { id: "goals", label: "Goals", icon: Target },
        { id: "insights", label: "Live Insights", icon: TrendingUp },
        { id: "achievements", label: "Achievements", icon: Trophy },
        { id: "coach", label: "AI Coach", icon: MessageSquare },
      ].map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          onClick={() => {
            setCurrentView(id as ViewType)
            playSound("click")
          }}
          variant={currentView === id ? "default" : "ghost"}
          className={`font-medium ${
            currentView === id ? "bg-white text-black" : "text-white/70 hover:text-white hover:bg-white/10"
          } flex-1 sm:flex-none`}
          aria-current={currentView === id ? "page" : undefined}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </Button>
      ))}
    </motion.div>
  )

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Motivational Quote */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative overflow-hidden rounded-2xl p-6 glass-effect"
      >
        <div className="absolute inset-0 gradient-purple-cyan opacity-20"></div>
        <div className="relative">
          <h2 className="text-xl font-display text-white mb-2">Every rupee saved is a rupee earned!</h2>
          <div className="text-2xl" role="img" aria-label="Money bag emoji">
            💰
          </div>
        </div>
      </motion.div>

      {/* Level Progress */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="gradient-purple-cyan h-2 rounded-full"></div>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span className="text-white font-medium">
            Level {user.level} • {user.xp} XP
          </span>
          <div className="flex items-center space-x-4">
            <div className="glass-effect p-2 rounded-lg">
              <Zap className="w-5 h-5 text-yellow-400" aria-hidden="true" />
              <span className="sr-only">XP icon</span>
            </div>
            <div className="text-right">
              <div className="text-white font-display text-lg">Level {user.level}</div>
              <div className="text-white/70 text-sm">Finance Hero</div>
            </div>
            <div className="text-right">
              <div className="text-yellow-400 font-bold">⚡ {user.xp.toLocaleString()}</div>
              <div className="text-white/70 text-sm">Total XP</div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Progress to Level {user.level + 1}</span>
            <span className="text-yellow-400" role="img" aria-label="Star emoji">
              ⭐ Keep going!
            </span>
          </div>
          <Progress value={((user.xp % 500) / 500) * 100} className="h-2" />
          <div className="text-white/70 text-xs">{500 - (user.xp % 500)} XP to next level</div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="glass-effect p-6 border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-white/70 text-sm font-medium">Monthly Income</p>
                <p className="text-white text-2xl font-display">₹{totalIncome.toLocaleString()}</p>
              </div>
              <div className="gradient-green-blue p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" aria-hidden="true" />
                <span className="sr-only">Trending up icon</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="glass-effect p-6 border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-white/70 text-sm font-medium">Spent This Month</p>
                <p className="text-white text-2xl font-display">₹{totalExpenses.toLocaleString()}</p>
                <p className="text-orange-400 text-sm">
                  {totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(1) : 0}% of income
                </p>
              </div>
              <div className="gradient-yellow-red p-2 rounded-lg">
                <BarChart3 className="w-5 h-5 text-white" aria-hidden="true" />
                <span className="sr-only">Bar chart icon</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <Card className="glass-effect p-6 border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-white/70 text-sm font-medium">Savings Goal</p>
                <p className="text-white text-2xl font-display">{savingsGoalProgress.toFixed(1)}% complete</p>
              </div>
              <div className="gradient-blue-purple p-2 rounded-lg">
                <Target className="w-5 h-5 text-white" aria-hidden="true" />
                <span className="sr-only">Target icon</span>
              </div>
            </div>
            <div className="space-y-2">
              <Progress value={savingsGoalProgress} className="h-2" />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )

  const renderGoals = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center space-x-3">
          <div className="gradient-green-blue p-3 rounded-xl">
            <Target className="w-6 h-6 text-white" aria-hidden="true" />
            <span className="sr-only">Target icon</span>
          </div>
          <div>
            <h2 className="text-white font-display text-xl">Savings Goals 🎯</h2>
            <p className="text-white/70">Track your financial dreams</p>
          </div>
        </div>
        <Button
          onClick={() => {
            setShowGoalModal(true)
            playSound("click")
          }}
          className="gradient-purple-cyan text-white neon-glow"
        >
          <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
          New Goal
        </Button>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100
          const remaining = goal.target - goal.current

          return (
            <motion.div
              key={goal.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect p-6 border-white/10">
                <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl" role="img" aria-label={`${goal.category} emoji`}>
                      {goal.category === "gaming" && "🎮"}
                      {goal.category === "travel" && "🏖️"}
                      {goal.category === "emergency" && "🛡️"}
                      {goal.category === "gadgets" && "📱"}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{goal.title}</h3>
                      <p className="text-white/70 text-sm">
                        {goal.deadline && new Date(goal.deadline) > new Date() ? "Overdue" : "On Track"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-sm">of ₹{goal.target.toLocaleString()}</p>
                    <p className="text-orange-400 font-semibold">₹{remaining.toLocaleString()} to go</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">{progress.toFixed(1)}% complete</span>
                  </div>
                  <Progress value={progress} className="h-3" />

                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <Button
                      onClick={() => {
                        handleAddToGoal(goal.id, 500)
                        playSound("click")
                      }}
                      variant="outline"
                      size="sm"
                      className="glass-effect border-white/20 text-white hover:bg-white/10 flex-1 sm:flex-none"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" aria-hidden="true" />
                      Add ₹500
                    </Button>
                    <Button
                      onClick={() => {
                        handleAddToGoal(goal.id, 1000)
                        addXP(50)
                        playSound("click")
                      }}
                      size="sm"
                      className="gradient-purple-cyan text-white neon-glow flex-1 sm:flex-none"
                    >
                      <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
                      Boost
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-white font-display text-2xl mb-2">Achievements</h2>
        <p className="text-white/70">Your financial milestones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`glass-effect p-6 border-white/10 ${achievement.unlocked ? "ring-2 ring-yellow-400" : ""}`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl" role="img" aria-label={`${achievement.title} icon`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-white font-semibold">{achievement.title}</h3>
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
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="container mx-auto px-4 py-8 pb-24 sm:pb-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-white font-display text-3xl">FINTASM</h1>
            <p className="text-white/70 font-accent">Advanced Finance Tracking</p>
          </div>
          <Button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark")
              playSound("click")
            }}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            aria-label={`Toggle ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        {renderTopActions()}
        {renderNavigation()}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === "overview" && renderOverview()}
            {currentView === "goals" && renderGoals()}
            {currentView === "achievements" && renderAchievements()}
            {currentView === "insights" && <LiveInsightsView />}
            {currentView === "coach" && <AICoachView />}
          </motion.div>
        </AnimatePresence>
        {/* Bottom Navigation */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 p-4 z-40"
        >
          <div className="container mx-auto">
            <div className="flex justify-around sm:justify-center sm:space-x-8">
              {[
                { id: "overview", icon: Award, label: "Home" },
                { id: "goals", icon: Target, label: "Goals" },
                { id: "coach", icon: MessageSquare, label: "AI Coach" },
                { id: "achievements", icon: Trophy, label: "Rewards", badge: "2" },
              ].map(({ id, icon: Icon, label, badge }) => (
                <Button
                  key={id}
                  onClick={() => {
                    setCurrentView(id as ViewType)
                    playSound("click")
                  }}
                  variant="ghost"
                  className={`flex flex-col items-center space-y-1 relative p-2 rounded-lg transition-colors duration-200 ${
                    currentView === id ? "text-blue-400 bg-white/10" : "text-white/70 hover:bg-white/5"
                  }`}
                  aria-current={currentView === id ? "page" : undefined}
                  aria-label={label}
                  whileTap={{ scale: 0.95 }} // Tap feedback
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span className="text-xs font-accent">{label}</span>
                  {badge && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {badge}
                      <span className="sr-only">{badge} new notifications</span>
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
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
