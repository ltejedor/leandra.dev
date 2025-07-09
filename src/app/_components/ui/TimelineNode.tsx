"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

interface TimelineNodeProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  date: string;
  description: string;
  isActive?: boolean;
  children?: React.ReactNode;
}

const TimelineNode = forwardRef<HTMLDivElement, TimelineNodeProps>(
  ({ className, title, date, description, isActive = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-start gap-4 group",
          className
        )}
        {...props}
      >
        {/* Timeline line and dot */}
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "w-4 h-4 rounded-full border-2 transition-all duration-300",
              isActive 
                ? "bg-[var(--color-accent)] border-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/20" 
                : "bg-[var(--color-canvas)] border-[var(--color-canvas-muted)] group-hover:border-[var(--color-accent)]"
            )}
          />
          <div className="w-0.5 h-full bg-[var(--color-canvas-muted)] mt-2" />
        </div>
        
        {/* Content */}
        <div className="flex-1 pb-8">
          <div className="bg-[var(--color-canvas-subtle)] border border-[var(--color-canvas-muted)] rounded-lg p-6 transition-all duration-300 group-hover:border-[var(--color-accent)]/30 group-hover:bg-[var(--color-interactive)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <span className="text-sm text-[var(--color-accent)] font-medium">{date}</span>
            </div>
            <p className="text-[var(--color-text-secondary)] mb-4">{description}</p>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

TimelineNode.displayName = "TimelineNode";

export { TimelineNode };
