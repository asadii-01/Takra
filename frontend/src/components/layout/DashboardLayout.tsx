'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AiAssistant from '@/components/ai/AiAssistant';
import { 
  LayoutDashboard, 
  Trophy, 
  User, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Bell,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  const isAdminPage = pathname.startsWith('/dashboard/admin');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Competitions', href: '/dashboard/competitions', icon: Trophy },
    { name: 'Community', href: '/dashboard/chat', icon: MessageSquare },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ];

  /* Theme Configurations */
  const theme = isAdminPage ? {
      // Metallic Theme (Admin)
      wrapper: "bg-[#F0F4F8] text-[#1E3A5F]",
      sidebar: "bg-gradient-to-b from-[#E0E8F0] to-[#C9D6DF] border-r border-white/40 shadow-xl",
      sidebarHeader: "border-b border-white/20",
      sidebarText: "text-[#1E3A5F]",
      linkActive: "bg-white/60 text-[#1E3A5F] shadow-sm font-bold",
      linkInactive: "text-[#1E3A5F]/70 hover:bg-white/30 hover:text-[#1E3A5F]",
      topbar: "bg-white/50 backdrop-blur-md border-b border-white/20",
      content: "bg-[#F0F4F8]"
  } : {
      // Dark Frost Theme (User)
      wrapper: "bg-[#0F1C2E] text-white", // Deep dark background
      sidebar: "bg-black/20 backdrop-blur-xl border-r border-white/5 shadow-[5px_0_30px_rgba(0,0,0,0.3)]",
      sidebarHeader: "border-b border-white/5",
      sidebarText: "text-white",
      linkActive: "bg-accent/10 text-accent border border-accent/20 shadow-[0_0_15px_rgba(143,211,255,0.1)]",
      linkInactive: "text-blue-200/60 hover:bg-white/5 hover:text-white",
      topbar: "bg-[#0F1C2E]/80 backdrop-blur-md border-b border-white/5",
      content: "bg-gradient-to-br from-[#0F1C2E] to-[#162032]"
  };

  return (
    <div className={cn("flex h-screen overflow-hidden", theme.wrapper)}>
      {/* Sidebar */}
      <aside 
        className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
            theme.sidebar,
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className={cn("flex h-16 items-center justify-between px-6", theme.sidebarHeader)}>
            <Link href="/dashboard" className={cn("text-2xl font-heading font-bold tracking-tighter", isAdminPage ? "text-[#1E3A5F]" : "text-white")}>
              TAKRA<span className={cn(isAdminPage ? "text-blue-500" : "text-accent")}>.</span>
            </Link>
            <button 
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} className={theme.sidebarText} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                          isActive ? theme.linkActive : theme.linkInactive
                      )}
                    >
                      <item.icon size={20} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
              
              {/* Admin Link */}
              {user?.role === 'admin' && (
                <li className="mt-6 pt-6 border-t border-white/5">
                  <p className="px-3 text-xs font-semibold uppercase tracking-wider opacity-50 mb-2">Admin</p>
                  <Link
                    href="/dashboard/admin"
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                         pathname.startsWith('/dashboard/admin')
                            ? (isAdminPage ? "bg-red-500/10 text-red-600" : "bg-red-500/20 text-red-400")
                            : "text-zinc-500 hover:text-red-500"
                    )}
                  >
                    <Settings size={20} />
                    Admin Panel
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className={cn("p-4", theme.sidebarHeader)}>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className={cn("flex h-16 items-center justify-between px-6 lg:px-8", theme.topbar)}>
          <button 
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} className={theme.sidebarText} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button className={cn("relative transition-colors", isAdminPage ? "text-[#1E3A5F]/70 hover:text-[#1E3A5F]" : "text-blue-200 hover:text-white")}>
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-transparent"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-accent to-blue-500 flex items-center justify-center text-[#1B263B] font-bold text-sm shadow-lg">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden lg:block">
                  <span className={cn("block text-sm font-medium", isAdminPage ? "text-[#1E3A5F]" : "text-white")}>
                    {user?.username || 'User'}
                  </span>
                  <span className={cn("block text-xs", isAdminPage ? "text-[#1E3A5F]/60" : "text-blue-200/60")}>
                    {user?.role === 'admin' ? 'Administrator' : 'Participant'}
                  </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={cn("flex-1 overflow-y-auto p-6 md:p-8", theme.content)}>
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
      
      {/* AI Chatbot Widget (Only show on User Dashboard) */}
      {!isAdminPage && <AiAssistant />}
    </div>
  );
}

