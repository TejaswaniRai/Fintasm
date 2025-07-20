"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Sparkles } from "lucide-react"
import { useBudget } from "./budget-context"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  mood?: string
}

export default function AICoach() {
  const { user, goals, transactions, addXP } = useBudget()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hey ${user.name}! 👋 I'm your AI finance coach. I'm here to help you achieve your financial goals! What would you like to know?`,
      isUser: false,
      timestamp: new Date(),
      mood: "happy",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("save") || lowerMessage.includes("saving")) {
      return `Great question about saving! 💰 Based on your current data, you're saving ₹${(user.totalSavings / 12).toFixed(0)} per month on average. Here are some tips:\n\n• Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings\n• Set up automatic transfers to your savings account\n• Use the "pay yourself first" strategy\n\nYou're doing amazing with your ${user.streak}-day streak! 🔥`
    }

    if (lowerMessage.includes("goal") || lowerMessage.includes("target")) {
      const activeGoals = goals.filter((g) => g.current < g.target)
      return `You have ${activeGoals.length} active goals! 🎯 Your closest goal is "${activeGoals[0]?.title}" - you're ${((activeGoals[0]?.current / activeGoals[0]?.target) * 100).toFixed(1)}% there!\n\nTip: Break down big goals into smaller milestones. It makes them feel more achievable! 💪`
    }

    if (lowerMessage.includes("spend") || lowerMessage.includes("expense")) {
      const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
      return `Let's analyze your spending! 📊 You've spent ₹${totalExpenses.toLocaleString()} recently. Your mood indicator shows you're ${user.mood} about your spending.\n\nQuick tip: Try the 24-hour rule - wait a day before making non-essential purchases! 🤔`
    }

    if (lowerMessage.includes("budget")) {
      return `Your budget looks ${user.mood === "happy" ? "fantastic" : "like it needs some attention"}! 📈\n\nHere's what I recommend:\n• Track every expense for a week\n• Use the envelope method for discretionary spending\n• Review and adjust monthly\n\nRemember: A budget isn't restrictive, it's liberating! 🚀`
    }

    if (lowerMessage.includes("future") || lowerMessage.includes("year")) {
      const yearlyProjection = user.totalSavings * 1.5
      return `Looking into your financial future! 🔮✨\n\nIf you maintain your current savings rate, in one year you could have:\n• ₹${yearlyProjection.toLocaleString()} in savings\n• 2-3 major goals completed\n• Level ${user.level + 3} achieved!\n\nYour future self will thank you! 🙏`
    }

    // Default responses
    const responses = [
      `That's a great question! 🤔 Based on your Level ${user.level} status, you're already doing well. Keep up the momentum!`,
      `Interesting! 💡 With your current ${user.streak}-day streak, you're building excellent financial habits!`,
      `I love your curiosity! 🌟 Your ${user.badges.length} badges show you're committed to financial growth!`,
      `Smart thinking! 🧠 Let's work together to optimize your financial strategy!`,
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
        mood: "happy",
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
      addXP(10) // Reward for engaging with AI coach
    }, 1500)
  }

  const quickQuestions = [
    "How can I save more money?",
    "What's my spending pattern?",
    "Help me with my goals",
    "Show me my future projection",
  ]

  return (
    <div className="p-4 h-screen flex flex-col">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-4">
        <Card className="glass p-4 border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">AI Finance Coach</h2>
              <p className="text-white/70 text-sm">Your personal money mentor</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.isUser
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "glass border-white/20 text-white"
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                <p className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-start">
            <div className="glass border-white/20 p-4 rounded-2xl">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="mb-4">
        <p className="text-white/70 text-sm mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInputValue(question)}
              className="glass border-white/20 text-white hover:bg-white/20 text-xs"
            >
              {question}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask your finance coach anything..."
          className="glass border-white/20 text-white placeholder-white/50"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isTyping}
          className="neon-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
