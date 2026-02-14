"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const calculateTimeLeft = (): TimeLeft => {
  const difference = +new Date("2026-03-01") - +new Date()
  let timeLeft: TimeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return timeLeft
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center p-8">
        {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 w-20 md:w-32 h-24 md:h-36 flex items-center justify-center shadow-[0_0_20px_rgba(143,211,255,0.2)]">
                    <motion.span 
                        key={value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-3xl md:text-6xl font-bold font-heading text-white drop-shadow-lg"
                    >
                        {value < 10 ? `0${value}` : value}
                    </motion.span>
                </div>
                <span className="mt-2 text-sm md:text-lg uppercase tracking-widest text-blue-200 font-medium">{unit}</span>
            </div>
        ))}
    </div>
  )
}
