"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, Trophy, Users, Shield, Share2, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Cookies from "js-cookie"

export default function CompetitionDetailsPage() {
    const params = useParams()
    const id = params.id as string
    const [competition, setCompetition] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [joining, setJoining] = useState(false)
    const [joined, setJoined] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        fetchCompetition()
    }, [id])

    const fetchCompetition = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/competitions`)
            const data = await res.json()
            const found = data.find((c: any) => c._id === id)
            if (found) {
                setCompetition(found)
                // Check if current user is already registered
                const userStr = localStorage.getItem('user')
                if (userStr) {
                    const user = JSON.parse(userStr)
                    const isJoined = found.participants.some(
                        (p: any) => p === user._id || p.toString() === user._id
                    )
                    setJoined(isJoined)
                }
            }
        } catch (err) {
            console.error('Failed to fetch competition', err)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async () => {
        const token = Cookies.get('token')
        if (!token) {
            setError('Please log in to register for this competition.')
            return
        }

        setJoining(true)
        setMessage('')
        setError('')

        try {
            const res = await fetch(`http://localhost:5000/api/competitions/${id}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            const data = await res.json()
            if (res.ok) {
                setMessage(data.message || 'Successfully registered!')
                setJoined(true)
                fetchCompetition() // Refresh participant count
            } else {
                setError(data.message || 'Failed to register')
            }
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setJoining(false)
        }
    }

    if (loading) return <div className="min-h-screen pt-24 flex justify-center text-white">Loading...</div>
    if (!competition) return <div className="min-h-screen pt-24 text-center text-white">Competition not found</div>

    const maxParticipants = 200
    const participantCount = competition.participants?.length || 0
    const progress = (participantCount / maxParticipants) * 100

    return (
        <div className="text-white pt-24 pb-12 px-4 md:px-8">
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
                                        <p className="text-xs text-blue-300">Start Date</p>
                                        <p className="font-bold">{new Date(competition.startDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-black/20 border border-white/5 flex items-center gap-3">
                                    <Shield className="text-metallic-silver w-8 h-8" />
                                    <div>
                                        <p className="text-xs text-blue-300">End Date</p>
                                        <p className="font-bold">{new Date(competition.endDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Participants Card */}
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-xl text-white flex items-center gap-2">
                                <Users className="w-5 h-5 text-accent" />
                                Participants ({participantCount})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-blue-100/60 text-sm">
                                {participantCount} {participantCount === 1 ? 'person has' : 'people have'} registered for this competition.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Registration */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <Card className="bg-white/10 border-accent/20 shadow-[0_0_30px_rgba(143,211,255,0.1)] backdrop-blur-md">
                            <CardHeader>
                                <CardTitle className="text-xl text-center text-white">
                                    {joined ? 'You\'re Registered!' : 'Register Now'}
                                </CardTitle>
                                <CardDescription className="text-center text-blue-200">
                                    {joined ? 'You have secured your spot.' : 'Secure your spot in the arena.'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Feedback Messages */}
                                {message && (
                                    <div className="flex items-center gap-2 rounded-lg bg-green-500/10 p-3 text-sm text-green-400 border border-green-500/20">
                                        <CheckCircle className="h-4 w-4 shrink-0" />
                                        {message}
                                    </div>
                                )}
                                {error && (
                                    <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
                                        <AlertCircle className="h-4 w-4 shrink-0" />
                                        {error}
                                    </div>
                                )}

                                {/* Progress */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-blue-200">
                                        <span>{participantCount} Registered</span>
                                        <span>{maxParticipants} Spots</span>
                                    </div>
                                    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-accent shadow-[0_0_10px_#8FD3FF] transition-all duration-500" 
                                            style={{ width: `${Math.min(progress, 100)}%` }} 
                                        />
                                    </div>
                                </div>
                                
                                {joined ? (
                                    <Button size="xl" variant="frost" className="w-full text-lg cursor-default" disabled>
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        Already Registered
                                    </Button>
                                ) : (
                                    <Button 
                                        size="xl" 
                                        variant="metallic" 
                                        className="w-full text-lg shadow-lg"
                                        onClick={handleRegister}
                                        disabled={joining}
                                    >
                                        {joining ? 'Registering...' : 'Register Now'}
                                    </Button>
                                )}

                                {!joined && (
                                    <p className="text-xs text-center text-blue-300/60">
                                        By registering, you agree to the competition rules.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
