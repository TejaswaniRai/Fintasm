"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBudget } from "./budget-context"
import { toast } from "@/components/ui/use-toast"

interface GoalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function GoalModal({ open, onOpenChange }: GoalModalProps) {
  const { addGoal } = useBudget()
  const [formData, setFormData] = useState({
    title: "",
    target: "",
    deadline: "",
    category: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.target || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    addGoal({
      title: formData.title,
      target: Number.parseInt(formData.target),
      current: 0,
      deadline: formData.deadline,
      category: formData.category,
    })

    // Trigger money animation for new goal
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent("moneyAnimation"))
    }

    toast({
      title: "Goal Created! 🎯",
      description: `${formData.title} has been added to your goals. +100 XP earned!`,
    })

    setFormData({ title: "", target: "", deadline: "", category: "" })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-effect border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">🎯 Set New Goal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., New Gaming Setup"
              className="glass-effect border-white/20 text-white"
            />
          </div>

          <div>
            <Label htmlFor="target">Target Amount (₹)</Label>
            <Input
              id="target"
              type="number"
              value={formData.target}
              onChange={(e) => setFormData((prev) => ({ ...prev, target: e.target.value }))}
              placeholder="e.g., 120000"
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
                <SelectItem value="gaming">🎮 Gaming</SelectItem>
                <SelectItem value="travel">🏖️ Travel</SelectItem>
                <SelectItem value="gadgets">📱 Gadgets</SelectItem>
                <SelectItem value="emergency">🛡️ Emergency</SelectItem>
                <SelectItem value="education">📚 Education</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="deadline">Deadline (Optional)</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
              className="glass-effect border-white/20 text-white"
            />
          </div>

          <Button type="submit" className="w-full gradient-purple-cyan text-white neon-glow">
            Create Goal
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
