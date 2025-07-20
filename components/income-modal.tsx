/*"use client"

import type React from "react"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBudget } from "./budget-context"
import { toast } from "@/components/ui/use-toast"

interface IncomeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function IncomeModal({ open, onOpenChange }: IncomeModalProps) {
  const { addTransaction } = useBudget()
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.amount || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    addTransaction({
      amount: Number.parseInt(formData.amount),
      category: formData.category,
      description: formData.description || `${formData.category} income`,
      date: new Date().toISOString().split("T")[0],
      type: "income",
    })

    toast({
      title: "Income Added! 💰",
      description: `₹${Number.parseInt(formData.amount).toLocaleString()} has been added to your income. +10 XP earned!`,
    })

    setFormData({ amount: "", category: "", description: "" })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-effect border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">💰 Add Income</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
              placeholder="e.g., 50000"
              className="glass-effect border-white/20 text-white"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="glass-effect border-white/20 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20 text-white">
                <SelectItem value="salary">💼 Salary</SelectItem>
                <SelectItem value="freelance">💻 Freelance</SelectItem>
                <SelectItem value="business">🏢 Business</SelectItem>
                <SelectItem value="investment">📈 Investment</SelectItem>
                <SelectItem value="other">🔄 Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="e.g., Monthly salary from XYZ Corp"
              className="glass-effect border-white/20 text-white"
            />
          </div>

          <Button type="submit" className="w-full gradient-pink-orange text-white neon-glow">
            Add Income
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
*/
"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBudget } from "./budget-context"
import { toast } from "@/components/ui/use-toast"

interface IncomeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  amount: string
  category: string
  description: string
}

export default function IncomeModal({ open, onOpenChange }: IncomeModalProps) {
  const { addTransaction } = useBudget()
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    category: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.amount || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const amountNumber = Number(formData.amount)

    if (isNaN(amountNumber) || amountNumber <= 0) {
      toast({
        title: "Invalid amount",
        description: "Amount must be a positive number",
        variant: "destructive",
      })
      return
    }

    addTransaction({
      amount: amountNumber,
      category: formData.category,
      description: formData.description || `${formData.category} income`,
      date: new Date().toISOString().split("T")[0],
      type: "income",
    })

    toast({
      title: "Income Added! 💰",
      description: `₹${amountNumber.toLocaleString()} has been added to your income. +10 XP earned!`,
    })

    setFormData({ amount: "", category: "", description: "" })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-effect border-white/20">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">💰 Add Income</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              autoFocus
              value={formData.amount}
              onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
              placeholder="e.g., 50000"
              className="glass-effect border-white/20"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value: string) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="glass-effect border-white/20">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20">
                <SelectItem value="salary">💼 Salary</SelectItem>
                <SelectItem value="freelance">💻 Freelance</SelectItem>
                <SelectItem value="business">🏢 Business</SelectItem>
                <SelectItem value="investment">📈 Investment</SelectItem>
                <SelectItem value="other">🔄 Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="e.g., Monthly salary from XYZ Corp"
              className="glass-effect border-white/20"
            />
          </div>

          <Button type="submit" className="w-full gradient-pink-orange neon-glow">
            Add Income
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
