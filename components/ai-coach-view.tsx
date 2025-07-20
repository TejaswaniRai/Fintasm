"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Sparkles, Brain } from "lucide-react"
import { useBudget } from "./budget-context"
import { useSound } from "@/hooks/use-sound" // Add this import

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  suggestions?: string[]
}

export default function AICoachView() {
  const { user, goals, transactions, addXP } = useBudget()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Welcome to FINTASM AI Coach! 🤖✨ I'm your personal finance mentor. I can help you optimize your spending, achieve your goals faster, and make smarter financial decisions. What would you like to explore today?`,
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "Analyze my spending patterns",
        "Help me save more money",
        "Optimize my budget",
        "Goal achievement strategies",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { playSound } = useSound() // Initialize useSound hook

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("spending") || lowerMessage.includes("analyze")) {
      const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
      const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
      const spendingRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0

      return {
        text: `📊 **Spending Analysis Complete!**\n\nYour current spending ratio is ${spendingRatio.toFixed(1)}% of your income.\n\n${spendingRatio > 70 ? "⚠️ **Alert**: You're spending quite a lot! Consider the 50/30/20 rule." : "✅ **Good job**: Your spending is under control!"}\n\n**AI Recommendations:**\n• Track daily expenses for better awareness\n• Set spending limits for discretionary categories\n• Use the envelope budgeting method\n• Review subscriptions monthly`,
        suggestions: ["Show me the 50/30/20 rule", "Help me cut expenses", "Set spending alerts"],
      }
    }

    if (lowerMessage.includes("save") || lowerMessage.includes("saving")) {
      return {
        text: `💰 **Smart Saving Strategies**\n\nBased on your Level ${user.level} status, here are personalized tips:\n\n🎯 **Immediate Actions:**\n• Automate ₹5,000 monthly to savings\n• Use the "Pay Yourself First" principle\n• Round up purchases to nearest ₹100\n\n🚀 **Advanced Techniques:**\n• Try the 52-week challenge\n• Invest in SIPs for long-term growth\n• Create separate accounts for each goal\n\nYour current streak of ${user.streak} days shows great discipline! 🔥`,
        suggestions: ["Explain SIP investments", "52-week challenge details", "Automate my savings"],
      }
    }

    if (lowerMessage.includes("goal") || lowerMessage.includes("achieve")) {
      const activeGoals = goals.filter((g) => g.current < g.target)
      const closestGoal = activeGoals[0]

      return {
        text: `🎯 **Goal Achievement Strategy**\n\n${closestGoal ? `Your priority goal: **${closestGoal.title}**\nProgress: ${((closestGoal.current / closestGoal.target) * 100).toFixed(1)}%\n\n` : ""}**AI-Powered Action Plan:**\n\n1. **Break it down**: Divide big goals into weekly targets\n2. **Visual tracking**: Use progress bars for motivation\n3. **Reward milestones**: Celebrate every 25% progress\n4. **Automate contributions**: Set up recurring transfers\n5. **Side hustle**: Consider additional income streams\n\n💡 **Pro Tip**: Goals with deadlines are 42% more likely to be achieved!`,
        suggestions: ["Create milestone rewards", "Find side hustle ideas", "Set up auto-transfers"],
      }
    }

    if (lowerMessage.includes("budget") || lowerMessage.includes("optimize")) {
      return {
        text: `📈 **Budget Optimization Report**\n\n**Current Status**: ${user.mood === "happy" ? "Excellent financial health! 🌟" : "Room for improvement 📊"}\n\n**AI Recommendations:**\n\n🔍 **Expense Categories to Review:**\n• Food & Dining (avg. 25% of income)\n• Entertainment (should be <10%)\n• Shopping (impulse purchases)\n\n⚡ **Quick Wins:**\n• Cook at home 3x more per week = Save ₹8,000/month\n• Cancel unused subscriptions = Save ₹2,000/month\n• Use public transport 2 days/week = Save ₹3,000/month\n\n🎯 **Total Potential Savings**: ₹13,000/month!`,
        suggestions: ["Show cooking savings calculator", "Find unused subscriptions", "Public transport routes"],
      }
    }

    if (lowerMessage.includes("investment") || lowerMessage.includes("sip")) {
      return {
        text: `📈 **Investment Guidance**\n\n**SIP (Systematic Investment Plan) Basics:**\n\nSIPs are perfect for beginners! Here's why:\n\n✅ **Benefits:**\n• Start with just ₹500/month\n• Rupee cost averaging reduces risk\n• Compound growth over time\n• Tax benefits under 80C\n\n🎯 **Recommended Allocation:**\n• 60% Equity funds (long-term growth)\n• 30% Debt funds (stability)\n• 10% Gold/International (diversification)\n\n⚠️ **Important**: This is educational content. Consult a financial advisor for personalized advice.`,
        suggestions: ["Calculate SIP returns", "Find good mutual funds", "Tax saving options"],
      }
    }

    // Default responses with personality
    const responses = [
      {
        text: `🤖 **AI Analysis in Progress...**\n\nBased on your Level ${user.level} profile and ${user.streak}-day streak, you're showing excellent financial discipline!\n\n💡 **Quick Insight**: Users with your XP level (${user.xp}) typically save 23% more than average. Keep up the momentum!\n\nWhat specific area would you like me to dive deeper into?`,
        suggestions: ["Spending analysis", "Investment advice", "Goal planning", "Budget optimization"],
      },
      {
        text: `✨ **FINTASM AI at your service!**\n\nI've analyzed thousands of financial patterns, and here's what I see:\n\n🎯 Your goal completion rate suggests you're a **Strategic Saver**\n💪 Your consistency shows **Strong Discipline**\n🚀 Your XP growth indicates **Learning Mindset**\n\nLet's leverage these strengths to accelerate your financial journey!`,
        suggestions: ["Personality-based tips", "Advanced strategies", "Habit optimization"],
      },
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    playSound("click") // Play sound on send

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
      const response = getAIResponse(inputValue)
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        suggestions: response.suggestions,
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
      addXP(15) // Reward for engaging with AI coach
      playSound("notification") // Play sound on AI response
    }, 2000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    playSound("click") // Play sound on suggestion click
  }

  return (
    <div className="space-y-6">
      {/* AI Coach Header */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Card className="glass-effect p-6 border-white/10">
          <div className="flex items-center space-x-4">
            <div className="gradient-purple-cyan p-4 rounded-2xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-white font-display text-2xl">FINTASM AI Coach</h2>
              <p className="text-white/70 font-accent">Your intelligent finance mentor</p>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-green-500/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Online</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Chat Messages */}
      <Card className="glass-effect border-white/10 min-h-[70vh] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                    message.isUser ? "gradient-blue-purple text-white" : "glass-effect border-white/20 text-white"
                  }`}
                >
                  <div className="whitespace-pre-line font-body">{message.text}</div>
                  <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>

                  {/* AI Suggestions */}
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-white/70">Quick actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            variant="outline"
                            size="sm"
                            className="glass-effect border-white/20 text-white hover:bg-white/20 text-xs"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <div className="flex justify-start">
                <div className="glass-effect border-white/20 p-4 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
                    <span className="text-white/70">AI is thinking...</span>
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-purple-400 rounded-full"
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
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about your finances..."
              className="glass-effect border-white/20 text-white placeholder-white/50 font-body"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="gradient-purple-cyan hover:opacity-90 neon-glow"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
