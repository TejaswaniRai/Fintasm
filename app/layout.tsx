/*import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron, Exo_2, Rajdhani, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BudgetProvider } from "@/components/budget-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
})
const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-exo2",
})
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "FINTASM - Advanced Finance Tracker",
  description: "Professional budget tracking with gamification and AI insights",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} ${exo2.variable} ${rajdhani.variable} ${spaceGrotesk.variable} font-space-grotesk`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <BudgetProvider>
            {children}
            <Toaster />
          </BudgetProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
*/
import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron, Exo_2, Rajdhani, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BudgetProvider } from "@/components/budget-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
})
const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-exo2",
})
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "FINTASM - Advanced Finance Tracker",
  description: "Professional budget tracking with gamification and AI insights",
  // generator: 'v0.dev'    ✅ removed to look hand-crafted
  authors: [{ name: "Your Name or Team" }],
  keywords: ["finance", "budget", "gamification", "AI", "Gen Z"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} ${exo2.variable} ${rajdhani.variable} ${spaceGrotesk.variable} font-space-grotesk`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <BudgetProvider>
            {children}
            <Toaster />
          </BudgetProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

