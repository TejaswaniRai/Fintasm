"use client"

class SoundManager {
  private static instance: SoundManager
  private sounds: { [key: string]: HTMLAudioElement } = {}
  private enabled = true

  private constructor() {
    if (typeof window !== "undefined") {
      this.initializeSounds()
    }
  }

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager()
    }
    return SoundManager.instance
  }

  private initializeSounds() {
    this.sounds = {
      click: this.createAudio("/placeholder-click.mp3"),
      success: this.createAudio("/placeholder-success.mp3"),
      notification: this.createAudio("/placeholder-notification.mp3"),
    }
  }

  private createAudio(src: string): HTMLAudioElement {
    const audio = new Audio()
    audio.src = src
    return audio
  }

  playSound(key: string) {
    if (!this.enabled || !this.sounds[key]) return

    const sound = this.sounds[key]
    sound.currentTime = 0 // Reset to the beginning
    sound.play().catch((error) => {
      console.warn("Failed to play sound:", key, error)
    })
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  isEnabled(): boolean {
    return this.enabled
  }
}

export default SoundManager
