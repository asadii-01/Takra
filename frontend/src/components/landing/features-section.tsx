"use client"

import { FeatureCard } from "./feature-card"
import { MessageSquare, Bot, ShieldCheck, Trophy } from "lucide-react"

const features = [
  {
    title: "Real-time Chat",
    description: "Instantly connect with your support team and other competitors.",
    icon: MessageSquare
  },
  {
    title: "AI Assistance",
    description: "Get 24/7 help from our advanced AI-powered chatbot.",
    icon: Bot
  },
  {
    title: "Secure Registration",
    description: "Bank-grade security for your personal data and payments.",
    icon: ShieldCheck
  },
  {
    title: "Elite Competition",
    description: "Compete with the best talents from around the globe.",
    icon: Trophy
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0F1C2E] to-[#1E3A5F] -z-10" />
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase text-white mb-4">
            Why Join <span className="text-accent">Taakra?</span>
          </h2>
          <p className="text-blue-200/80 max-w-2xl mx-auto">
            Experience a competition platform designed for champions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              {...feature} 
              className="h-full bg-white/5 border-white/10 hover:bg-white/10"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
