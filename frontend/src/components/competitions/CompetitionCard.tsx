'use client';

import { Calendar, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CompetitionProps {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: string;
  prizePool: string;
  participantCount?: number;
  onJoin: (id: string) => void;
}

export default function CompetitionCard({
  id,
  title,
  description,
  startDate,
  endDate,
  type,
  prizePool,
  participantCount = 0,
  onJoin
}: CompetitionProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Art': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Tech': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Design': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="group relative flex flex-col rounded-xl border border-[#A2C2E1]/10 bg-[#162032] p-6 transition-all hover:border-[#A2C2E1]/40 hover:shadow-[0_0_30px_rgba(162,194,225,0.05)]">
      <div className="mb-4 flex items-start justify-between">
        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getTypeColor(type)}`}>
          {type}
        </span>
        <div className="flex items-center gap-1 text-xs text-[#A2C2E1]/60">
          <Users size={14} />
          <span>{participantCount} joined</span>
        </div>
      </div>

      <h3 className="mb-2 text-xl font-bold text-white group-hover:text-[#A2C2E1] transition-colors">{title}</h3>
      <p className="mb-6 flex-1 text-sm text-[#A2C2E1]/70 line-clamp-3">{description}</p>

      <div className="mt-auto space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-[#F0F8FF]">
            <Trophy size={16} className="text-yellow-500" />
            <span className="font-semibold">{prizePool}</span>
          </div>
          <div className="flex items-center gap-2 text-[#A2C2E1]/60">
            <Calendar size={16} />
            <span>{new Date(startDate).toLocaleDateString()}</span>
          </div>
        </div>

        <Link href={`/competitions/${id}`} className="w-full">
          <Button 
            className="w-full"
            variant="default"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
