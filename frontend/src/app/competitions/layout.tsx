import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CompetitionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0F1C2E]">
        {children}
      </div>
      <Footer />
    </>
  );
}
