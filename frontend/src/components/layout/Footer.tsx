import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#A2C2E1]/10 bg-[#1B263B] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <p className="text-sm text-[#A2C2E1]/60">© 2026 Takra. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="text-sm text-[#A2C2E1]/60 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-sm text-[#A2C2E1]/60 hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="text-sm text-[#A2C2E1]/60 hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
