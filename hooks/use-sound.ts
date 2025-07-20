"use client"

import { useCallback } from "react"
import SoundManager from "@/components/sound-manager"

export function useSound() {
  const soundManager = SoundManager.getInstance()

  const playSound = useCallback(
    (soundName: string) => {
      soundManager.playSound(soundName)
    },
    [soundManager],
  )

  const toggleSound = useCallback(() => {
    soundManager.toggleSound()
  }, [soundManager])

  // Corrected method call from getEnabledState to isEnabled
  const isSoundEnabled = soundManager.isEnabled()

  return { playSound, toggleSound, isSoundEnabled }
}
