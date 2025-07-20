"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Activity,
  BarChart3,
} from "lucide-react"
import { useBudget } from "./budget-context"

export default function LiveInsightsView() {
  const { user, goals, transactions } = useBudget()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0
  const monthlyBudget = totalIncome * 0.7 // Assuming 70% for expenses
  const budgetUsed = (totalExpenses / monthlyBudget) * 100

  const insights = [
    {
      id: "spending-trend",
      title: "Spending Velocity",
      description: "Your spending rate compared to last week",
      value: "+12%",
      trend: "up",
      severity: "warning",
      icon: TrendingUp,
      details: "You're spending 12% more than last week. Consider reviewing discretionary expenses.",
    },
    {
      id: "savings-momentum",
      title: "Savings Momentum",
      description: "Goal completion acceleration",
      value: "+8%",
      trend: "up",
      severity: "success",
      icon: Target,
      details: "Excellent! Your savings rate is improving. Keep up the momentum!",
    },
    {
      id: "budget-health",
      title: "Budget Health Score",
      description: "Overall financial wellness",
      value: "87/100",
      trend: "stable",
      severity: "success",
      icon: CheckCircle,
      details: "Your budget is in excellent shape. Minor optimizations can push you to 90+.",
    },
    {
      id: "goal-prediction",
      title: "Goal Achievement Forecast",
      description: "Predicted completion timeline",
      value: "2.3 months",
      trend: "down",
      severity: "info",
      icon: Clock,
      details: "At current pace, you'll achieve your primary goal 0.7 months ahead of schedule!",
    },
  ]

  const liveMetrics = [
    {
      label: "Real-time Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      change: "+2.3%",
      positive: true,
    },
    {
      label: "Budget Utilization",
      value: `${budgetUsed.toFixed(1)}%`,
      change: "+5.1%",
      positive: budgetUsed < 80,
    },
    {
      label: "Goal Velocity",
      value: "₹12,500/week",
      change: "+8.7%",
      positive: true,
    },
    {
      label: "Financial Score",
      value: `${user.level * 17}/100`,
      change: "+3 pts",
      positive: true,
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "text-green-400 bg-green-500/20"
      case "warning":
        return "text-yellow-400 bg-yellow-500/20"
      case "error":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-blue-400 bg-blue-500/20"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "success":
        return CheckCircle
      case "warning":
        return AlertTriangle
      case "error":
        return AlertTriangle
      default:
        return Activity
    }
  }

  return (
    <div className="space-y-6">
      {/* Live Insights Header */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Card className="glass-effect p-6 border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="gradient-green-blue p-4 rounded-2xl">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-white font-display text-2xl">Live Insights</h2>
                <p className="text-white/70 font-accent">Real-time financial intelligence</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-mono text-lg">{currentTime.toLocaleTimeString()}</div>
              <div className="text-white/70 text-sm">{currentTime.toLocaleDateString()}</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Live Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {liveMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-effect p-4 border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 gradient-purple-cyan opacity-10 rounded-full -mr-10 -mt-10"></div>
              <div className="relative">
                <p className="text-white/70 text-sm font-accent">{metric.label}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white text-xl font-display">{metric.value}</span>
                  <div className={`flex items-center space-x-1 ${metric.positive ? "text-green-400" : "text-red-400"}`}>
                    {metric.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI-Powered Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight, index) => {
          const IconComponent = insight.icon
          const SeverityIcon = getSeverityIcon(insight.severity)

          return (
            <motion.div
              key={insight.id}
              initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="glass-effect p-6 border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="gradient-purple-cyan p-3 rounded-xl">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold font-accent">{insight.title}</h3>
                      <Badge className={`${getSeverityColor(insight.severity)} border-0`}>
                        <SeverityIcon className="w-3 h-3 mr-1" />
                        {insight.severity}
                      </Badge>
                    </div>
                    <p className="text-white/70 text-sm mb-3">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-2xl font-display">{insight.value}</span>
                      <div
                        className={`flex items-center space-x-1 ${
                          insight.trend === "up"
                            ? "text-green-400"
                            : insight.trend === "down"
                              ? "text-red-400"
                              : "text-gray-400"
                        }`}
                      >
                        {insight.trend === "up" && <TrendingUp className="w-4 h-4" />}
                        {insight.trend === "down" && <TrendingDown className="w-4 h-4" />}
                        {insight.trend === "stable" && <BarChart3 className="w-4 h-4" />}
                      </div>
                    </div>
                    <p className="text-white/60 text-xs mt-3 font-body">{insight.details}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Real-time Activity Feed */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
        <Card className="glass-effect p-6 border-white/10">
          <h3 className="text-white font-display text-xl mb-4">Live Activity Feed</h3>
          <div className="space-y-3">
            {[
              {
                time: "2 min ago",
                action: "Goal progress updated",
                detail: "Gaming Setup +₹500",
                icon: Target,
                color: "text-green-400",
              },
              {
                time: "15 min ago",
                action: "Spending alert triggered",
                detail: "Food category exceeded 80%",
                icon: AlertTriangle,
                color: "text-yellow-400",
              },
              {
                time: "1 hour ago",
                action: "Achievement unlocked",
                detail: "Streak Saver milestone reached",
                icon: Zap,
                color: "text-purple-400",
              },
              {
                time: "3 hours ago",
                action: "Budget optimization",
                detail: "AI suggested 3 improvements",
                icon: TrendingUp,
                color: "text-blue-400",
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center space-x-3 p-3 glass-effect rounded-lg border-white/5"
              >
                <div className={`p-2 rounded-lg bg-white/10 ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{activity.action}</p>
                  <p className="text-white/70 text-xs">{activity.detail}</p>
                </div>
                <span className="text-white/50 text-xs font-mono">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
