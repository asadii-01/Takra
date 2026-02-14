"use client"

import { Search, Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Input from "@/components/ui/input"

interface CompetitionFiltersProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

export function CompetitionFilters({ onSearch, onCategoryChange, onSortChange }: CompetitionFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm shadow-lg">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/50 w-5 h-5" />
        <Input 
          placeholder="Search competitions..." 
          className="pl-10 bg-black/20 border-white/10 focus:border-accent text-white placeholder:text-blue-200/30 h-12"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="flex gap-4">
        {/* Category Filter */}
        <div className="relative">
          <select 
            className="h-12 pl-4 pr-10 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:border-accent appearance-none min-w-[150px] cursor-pointer hover:bg-black/30 transition-colors"
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Gaming">Gaming</option>
            <option value="Tech">Tech</option>
            <option value="Creative">Creative</option>
            <option value="Academic">Academic</option>
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200/50 w-4 h-4 pointer-events-none" />
        </div>

        {/* Sort Filter */}
        <div className="relative">
             <select 
            className="h-12 pl-4 pr-10 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:border-accent appearance-none min-w-[180px] cursor-pointer hover:bg-black/30 transition-colors"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="closing-soon">Closing Soon</option>
          </select>
          <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200/50 w-4 h-4 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
