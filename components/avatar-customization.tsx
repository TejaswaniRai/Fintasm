"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useBudget } from "./budget-context"

const avatarOptions = {
  faces: ["🧑‍💻", "👨‍💼", "👩‍💼", "🧑‍🎓", "👨‍🎨", "👩‍🎨", "🧑‍🚀", "👨‍⚕️", "👩‍⚕️"],
  accessories: ["🕶️", "👓", "🎩", "👑", "🎯", "⚡", "🔥", "💎", "🌟"],
  backgrounds: [
    "gradient-bg",
    "gradient-bg-2",
    "gradient-bg-3",
    "from-purple-600 to-blue-600",
    "from-green-400 to-blue-500",
    "from-pink-500 to-rose-500",
  ],
}

export default function AvatarCustomization() {
  const { user, addXP } = useBudget()
  const [selectedFace, setSelectedFace] = useState(user.avatar)
  const [selectedAccessory, setSelectedAccessory] = useState("🌟")
  const [selectedBackground, setSelectedBackground] = useState("gradient-bg")
  const [unlockedItems, setUnlockedItems] = useState<string[]>(["🧑‍💻", "🌟", "gradient-bg"])

  const isUnlocked = (item: string, category: string) => {
    if (category === "faces") return user.level >= 1
    if (category === "accessories") return user.level >= 3
    if (category === "backgrounds") return user.level >= 5
    return unlockedItems.includes(item)
  }

  const getUnlockLevel = (category: string) => {
    switch (category) {
      case "faces":
        return 1
      case "accessories":
        return 3
      case "backgrounds":
        return 5
      default:
        return 1
    }
  }

  const saveAvatar = () => {
    // In a real app, this would update the user's avatar
    addXP(25)
    // Show success message
  }

  return (
    <div className="p-4 space-y-6">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Card className="glass p-6 border-white/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Avatar Studio</h2>
          <p className="text-white/70">Customize your financial avatar!</p>
        </Card>
      </motion.div>

      {/* Avatar Preview */}
      <Card className="glass p-8 border-white/20">
        <h3 className="text-white font-semibold mb-4 text-center">Preview</h3>
        <div className="flex justify-center">
          <motion.div
            className={`w-32 h-32 rounded-full bg-gradient-to-r ${selectedBackground} flex items-center justify-center relative`}
            whileHover={{ scale: 1.05 }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-6xl">{selectedFace}</span>
            <span className="absolute -top-2 -right-2 text-2xl">{selectedAccessory}</span>
          </motion.div>
        </div>

        <div className="text-center mt-4">
          <p className="text-white font-semibold">
            Level {user.level} {user.name}
          </p>
          <p className="text-white/70 text-sm">{user.xp} XP</p>
        </div>
      </Card>

      {/* Face Selection */}
      <Card className="glass p-6 border-white/20">
        <h3 className="text-white font-semibold mb-4">Choose Face</h3>
        <div className="grid grid-cols-3 gap-3">
          {avatarOptions.faces.map((face, index) => (
            <motion.button
              key={face}
              onClick={() => isUnlocked(face, "faces") && setSelectedFace(face)}
              className={`
                p-4 rounded-lg text-3xl transition-all duration-200
                ${
                  selectedFace === face
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-110"
                    : isUnlocked(face, "faces")
                      ? "bg-white/20 hover:bg-white/30"
                      : "bg-white/5 opacity-50 cursor-not-allowed"
                }
              `}
              whileHover={isUnlocked(face, "faces") ? { scale: 1.1 } : {}}
              whileTap={isUnlocked(face, "faces") ? { scale: 0.95 } : {}}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {isUnlocked(face, "faces") ? face : "🔒"}
              {!isUnlocked(face, "faces") && (
                <div className="text-xs text-white/70 mt-1">Lvl {getUnlockLevel("faces")}</div>
              )}
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Accessories */}
      <Card className="glass p-6 border-white/20">
        <h3 className="text-white font-semibold mb-4">Accessories</h3>
        <div className="grid grid-cols-3 gap-3">
          {avatarOptions.accessories.map((accessory, index) => (
            <motion.button
              key={accessory}
              onClick={() => isUnlocked(accessory, "accessories") && setSelectedAccessory(accessory)}
              className={`
                p-4 rounded-lg text-3xl transition-all duration-200
                ${
                  selectedAccessory === accessory
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 scale-110"
                    : isUnlocked(accessory, "accessories")
                      ? "bg-white/20 hover:bg-white/30"
                      : "bg-white/5 opacity-50 cursor-not-allowed"
                }
              `}
              whileHover={isUnlocked(accessory, "accessories") ? { scale: 1.1 } : {}}
              whileTap={isUnlocked(accessory, "accessories") ? { scale: 0.95 } : {}}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {isUnlocked(accessory, "accessories") ? accessory : "🔒"}
              {!isUnlocked(accessory, "accessories") && (
                <div className="text-xs text-white/70 mt-1">Lvl {getUnlockLevel("accessories")}</div>
              )}
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Backgrounds */}
      <Card className="glass p-6 border-white/20">
        <h3 className="text-white font-semibold mb-4">Backgrounds</h3>
        <div className="grid grid-cols-2 gap-3">
          {avatarOptions.backgrounds.map((bg, index) => (
            <motion.button
              key={bg}
              onClick={() => isUnlocked(bg, "backgrounds") && setSelectedBackground(bg)}
              className={`
                h-16 rounded-lg bg-gradient-to-r ${bg} relative overflow-hidden
                ${
                  selectedBackground === bg
                    ? "ring-4 ring-white scale-105"
                    : isUnlocked(bg, "backgrounds")
                      ? "hover:scale-105"
                      : "opacity-50 cursor-not-allowed"
                }
              `}
              whileHover={isUnlocked(bg, "backgrounds") ? { scale: 1.05 } : {}}
              whileTap={isUnlocked(bg, "backgrounds") ? { scale: 0.95 } : {}}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {!isUnlocked(bg, "backgrounds") && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center text-white">
                    <div className="text-2xl">🔒</div>
                    <div className="text-xs">Lvl {getUnlockLevel("backgrounds")}</div>
                  </div>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <Button
        onClick={saveAvatar}
        className="w-full neon-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4"
      >
        Save Avatar (+25 XP) ✨
      </Button>

      {/* Unlock Progress */}
      <Card className="glass p-6 border-white/20">
        <h3 className="text-white font-semibold mb-4">Unlock Progress</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-white/70">More Faces</span>
            <span className="text-white">Level 1 ✅</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">Accessories</span>
            <span className={user.level >= 3 ? "text-green-400" : "text-white/50"}>
              Level 3 {user.level >= 3 ? "✅" : "🔒"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">Backgrounds</span>
            <span className={user.level >= 5 ? "text-green-400" : "text-white/50"}>
              Level 5 {user.level >= 5 ? "✅" : "🔒"}
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}
