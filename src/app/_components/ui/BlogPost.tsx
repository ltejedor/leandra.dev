"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";
import { Card } from "./Card";

interface BlogPostProps extends HTMLAttributes<HTMLElement> {
  title: string;
  excerpt?: string;
  date: string;
  readTime?: string;
  tags?: string[];
  author?: {
    name: string;
    avatar?: string;
  };
  children: React.ReactNode;
}

const BlogPost = forwardRef<HTMLElement, BlogPostProps>(
  ({ className, title, excerpt, date, readTime, tags, author, children, ...props }, ref) => {
    return (
      <article
        ref={ref}
        className={cn("max-w-4xl mx-auto", className)}
        {...props}
      >
        {/* Header */}
        <Card variant="featured" className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
            
            {excerpt && (
              <p className="text-xl text-[var(--color-text-secondary)] mb-6 max-w-2xl mx-auto">
                {excerpt}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[var(--color-text-secondary)]">
              {author && (
                <div className="flex items-center gap-2">
                  {author.avatar && (
                    <img 
                      src={author.avatar} 
                      alt={author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span>{author.name}</span>
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <time className="text-[var(--color-accent)]">{date}</time>
                {readTime && (
                  <>
                    <span className="text-[var(--color-text-muted)]">•</span>
                    <span>{readTime}</span>
                  </>
                )}
              </div>
            </div>
            
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Card>
        
        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <div className="bg-[var(--color-canvas-subtle)] border border-[var(--color-canvas-muted)] rounded-lg p-8 md:p-12">
            {children}
          </div>
        </div>
      </article>
    );
  }
);

BlogPost.displayName = "BlogPost";

export { BlogPost };
