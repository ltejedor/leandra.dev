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
    const baseStyles = "inline-flex items-center justify-center rounded-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-canvas)] disabled:opacity-60 disabled:cursor-not-allowed tracking-wide text-sm border";
    
    const variants = {
      primary: "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] border-[var(--color-accent)] active:scale-95 shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-xl hover:shadow-[var(--color-accent)]/30",
      secondary: "bg-[var(--color-canvas-subtle)] text-[var(--color-text-primary)] hover:bg-[var(--color-interactive-hover)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
      ghost: "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-interactive)] border-transparent hover:border-[var(--color-border)]"
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
