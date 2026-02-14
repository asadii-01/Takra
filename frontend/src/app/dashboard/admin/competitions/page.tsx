'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';
import Cookies from 'js-cookie';

interface Competition {
  _id: string;
  title: string;
  type: string;
  startDate: string;
}

export default function AdminCompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    type: 'Other',
    prizePool: ''
  });

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      // Mock data for build/demo purposes if API fails
      try {
          const res = await fetch('http://localhost:5000/api/competitions');
          if (res.ok) {
            const data = await res.json();
            setCompetitions(data);
          } else {
            throw new Error('API not reachable');
          }
      } catch (e) {
          // Fallback mock
          setCompetitions([
              { _id: '1', title: 'Mock Competition', type: 'Tech', startDate: new Date().toISOString() }
          ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This cannot be undone.')) return;
    
    const token = Cookies.get('token');
    try {
      const res = await fetch(`http://localhost:5000/api/competitions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        fetchCompetitions();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      alert('Error deleting competition');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('token');
    
    try {
      const res = await fetch('http://localhost:5000/api/competitions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setShowForm(false);
        setFormData({ title: '', description: '', startDate: '', endDate: '', type: 'Other', prizePool: '' });
        fetchCompetitions();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to create');
      }
    } catch (err) {
      alert('Error creating competition');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1E3A5F]">Manage Competitions</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={20} className="mr-2" />
          {showForm ? 'Cancel' : 'New Competition'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md">
          <h3 className="text-lg font-semibold text-[#1E3A5F] mb-4">Create New Competition</h3>
          <Input 
            placeholder="Title" 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            required
            className="bg-slate-50 border-slate-200 text-slate-800 focus:ring-blue-500"
          />
          <textarea 
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            rows={3}
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
             <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500">Start Date</label>
                <Input 
                  type="date"
                  value={formData.startDate}
                  onChange={e => setFormData({...formData, startDate: e.target.value})}
                  required
                  className="bg-slate-50 border-slate-200 text-slate-800"
                />
             </div>
             <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500">End Date</label>
                <Input 
                  type="date"
                  value={formData.endDate}
                  onChange={e => setFormData({...formData, endDate: e.target.value})}
                  required
                  className="bg-slate-50 border-slate-200 text-slate-800"
                />
             </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
             <select 
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
            >
              <option value="Art">Art</option>
              <option value="Tech">Tech</option>
              <option value="Design">Design</option>
              <option value="Other">Other</option>
            </select>
             <Input 
              placeholder="Prize Pool (e.g. $1000)" 
              value={formData.prizePool} 
              onChange={e => setFormData({...formData, prizePool: e.target.value})}
              required
              className="bg-slate-50 border-slate-200 text-slate-800"
            />
          </div>
          <div className="flex justify-end pt-4">
             <Button type="submit">Create Competition</Button>
          </div>
        </form>
      )}

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Start Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {competitions.map((comp) => (
              <tr key={comp._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-[#1E3A5F]">{comp.title}</td>
                <td className="px-6 py-4">{comp.type}</td>
                <td className="px-6 py-4">{new Date(comp.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(comp._id)}
                    className="text-red-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {competitions.length === 0 && !loading && (
               <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-400">No competitions found</td>
               </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
