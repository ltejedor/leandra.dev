import { Button } from "~/app/_components/ui/Button";
import { Card } from "~/app/_components/ui/Card";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="bg-[var(--color-canvas)]">
        {/* Compact Hero Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white leading-tight">
              Turning cutting-edge AI into{" "}
              <span className="text-[var(--color-accent)]">human-centred tools</span>
              —from post-disaster mapping to creative coding for millions.
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] mb-8">
              MIT ML × HCI researcher · Vidcode co-founder (Acquired, YC) · Forbes 30U30
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-6">
              <a 
                href="https://bsky.app/profile/leeps.bsky.social" 
                className="opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Bluesky"
              >
                <svg className="w-6 h-6" fill="white" viewBox="0 0 600 530">
                  <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/ltejedor" 
                className="opacity-70 hover:opacity-100 transition-opacity"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://huggingface.co/Leeps" 
                className="opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Hugging Face"
              >
                <img src="/icons/hf-logo-pirate.svg" alt="Hugging Face" className="w-6 h-6" />
              </a>
              <a 
                href="https://replicate.com/ltejedor" 
                className="opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Replicate"
              >
                <svg className="w-6 h-6" fill="white" viewBox="0 0 87 96">
                  <polygon points="86.96 0 86.96 10.74 12.03 10.74 12.03 95.41 0 95.41 0 0 86.96 0"/>
                  <polygon points="86.96 20.37 86.96 31.11 34.75 31.11 34.75 95.41 22.71 95.41 22.71 20.37 86.96 20.37"/>
                  <polygon points="86.96 40.67 86.96 51.47 57.46 51.47 57.46 95.41 45.42 95.41 45.42 40.67 86.96 40.67"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Now Section */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-4xl">
            <Card variant="featured">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-white">Now</h2>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.146 1.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5z"/>
                  </svg>
                  <span>Last updated January 15, 2024</span>
                </div>
              </div>
              <p className="text-lg text-[var(--color-text-secondary)]">
                In a hacker house in Norway for the Tech Bros accelerator
              </p>
            </Card>
          </div>
        </section>

        {/* Short About Section */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                  I build AI systems that amplify human creativity rather than replace it. 
                  From mapping disaster zones with computer vision to teaching millions to code, 
                  I bridge the gap between cutting-edge research and real-world impact.
                </p>
                <Button size="lg">
                  About →
                </Button>
              </div>
              <div className="aspect-square bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-canvas-muted)] rounded-lg flex items-center justify-center">
                <span className="text-[var(--color-text-muted)]">Photo</span>
              </div>
            </div>
          </div>
        </section>

        {/* Credibility Strip */}
        <section className="px-4 py-16 bg-[var(--color-canvas-subtle)]">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center">
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <svg width="80" height="24" viewBox="0 0 80 24" fill="currentColor" className="text-[var(--color-text-secondary)]">
                  <path d="M8.4 6.6h6.8v2.4H11v3.2h3.8v2.4H11v5.8H8.4V6.6zm12.2 0c3.6 0 6.2 2.4 6.2 6.2s-2.6 6.2-6.2 6.2-6.2-2.4-6.2-6.2 2.6-6.2 6.2-6.2zm0 2.4c-2 0-3.6 1.6-3.6 3.8s1.6 3.8 3.6 3.8 3.6-1.6 3.6-3.8-1.6-3.8-3.6-3.8zm10.4-2.4h4.8c2.8 0 4.8 1.8 4.8 4.4 0 2.2-1.4 3.8-3.6 4.2l4 4.2h-3.2l-3.6-3.8h-0.6v3.8h-2.6V6.6zm2.6 2.2v3.6h2c1.4 0 2.4-0.8 2.4-1.8s-1-1.8-2.4-1.8h-2zm12.8-2.2h6.8v2.4h-4.2v2.8h3.8v2.4h-3.8v3.2h4.2v2.4h-6.8V6.6zm11.2 0c3.2 0 5.2 1.6 5.2 4.2 0 2.2-1.4 3.6-3.4 4l3.8 5.2h-3.2l-3.4-4.8h-0.6v4.8h-2.6V6.6zm2.6 2.2v3.2h1.8c1.2 0 2-0.6 2-1.6s-0.8-1.6-2-1.6h-1.8z"/>
                </svg>
              </div>
              
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <svg width="60" height="24" viewBox="0 0 60 24" fill="currentColor" className="text-[var(--color-text-secondary)]">
                  <path d="M4 6h4l4 12h0.4l4-12h4v14h-2.8v-10h-0.4l-3.6 10h-2l-3.6-10h-0.4v10H4V6zm22 0h8v2.4h-2.6v11.6h-2.8V8.4h-2.6V6zm18 0h2.8v14h-2.8V8.4h-2.6v11.6h-2.8V8.4h-2.6V6h8z"/>
                </svg>
              </div>
              
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <svg width="80" height="24" viewBox="0 0 80 24" fill="currentColor" className="text-[var(--color-text-secondary)]">
                  <path d="M40 12c0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6c1.6 0 3.1-0.6 4.2-1.8l-1.7-1.7c-0.7 0.7-1.6 1.1-2.5 1.1-1.9 0-3.6-1.6-3.6-3.6s1.6-3.6 3.6-3.6c1.4 0 2.6 0.8 3.2 2h-3.2v2.4h5.8c0.1-0.3 0.2-0.6 0.2-1.2zm-16 0c0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6 6-2.7 6-6zm-2.4 0c0 1.9-1.6 3.6-3.6 3.6s-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6 3.6 1.6 3.6 3.6zm-16 0c0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6 6-2.7 6-6zm-2.4 0c0 1.9-1.6 3.6-3.6 3.6s-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6 3.6 1.6 3.6 3.6z"/>
                  <path d="M68 6v2h-2v2h-2v2h2v2h2v2h2v-2h2v-2h-2v-2h2v-2h-2V6h-2zm-12 0c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 2.4c1.9 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6z"/>
                </svg>
              </div>
              
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <svg width="80" height="24" viewBox="0 0 80 24" fill="currentColor" className="text-[var(--color-text-secondary)]">
                  <path d="M8 6l2.4 8h0.4l2.4-8h2.8l2.4 8h0.4l2.4-8h2.8l-3.6 14h-3.2l-2.4-8h-0.4l-2.4 8h-3.2L4 6h2.8zm24 0h2.8v14h-2.8V6zm10 0h4.8c2.8 0 4.8 1.8 4.8 4.4 0 2.2-1.4 3.8-3.6 4.2l4 4.2h-3.2l-3.6-3.8h-0.6v3.8h-2.6V6zm2.6 2.2v3.6h2c1.4 0 2.4-0.8 2.4-1.8s-1-1.8-2.4-1.8h-2zm12.8-2.2h6.8v2.4h-4.2v2.8h3.8v2.4h-3.8v3.2h4.2v2.4h-6.8V6zm11.2 0h4.8c3.2 0 5.2 2.2 5.2 5.6v2.8c0 3.4-2 5.6-5.2 5.6h-4.8V6zm2.6 2.2v9.6h2c1.8 0 2.8-1.2 2.8-3.2v-3.2c0-2-1-3.2-2.8-3.2h-2z"/>
                </svg>
              </div>
              
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <svg width="60" height="24" viewBox="0 0 60 24" fill="currentColor" className="text-[var(--color-text-secondary)]">
                  <path d="M8 6h4.8c2.8 0 4.8 1.8 4.8 4.4 0 1.4-0.6 2.6-1.6 3.4 1.2 0.8 2 2.2 2 3.8 0 2.6-2 4.4-4.8 4.4H8V6zm2.6 2.2v3.2h2c1.4 0 2.4-0.8 2.4-1.6s-1-1.6-2.4-1.6h-2zm0 5.6v3.6h2.2c1.4 0 2.4-0.8 2.4-1.8s-1-1.8-2.4-1.8h-2.2zM28 6h4.8c3.2 0 5.2 2.2 5.2 5.6v2.8c0 3.4-2 5.6-5.2 5.6H28V6zm2.6 2.2v9.6h2c1.8 0 2.8-1.2 2.8-3.2v-3.2c0-2-1-3.2-2.8-3.2h-2zM48 6h4.8c3.2 0 5.2 2.2 5.2 5.6v2.8c0 3.4-2 5.6-5.2 5.6H48V6zm2.6 2.2v9.6h2c1.8 0 2.8-1.2 2.8-3.2v-3.2c0-2-1-3.2-2.8-3.2h-2z"/>
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <svg width="80" height="24" viewBox="0 0 80 24" fill="currentColor" className="text-[var(--color-text-secondary)]">
                  <path d="M8 6h4.8c3.2 0 5.2 2.2 5.2 5.6v2.8c0 3.4-2 5.6-5.2 5.6H8V6zm2.6 2.2v9.6h2c1.8 0 2.8-1.2 2.8-3.2v-3.2c0-2-1-3.2-2.8-3.2h-2zm16 0h0.4l4 12h-2.8l-0.8-2.4h-4l-0.8 2.4h-2.8l4-12zm2 2.4l-1.4 4.8h2.8l-1.4-4.8zm14-4.6h2.8v8.4l4.4-8.4h2.8l-4.8 8.8v5.2h-2.8v-5.2l-4.8-8.8zm18 0h4.8c2.8 0 4.8 1.8 4.8 4.4 0 2.6-2 4.4-4.8 4.4h-2.2v5.2h-2.6V6zm2.6 2.2v4h2c1.4 0 2.4-0.8 2.4-2s-1-2-2.4-2h-2z"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Blog Teaser */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <Card variant="interactive" className="group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                    How I built an AI agent in WhatsApp for &lt;$20/mo
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">
                    Building production-ready AI agents doesn't have to break the bank. Here's how I created a fully functional WhatsApp bot using serverless functions and open-source models.
                  </p>
                </div>
                <div className="ml-6 flex-shrink-0">
                  <Button variant="ghost" size="sm">
                    Read article →
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
