"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface Transaction {
  id: string
  amount: number
  category: string
  description: string
  date: string
  type: "income" | "expense"
}

interface BudgetChartProps {
  transactions: Transaction[]
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00", "#ff00ff"]

export default function BudgetChart({ transactions }: BudgetChartProps) {
  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
        return acc
      },
      {} as Record<string, number>,
    )

  const pieData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
  }))

  const monthlyData = [
    { month: "Jan", income: 50000, expenses: 35000 },
    { month: "Feb", income: 52000, expenses: 38000 },
    { month: "Mar", income: 48000, expenses: 32000 },
    { month: "Apr", income: 55000, expenses: 40000 },
  ]

  return (
    <div className="space-y-4">
      <Card className="glass p-6 border-white/20">
        <h3 className="text-white font-semibold mb-4">Expense Breakdown</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="glass p-6 border-white/20">
        <h3 className="text-white font-semibold mb-4">Monthly Trends</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
            <YAxis stroke="rgba(255,255,255,0.7)" />
            <Tooltip
              formatter={(value: number) => `₹${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="income" fill="#4ade80" />
            <Bar dataKey="expenses" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
