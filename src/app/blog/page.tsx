"use client";

import { useState } from "react";
import { Card, FilterPills, Button } from "~/app/_components/ui";

const blogPosts = [
  {
    id: "1",
    title: "Building Scalable Design Systems",
    excerpt: "How to create design systems that grow with your product and team",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Design Systems", "React", "TypeScript"],
    category: "tutorials"
  },
  {
    id: "2",
    title: "The Future of Web Performance",
    excerpt: "Exploring modern techniques for optimizing web applications",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["Performance", "Web Development", "Optimization"],
    category: "tutorials"
  },
  {
    id: "3",
    title: "My Journey Building a SaaS Product",
    excerpt: "Lessons learned from building and launching a product in public",
    date: "2024-01-05",
    readTime: "6 min read",
    tags: ["SaaS", "Startup", "Product Development"],
    category: "build-in-public"
  },
  {
    id: "4",
    title: "Hiking the Pacific Crest Trail",
    excerpt: "A 2,650-mile journey through the wilderness and what it taught me about persistence",
    date: "2024-01-01",
    readTime: "10 min read",
    tags: ["Hiking", "Adventure", "Personal Growth"],
    category: "adventures"
  }
];

const filterOptions = [
  { id: "all", label: "All Posts", count: blogPosts.length },
  { id: "build-in-public", label: "Build in Public", count: blogPosts.filter(p => p.category === "build-in-public").length },
  { id: "tutorials", label: "Tutorials", count: blogPosts.filter(p => p.category === "tutorials").length },
  { id: "adventures", label: "Adventures", count: blogPosts.filter(p => p.category === "adventures").length }
];

export default function BlogPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["all"]);

  const filteredPosts = selectedFilters.includes("all") 
    ? blogPosts 
    : blogPosts.filter(post => selectedFilters.includes(post.category));

  return (
    <main className="min-h-screen bg-[var(--color-canvas)] py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4">Blog & Insights</h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Thoughts on design, development, and the intersection of creativity and technology.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex justify-center">
          <FilterPills
            options={filterOptions}
            selected={selectedFilters}
            onSelectionChange={setSelectedFilters}
            multiSelect={false}
          />
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <Card key={post.id} variant="interactive" className="group h-full flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)] mb-4">
                  <time className="text-[var(--color-accent)]">{post.date}</time>
                  <span>{post.readTime}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button variant="ghost" size="sm" className="w-full">
                  Read More
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="secondary" size="lg">
            Load More Posts
          </Button>
        </div>
      </div>
    </main>
  );
}
