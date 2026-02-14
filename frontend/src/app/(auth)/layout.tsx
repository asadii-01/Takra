import Navbar from "@/components/layout/Navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Navbar />
    <div className="flex min-h-screen w-full">
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex w-1/2 bg-[#0F1C2E] relative overflow-hidden items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] via-[#0F1C2E] to-black opacity-90 z-10" />
        <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px]" />
        
        {/* Content */}
        <div className="relative z-20 text-center px-12">
            <h1 className="text-6xl font-heading font-bold text-white mb-6 tracking-tighter shadow-xl">
                TAKRA 2026
            </h1>
            <p className="text-xl text-blue-200 font-light max-w-md mx-auto leading-relaxed">
                Enter the arena of the future. Where innovation meets competition in a frozen digital landscape.
            </p>
            
            {/* Decorative Shield/Icon */}
            <div className="mt-12 mx-auto w-32 h-32 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(143,211,255,0.2)]">
                <div className="w-24 h-24 rounded-full border border-accent/30 bg-accent/5" />
            </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0B1221] px-4 py-12 relative">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
        
         <div className="w-full max-w-md z-10">
            {children}
         </div>
      </div>
    </div>
    </>
  );
}
