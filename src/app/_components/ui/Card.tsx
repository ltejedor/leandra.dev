"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive" | "featured";
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const baseStyles = "rounded-lg border border-[var(--color-canvas-muted)] transition-all duration-200";
    
    const variants = {
      default: "bg-[var(--color-canvas-subtle)] p-6",
      interactive: "bg-[var(--color-interactive)] p-6 hover:bg-[var(--color-interactive-hover)] hover:transform hover:-translate-y-1 cursor-pointer",
      featured: "bg-gradient-to-br from-[var(--color-canvas-subtle)] to-[var(--color-canvas-muted)] p-8 border-[var(--color-accent)]/20"
    };
    
    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
