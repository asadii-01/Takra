import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  className?: string
}

export function FeatureCard({ title, description, icon: Icon, className }: FeatureCardProps) {
  return (
    <Card className={cn("glass-hover transition-all duration-300 group border-white/10", className)}>
      <CardHeader className="flex flex-col items-center text-center pb-2">
        <div className="p-4 rounded-full bg-white/5 border border-white/10 mb-4 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(143,211,255,0.1)]">
          <Icon className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
        </div>
        <CardTitle className="text-xl tracking-wide group-hover:text-accent transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription className="text-blue-200/70 group-hover:text-blue-100 transition-colors">
            {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
