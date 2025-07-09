import { TimelineNode, Card } from "~/app/_components/ui";

const timelineData = [
  {
    title: "Senior Product Designer",
    company: "TechCorp Inc.",
    date: "2023 - Present",
    description: "Leading design strategy for a suite of B2B products, managing a team of 4 designers, and driving user-centered design practices across the organization.",
    achievements: [
      "Increased user satisfaction scores by 40%",
      "Reduced onboarding time by 60%",
      "Launched 3 major product features"
    ],
    isActive: true
  },
  {
    title: "UX Designer & Frontend Developer",
    company: "StartupXYZ",
    date: "2021 - 2023",
    description: "Wore multiple hats in a fast-paced startup environment, designing and developing user interfaces for web and mobile applications.",
    achievements: [
      "Built design system from scratch",
      "Improved conversion rates by 25%",
      "Developed responsive web applications"
    ],
    isActive: false
  },
  {
    title: "Junior Designer",
    company: "Design Agency",
    date: "2020 - 2021",
    description: "Focused on visual design and user experience for various client projects, from e-commerce to SaaS platforms.",
    achievements: [
      "Completed 15+ client projects",
      "Specialized in e-commerce design",
      "Learned modern design tools and processes"
    ],
    isActive: false
  },
  {
    title: "Freelance Designer",
    company: "Independent",
    date: "2019 - 2020",
    description: "Started my journey in design by working with small businesses and startups to create their digital presence.",
    achievements: [
      "Built portfolio of 10+ projects",
      "Developed client management skills",
      "Learned business fundamentals"
    ],
    isActive: false
  }
];

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-[var(--color-canvas)] py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-4">My Journey</h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            A timeline of my professional growth, key milestones, and the experiences 
            that shaped my approach to design and development.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {timelineData.map((item, index) => (
            <TimelineNode
              key={index}
              title={`${item.title} at ${item.company}`}
              date={item.date}
              description={item.description}
              isActive={item.isActive}
              className="mb-8"
            >
              {item.achievements && (
                <div className="mt-4">
                  <h4 className="text-[var(--color-accent)] font-medium mb-2">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="text-[var(--color-text-secondary)] text-sm flex items-start gap-2">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TimelineNode>
          ))}
        </div>

        {/* Call to Action */}
        <Card variant="featured" className="mt-16 text-center">
          <h2 className="mb-4">What's Next?</h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            I'm always looking for new challenges and opportunities to create meaningful impact. 
            Let's discuss how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact"
              className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-full hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Get In Touch
            </a>
            <a 
              href="/resume.pdf"
              className="bg-[var(--color-interactive)] text-white px-8 py-3 rounded-full hover:bg-[var(--color-interactive-hover)] transition-colors border border-[var(--color-canvas-muted)]"
            >
              Download Resume
            </a>
          </div>
        </Card>
      </div>
    </main>
  );
}
