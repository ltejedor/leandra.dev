"use client";

import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { Card } from "./Card";
import type { TocHeading } from "~/lib/toc-utils";

interface TableOfContentsProps {
  headings: TocHeading[];
  className?: string;
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Sort entries by position to find the topmost visible heading
        const sortedEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        
        const visibleHeading = sortedEntries[0];
        if (visibleHeading) {
          setActiveId(visibleHeading.target.id);
        }
      },
      {
        rootMargin: "-20% 0% -80% 0%", // Trigger when heading is in the top 20% of viewport
        threshold: 0.1,
      }
    );

    // Observe all heading elements with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Add a small offset to account for any fixed headers
      const elementPosition = element.offsetTop - 32; // 2rem offset
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <Card className={cn("table-of-contents", className)}>
      <div className="space-y-1">
        <nav>
          <ul className="space-y-1">
            {headings.map(({ id, text, level }) => (
              <li key={id}>
                <button
                  onClick={() => handleClick(id)}
                  className={cn(
                    "block w-full text-left text-sm transition-colors duration-200 py-1 px-2 rounded",
                    "hover:text-[var(--color-accent)] hover:bg-[var(--color-interactive)]",
                    activeId === id
                      ? "text-[var(--color-accent)] bg-[var(--color-accent-subtle)] font-medium"
                      : "text-[var(--color-text-secondary)]",
                    level === 2 && "pl-2",
                    level === 3 && "pl-4",
                    level === 4 && "pl-6",
                    level === 5 && "pl-8",
                    level === 6 && "pl-10"
                  )}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Card>
  );
}
