import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97] min-h-[48px]",
  {
    variants: {
      variant: {
        default: "bg-deep-red text-white hover:bg-deep-red/90 shadow-sm",
        secondary: "bg-warm-cream text-dark-brown hover:bg-sun-primary/20 border border-dark-brown/10",
        outline: "border-2 border-deep-red text-deep-red hover:bg-deep-red hover:text-white",
        ghost: "text-dark-brown hover:bg-dark-brown/5",
        link: "text-deep-red underline-offset-4 hover:underline",
        festival: "bg-sun-primary text-dark-brown hover:bg-sun-bright shadow-sm font-black",
      },
      size: {
        default: "px-6 py-3 rounded-full text-xs uppercase tracking-wider font-mono",
        sm: "px-4 py-2 rounded-full text-xs",
        lg: "px-8 py-4 rounded-full text-sm uppercase tracking-wider font-mono",
        icon: "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
