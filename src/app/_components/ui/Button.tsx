"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-canvas)] disabled:opacity-60 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] active:scale-95",
      secondary: "bg-[var(--color-interactive)] text-white hover:bg-[var(--color-interactive-hover)] border border-[var(--color-canvas-muted)]",
      ghost: "text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-interactive)]"
    };
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
