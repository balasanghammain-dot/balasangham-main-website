import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default: "bg-deep-red text-white",
        secondary: "bg-warm-cream text-dark-brown border border-dark-brown/10",
        outline: "border border-deep-red/30 text-deep-red bg-deep-red/5",
        festival: "bg-sun-primary text-dark-brown",
        blue: "bg-kerala-blue/10 text-kerala-blue",
        green: "bg-kerala-green/10 text-kerala-green",
        purple: "bg-kerala-purple/10 text-kerala-purple",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
