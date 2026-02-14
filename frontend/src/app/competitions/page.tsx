"use client"

import { useState, useEffect } from "react"
import { CompetitionFilters } from "@/components/competitions/CompetitionFilters"
import CompetitionCard from "@/components/competitions/CompetitionCard" // Assuming this component is shared/reusable
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Using the same interface as the card for now, or extending it
interface Competition {
  id: string; // Changed from _id to id to match mock data or standardize
  _id?: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: string;
  prizePool: string;
  participants: string[];
}

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [filteredCompetitions, setFilteredCompetitions] = useState<Competition[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    // Determine if we should fetch from API or use mock data for demo
    // For now, let's use mock data to ensure UI renders if backend isn't ready/reachable
    // But keeping the structure to swap to API easily
    
    // Mock Data
    const mockData: Competition[] = [
        {
            id: "1",
            title: "Neon City Hackathon",
            description: "Build the future of smart cities in this 48-hour coding marathon. Prizes worth $50k.",
            startDate: "2026-03-15",
            endDate: "2026-03-17",
            type: "Tech",
            prizePool: "$50,000",
            participants: new Array(145).fill("p")
        },
        {
            id: "2",
            title: "Ultimate Gamer's Cup",
            description: "The biggest e-sports tournament of the year. Valorant, CS2, and League of Legends.",
            startDate: "2026-04-01",
            endDate: "2026-04-10",
            type: "Gaming",
            prizePool: "$25,000",
            participants: new Array(890).fill("p")
        },
        {
            id: "3",
            title: "Abstract Art Showcase",
            description: "Digital art competition. Theme: 'Frozen Dreams'.",
            startDate: "2026-03-20",
            endDate: "2026-03-30",
            type: "Creative",
            prizePool: "$10,000",
            participants: new Array(56).fill("p")
        },
        {
            id: "4",
            title: "RoboWars 2026",
            description: "Build battle bots and destroy the competition.",
            startDate: "2026-05-12",
            endDate: "2026-05-14",
            type: "Tech",
            prizePool: "$75,000",
            participants: new Array(32).fill("p")
        },
    ]
    
    setCompetitions(mockData)
    setFilteredCompetitions(mockData)
    setLoading(false)
  }, [])

  useEffect(() => {
      let result = [...competitions]

      // Search
      if (searchQuery) {
          result = result.filter(c => 
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
      }

      // Category
      if (category) {
          result = result.filter(c => c.type === category)
      }

      // Sort
      if (sortBy === 'newest') {
          result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      } else if (sortBy === 'popular') {
          result.sort((a, b) => b.participants.length - a.participants.length)
      }
      // 'closing-soon' logic could be added here

      setFilteredCompetitions(result)
  }, [competitions, searchQuery, category, sortBy])


  const handleJoin = (id: string) => {
      // Logic to navigate to details or join
      console.log(`Joining competition ${id}`)
  }

  return (
    <div className="min-h-screen bg-[#0F1C2E] text-white pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter metallic-text"
                >
                    Elite Competitions
                </motion.h1>
                <p className="text-blue-200 max-w-2xl mx-auto text-lg">
                    Choose your arena. Prove your worth. Claim the glory.
                </p>
            </div>

            {/* Filters */}
            <CompetitionFilters 
                onSearch={setSearchQuery} 
                onCategoryChange={setCategory} 
                onSortChange={setSortBy}
            />

            {/* Grid */}
            {loading ? (
                 <div className="text-center text-blue-200 py-20">Loading arenas...</div>
            ) : filteredCompetitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCompetitions.map((comp) => (
                        <CompetitionCard
                            key={comp.id}
                            id={comp.id}
                            title={comp.title}
                            description={comp.description}
                            startDate={comp.startDate}
                            endDate={comp.endDate}
                            type={comp.type}
                            prizePool={comp.prizePool}
                            participantCount={comp.participants.length}
                            onJoin={handleJoin}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10 border-dashed">
                    <p className="text-xl text-blue-200">No competitions found matching your criteria.</p>
                    <Button 
                        variant="link" 
                        onClick={() => {
                            setSearchQuery("")
                            setCategory("")
                        }}
                        className="text-accent mt-4"
                    >
                        Clear Filters
                    </Button>
                </div>
            )}
        </div>
    </div>
  )
}
