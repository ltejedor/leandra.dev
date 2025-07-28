"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive" | "featured";
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const baseStyles = "rounded-sm border border-[var(--color-border)] transition-all duration-200 relative overflow-hidden";
    
    const variants = {
      default: "bg-[var(--color-canvas-subtle)] p-6",
      interactive: "bg-[var(--color-canvas-subtle)] p-6 hover:bg-[var(--color-interactive-hover)] hover:border-[var(--color-accent)] hover:transform hover:-translate-y-[5px] cursor-pointer hover:shadow-lg hover:shadow-[var(--color-accent)]/20 transition-all duration-300",
      featured: "bg-gradient-to-br from-[var(--color-canvas-subtle)] to-[var(--color-canvas-muted)] p-8 border-[var(--color-accent)]/30 shadow-lg shadow-[var(--color-accent)]/5 before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-[var(--color-accent)] before:to-transparent before:content-['']"
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
