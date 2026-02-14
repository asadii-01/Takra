import { HeroSection } from "@/components/landing/hero-section";
import { TrendingCompetitions } from "@/components/landing/trending-competitions";
import { FeaturesSection } from "@/components/landing/features-section";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F1C2E] text-white overflow-x-hidden selection:bg-accent selection:text-primary">
        <HeroSection />
        <TrendingCompetitions />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}
