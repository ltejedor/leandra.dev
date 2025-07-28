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
          "relative group animate-glow-hover",
          className
        )}
        style={{ paddingLeft: '2rem' }} // 2rem content indentation
        {...props}
      >
        {/* Timeline line and dot with absolute positioning */}
        <div className="absolute left-0 top-0 flex flex-col items-center">
          <div
            className={cn(
              "w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 group-hover:scale-150 group-hover:shadow-lg",
              isActive 
                ? "bg-[var(--color-accent)] border-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/30" 
                : "bg-[var(--color-canvas)] border-[var(--color-canvas-muted)] group-hover:border-[var(--color-accent)] group-hover:shadow-[var(--color-accent)]/50"
            )}
            style={{ 
              position: 'absolute',
              left: '-6px', // -6px left offset to center on 2px border
              top: '0'
            }}
          />
          <div 
            className="w-0.5 h-full bg-[#333] mt-2" 
            style={{ 
              position: 'absolute',
              left: '-1px', // Center the 2px line
              top: '10px' // Start after the circle
            }}
          />
        </div>
        
        {/* Content */}
        <div className="pb-8"> {/* 2rem bottom margin for vertical rhythm */}
          <div className="bg-[var(--color-canvas-subtle)] border border-[var(--color-canvas-muted)] rounded-lg p-6 transition-all duration-300 group-hover:border-[var(--color-accent)]/30 group-hover:bg-[var(--color-interactive)] group-hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <span className="text-sm text-[var(--color-accent)] font-bold">{date}</span> {/* Small, bold text in accent color */}
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
