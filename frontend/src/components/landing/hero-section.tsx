"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CountdownTimer } from "@/components/ui/countdown-timer"
import Link from "next/link"

export function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])

  return (
    <section className="relative pt-10 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 bg-[url('/images/hero-bg-placeholder.jpg')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/80 via-[#3A6EA5]/50 to-[#EAF4FB]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto space-y-8">
        
        {/* Animated Badge/Emblem Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#C9D6DF] to-[#EAF4FB] shadow-[0_0_30px_rgba(255,255,255,0.5)] border-4 border-white/50 flex items-center justify-center mb-6"
        >
          <img
            src="/images/logo.jpeg"
            alt="Taakra 2026 Logo"
            className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover"
          />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl md:leading-tight font-heading font-bold uppercase tracking-tighter metallic-text drop-shadow-2xl"
        >
          Taakra <span className="text-white">2026</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-2xl text-blue-100 max-w-2xl font-light tracking-wide"
        >
          The Ultimate Winter Competition. Forge Your Legacy.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-6 mt-8"
        >
          <Link href="/register">
            <Button variant="metallic" size="xl" className="text-lg animate-pulse hover:animate-none w-full md:w-auto">
              Register Now
            </Button>
          </Link>
          <Link href="/competitions">
            <Button variant="frost" size="xl" className="text-lg w-full md:w-auto">
              Explore Competitions
            </Button>
          </Link>
        </motion.div>

        {/* Countdown */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.2, duration: 1 }}
           className="mt-16"
        >
            <CountdownTimer />
        </motion.div>
      </div>
      
      {/* Snow Particles (Placeholder for more complex animation) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </section>
  )
}
