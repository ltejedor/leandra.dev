"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "interactive";
  size?: "sm" | "md";
  children: React.ReactNode;
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = "default", size = "sm", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center font-medium rounded-full transition-all duration-200";
    
    const variants = {
      default: "bg-[var(--color-canvas-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
      interactive: "bg-[var(--color-canvas-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-interactive-hover)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] cursor-pointer"
    };
    
    const sizes = {
      sm: "px-2.5 py-1 text-xs",
      md: "px-3 py-1.5 text-sm"
    };
    
    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = "Tag";

export { Tag };