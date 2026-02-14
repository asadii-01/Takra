"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Calendar, Trophy, Users, Shield, Share2, Clock, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock Data (duplicated from main page for now, ideally in a shared store or API)
const mockCompetitions = [
    {
        id: "1",
        title: "Neon City Hackathon",
        description: "Build the future of smart cities in this 48-hour coding marathon. Teams were tasked with creating sustainable, AI-driven solutions for urban living. The event features mentorship from industry leaders and a chance to pitch to top VCs.",
        fullDescription: `
            <p>Welcome to the Neon City Hackathon, where the brightest minds converge to architect the metropolis of tomorrow.</p>
            <h3>The Challenge</h3>
            <p>Participants must design and prototype a solution that addresses one of the following urban challenges:</p>
            <ul>
                <li>Sustainable Energy Management</li>
                <li>AI-driven Traffic Control</li>
                <li>Smart Waste Disposal Systems</li>
            </ul>
            <h3>Rules</h3>
            <p>Teams of 2-4 members. All code must be written during the event. Use of open-source libraries is permitted.</p>
        `,
        startDate: "2026-03-15",
        endDate: "2026-03-17",
        type: "Tech",
        prizePool: "$50,000",
        participants: 145,
        maxParticipants: 200,
        rules: ["Team Size: 2-4", "48 Hours Duration", "Original Code Only"],
        prizes: ["1st Place: $25,000", "2nd Place: $15,000", "3rd Place: $10,000"]
    },
    {
        id: "2",
        title: "Ultimate Gamer's Cup",
        description: "The biggest e-sports tournament of the year.",
        fullDescription: "Compete in Valorant, CS2, and League of Legends. Regional qualifiers lead to the grand finale in the Frost Arena.",
        startDate: "2026-04-01",
        endDate: "2026-04-10",
        type: "Gaming",
        prizePool: "$25,000",
        participants: 890,
        maxParticipants: 1000,
        rules: ["5v5 Teams", "Double Elimination", "Anti-Cheat Required"],
        prizes: ["Winner: $15,000", "Runner-up: $7,000", "MVP: $3,000"]
    }
    // Add more mocks matching the main page as needed
]

export default function CompetitionDetailsPage() {
    const params = useParams()
    const id = params.id as string
    const [competition, setCompetition] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate API fetch
        const found = mockCompetitions.find((c) => c.id === id)
        if (found) {
            setCompetition(found)
        }
        setLoading(false)
    }, [id])

    if (loading) return <div className="min-h-screen pt-24 flex justify-center text-white">Loading...</div>
    if (!competition) return <div className="min-h-screen pt-24 text-center text-white">Competition not found</div>

    const progress = (competition.participants / competition.maxParticipants) * 100

    return (
        <div className="min-h-screen bg-[#0F1C2E] text-white pt-24 pb-12 px-4 md:px-8">
            {/* Hero / Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <Link href="/competitions" className="text-blue-300 hover:text-white mb-4 inline-block">&larr; Back to Competitions</Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-2">
                            {competition.type}
                        </span>
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-heading font-bold uppercase metallic-text"
                        >
                            {competition.title}
                        </motion.h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="text-blue-200 border-blue-200/20 hover:text-white">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Overview Card */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl text-white">Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-blue-100/80 text-lg leading-relaxed">{competition.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                                <div className="p-4 rounded-lg bg-black/20 border border-white/5 flex items-center gap-3">
                                    <Trophy className="text-yellow-400 w-8 h-8" />
                                    <div>
                                        <p className="text-xs text-blue-300">Prize Pool</p>
                                        <p className="font-bold text-lg">{competition.prizePool}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-black/20 border border-white/5 flex items-center gap-3">
                                    <Calendar className="text-accent w-8 h-8" />
                                    <div>
                                        <p className="text-xs text-blue-300">Dates</p>
                                        <p className="font-bold">{new Date(competition.startDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-black/20 border border-white/5 flex items-center gap-3">
                                    <Shield className="text-metallic-silver w-8 h-8" />
                                    <div>
                                        <p className="text-xs text-blue-300">Format</p>
                                        <p className="font-bold">Online</p>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none pt-4 border-t border-white/10" dangerouslySetInnerHTML={{ __html: competition.fullDescription }} />
                        </CardContent>
                    </Card>

                    {/* Prizes & Rules */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader><CardTitle className="text-xl text-white">Prizes</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {competition.prizes?.map((prize: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2 text-blue-100">
                                            <Trophy className="w-4 h-4 text-yellow-500" /> {prize}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader><CardTitle className="text-xl text-white">Rules</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {competition.rules?.map((rule: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2 text-blue-100">
                                            <CheckCircle className="w-4 h-4 text-green-400" /> {rule}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right Column: Registration */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <Card className="bg-white/10 border-accent/20 shadow-[0_0_30px_rgba(143,211,255,0.1)] backdrop-blur-md">
                            <CardHeader>
                                <CardTitle className="text-xl text-center text-white">Registration Closing Soon</CardTitle>
                                <CardDescription className="text-center text-blue-200">
                                    Secure your spot in the arena.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Countdown Placeholder - reuse component or simple text */}
                                <div className="flex justify-center gap-4 text-center">
                                    <div className="bg-black/30 p-2 rounded w-16">
                                        <span className="block text-2xl font-bold font-heading text-white">02</span>
                                        <span className="text-xs text-blue-300">Days</span>
                                    </div>
                                    <div className="bg-black/30 p-2 rounded w-16">
                                        <span className="block text-2xl font-bold font-heading text-white">14</span>
                                        <span className="text-xs text-blue-300">Hours</span>
                                    </div>
                                    <div className="bg-black/30 p-2 rounded w-16">
                                        <span className="block text-2xl font-bold font-heading text-white">35</span>
                                        <span className="text-xs text-blue-300">Mins</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-blue-200">
                                        <span>{competition.participants} Registered</span>
                                        <span>{competition.maxParticipants} Spots</span>
                                    </div>
                                    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-accent shadow-[0_0_10px_#8FD3FF]" 
                                            style={{ width: `${progress}%` }} 
                                        />
                                    </div>
                                </div>
                                
                                <Button size="xl" variant="metallic" className="w-full text-lg shadow-lg animate-pulse">
                                    Register Now
                                </Button>
                                <p className="text-xs text-center text-blue-300/60">
                                    By registering, you agree to the competition rules.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 border-white/10">
                            <CardHeader>
                                <CardTitle className="text-lg text-white">Admins</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-blue-600"></div>
                                    <div>
                                        <p className="font-bold">System Admin</p>
                                        <p className="text-xs text-blue-300">Competition Organizer</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
