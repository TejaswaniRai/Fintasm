"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  name: string
  level: number
  xp: number
  totalSavings: number
  streak: number
  badges: string[]
}

interface Goal {
  id: string
  title: string
  target: number
  current: number
  deadline: string
  category: string
}

interface Transaction {
  id: string
  amount: number
  category: string
  description: string
  date: string
  type: "income" | "expense"
}

interface BudgetContextType {
  user: User
  goals: Goal[]
  transactions: Transaction[]
  addGoal: (goal: Omit<Goal, "id">) => void
  updateGoal: (id: string, updates: Partial<Goal>) => void
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  addXP: (amount: number) => void
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined)

const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Gaming Setup",
    target: 120000,
    current: 75000,
    deadline: "2024-12-31",
    category: "gaming",
  },
  {
    id: "2",
    title: "Summer Vacation",
    target: 80000,
    current: 40000,
    deadline: "2024-08-15",
    category: "travel",
  },
  {
    id: "3",
    title: "Emergency Fund",
    target: 200000,
    current: 120000,
    deadline: "2024-06-30",
    category: "emergency",
  },
]

const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 350000,
    category: "salary",
    description: "Monthly salary",
    date: "2024-01-01",
    type: "income",
  },
  {
    id: "2",
    amount: 150000,
    category: "expenses",
    description: "Monthly expenses",
    date: "2024-01-15",
    type: "expense",
  },
]

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({
    name: "Finance Hero",
    level: 5,
    xp: 2750,
    totalSavings: 235000,
    streak: 7,
    badges: ["💰", "🎯", "🔥", "💎"],
  })

  const [goals, setGoals] = useState<Goal[]>(mockGoals)
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)

  useEffect(() => {
    const savedUser = localStorage.getItem("budgetUser")
    const savedGoals = localStorage.getItem("budgetGoals")
    const savedTransactions = localStorage.getItem("budgetTransactions")

    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedGoals) setGoals(JSON.parse(savedGoals))
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions))
  }, [])

  useEffect(() => {
    localStorage.setItem("budgetUser", JSON.stringify(user))
    localStorage.setItem("budgetGoals", JSON.stringify(goals))
    localStorage.setItem("budgetTransactions", JSON.stringify(transactions))
  }, [user, goals, transactions])

  const addGoal = (goal: Omit<Goal, "id">) => {
    const newGoal = { ...goal, id: Date.now().toString() }
    setGoals((prev) => [...prev, newGoal])
    addXP(100)
  }

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals((prev) => prev.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal)))
  }

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = { ...transaction, id: Date.now().toString() }
    setTransactions((prev) => [...prev, newTransaction])
    addXP(10)
  }

  const addXP = (amount: number) => {
    setUser((prev) => {
      const newXP = prev.xp + amount
      const newLevel = Math.floor(newXP / 500) + 1
      return { ...prev, xp: newXP, level: Math.max(newLevel, prev.level) }
    })
  }

  return (
    <BudgetContext.Provider
      value={{
        user,
        goals,
        transactions,
        addGoal,
        updateGoal,
        addTransaction,
        addXP,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}

export const useBudget = () => {
  const context = useContext(BudgetContext)
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider")
  }
  return context
}
