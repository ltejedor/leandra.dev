"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

interface FilterPillsProps extends HTMLAttributes<HTMLDivElement> {
  options: Array<{
    id: string;
    label: string;
    count?: number;
  }>;
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  multiSelect?: boolean;
}

const FilterPills = forwardRef<HTMLDivElement, FilterPillsProps>(
  ({ className, options, selected, onSelectionChange, multiSelect = true, ...props }, ref) => {
    const handlePillClick = (optionId: string) => {
      if (multiSelect) {
        const newSelected = selected.includes(optionId)
          ? selected.filter(id => id !== optionId)
          : [...selected, optionId];
        onSelectionChange(newSelected);
      } else {
        onSelectionChange(selected.includes(optionId) ? [] : [optionId]);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap gap-2", className)}
        {...props}
      >
        {options.map((option) => {
          const isSelected = selected.includes(option.id);
          
          return (
            <button
              key={option.id}
              onClick={() => handlePillClick(option.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 uppercase tracking-wide",
                "border focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-canvas)]",
                isSelected
                  ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/20"
                  : "bg-[var(--color-interactive)] text-[var(--color-text-secondary)] border-[var(--color-canvas-muted)] hover:bg-[var(--color-interactive-hover)] hover:text-white hover:border-[var(--color-accent)]/50"
              )}
            >
              <span>{option.label}</span>
              {option.count !== undefined && (
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-sm",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[var(--color-canvas-muted)] text-[var(--color-text-muted)]"
                  )}
                >
                  {option.count}
                </span>
              )}
            </button>
          );
        })}
        
        {selected.length > 0 && (
          <button
            onClick={() => onSelectionChange([])}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-sm text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors uppercase tracking-wide border border-[var(--color-border)] hover:border-[var(--color-accent)]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear all
          </button>
        )}
      </div>
    );
  }
);

FilterPills.displayName = "FilterPills";

export { FilterPills };
