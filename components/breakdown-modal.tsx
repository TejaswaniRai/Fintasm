"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface Transaction {
  id: string
  amount: number
  category: string
  description: string
  date: string
  type: "income" | "expense"
}

interface BreakdownModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transactions: Transaction[]
}

const COLORS = ["#8B5CF6", "#06B6D4", "#F59E0B", "#EF4444", "#10B981", "#EC4899"]

export default function BreakdownModal({ open, onOpenChange, transactions }: BreakdownModalProps) {
  const incomeData = transactions
    .filter((t) => t.type === "income")
    .reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      },
      {} as Record<string, number>,
    )

  const expenseData = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      },
      {} as Record<string, number>,
    )

  const pieData = Object.entries(incomeData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }))

  const barData = [
    {
      category: "Income",
      amount: Object.values(incomeData).reduce((sum, val) => sum + val, 0),
    },
    {
      category: "Expenses",
      amount: Object.values(expenseData).reduce((sum, val) => sum + val, 0),
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-effect border-white/20 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">📊 Financial Breakdown</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Income Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
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
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="category" stroke="rgba(255,255,255,0.7)" />
                <YAxis stroke="rgba(255,255,255,0.7)" />
                <Tooltip
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="amount" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {transactions.slice(-5).map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center glass-effect p-3 rounded-lg">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-white/70">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
                <div className={`font-semibold ${transaction.type === "income" ? "text-green-400" : "text-red-400"}`}>
                  {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
