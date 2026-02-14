'use client';

import { useEffect, useState } from 'react';
import CompetitionCard from '@/components/competitions/CompetitionCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Cookies from 'js-cookie';
import { API_URL } from '@/lib/config';

interface Competition {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: string;
  prizePool: string;
  participants: string[];
}

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const res = await fetch(`${API_URL}/competitions`);
      const data = await res.json();
      setCompetitions(data);
    } catch (err) {
      console.error('Failed to fetch competitions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (id: string) => {
    const token = Cookies.get('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user || !user._id) {
       alert('Please log in again');
       return;
    }

    try {
      const res = await fetch(`${API_URL}/competitions/${id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // In case we add auth middleware later
        },
        body: JSON.stringify({ userId: user._id })
      });

      if (res.ok) {
        alert('Joined successfully!');
        fetchCompetitions(); // Refresh list to update participant count
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to join');
      }
    } catch (err) {
      alert('Error joining competition');
    }
  };

  if (loading) {
     return (
        <div className="flex h-64 items-center justify-center">
           <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#A2C2E1] border-t-transparent"></div>
        </div>
     );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Competitions
          </h1>
          <p className="mt-2 text-[#A2C2E1]">
            Discover and join the latest challenges. Win prizes and gain recognition.
          </p>
        </div>
        {/* Admin only feature later */}
        <Button variant="outline" className="hidden sm:flex gap-2">
          <Plus size={20} />
          Suggest Competition
        </Button>
      </div>

      {competitions.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-[#A2C2E1]/20 bg-[#162032]/50">
          <p className="text-[#A2C2E1]/60">No competitions found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {competitions.map((comp) => (
            <CompetitionCard
              key={comp._id}
              id={comp._id}
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
      )}
    </div>
  );
}
