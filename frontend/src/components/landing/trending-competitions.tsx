"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Calendar, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock Data
const competitions = [
  {
    id: 1,
    title: "E-Sports Championship",
    category: "Gaming",
    registrations: 432,
    deadline: "2 Days Left",
    color: "from-purple-500/20 to-blue-600/20"
  },
  {
    id: 2,
    title: "Robotics Challenge",
    category: "Tech",
    registrations: 128,
    deadline: "5 Days Left",
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    id: 3,
    title: "Code Warriors",
    category: "Coding",
    registrations: 890,
    deadline: "12 Hours Left",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: 4,
    title: "Design Thon",
    category: "Creative",
    registrations: 210,
    deadline: "1 Week Left",
    color: "from-pink-500/20 to-rose-500/20"
  }
]

export function TrendingCompetitions() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase text-white mb-2">
            Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Competitions</span>
          </h2>
          <p className="text-blue-200">Join the most elite battles happening now.</p>
        </div>
        <Link href="/competitions">
          <Button variant="link" className="hidden md:flex text-accent hover:text-white">
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {competitions.map((comp, index) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:border-accent/50 group overflow-hidden relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${comp.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 rounded bg-white/10 text-xs font-medium text-accent border border-white/10">
                    {comp.category}
                  </span>
                  <Trophy className="w-5 h-5 text-metallic-silver" />
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-accent transition-colors">
                  {comp.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 text-sm text-blue-100/80">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{comp.registrations} Registered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{comp.deadline}</span>
                  </div>
                </div>
              </CardContent>
              
               <CardFooter>
                 <Link href={`/competitions/${comp.id}`} className="w-full">
                   <Button variant="frost" className="w-full group-hover:bg-accent group-hover:text-blue-900">
                      View Details
                   </Button>
                 </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center md:hidden">
         <Link href="/competitions">
            <Button variant="outline" className="border-accent text-accent">View All Competitions</Button>
         </Link>
      </div>
    </section>
  )
}
