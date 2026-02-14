import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-medium text-[#A2C2E1]">{label}</label>}
      <input
        className={`w-full rounded-lg border border-[#A2C2E1]/20 bg-[#1B263B]/50 px-4 py-3 text-white placeholder-[#A2C2E1]/50 transition-all focus:border-[#A2C2E1] focus:bg-[#1B263B] focus:outline-none focus:ring-1 focus:ring-[#A2C2E1] ${className}`}
        {...props}
      />
    </div>
  );
}
