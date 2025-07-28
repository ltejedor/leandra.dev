import { api, HydrateClient } from "~/trpc/server";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "~/app/_components/ui";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="bg-[var(--color-canvas)]">
        {/* Hero Section */}
        <section className="relative px-4 py-16 min-h-screen flex items-center justify-center overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-32 right-16 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
          </div>

          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Image and Social */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <div className="relative inline-block mb-8">
                  <Image
                    src="/images/headshot.png"
                    alt="Leandra Tejedor"
                    width={240}
                    height={240}
                    className="w-60 h-60 rounded-full object-cover shadow-2xl"
                  />
                  {/* Subtle accent ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-[var(--color-accent)] opacity-20 scale-105"></div>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center lg:justify-start space-x-6">
                  <a
                    href="https://bsky.app/profile/leeps.bsky.social"
                    className="p-3 rounded-full bg-[var(--color-canvas-subtle)] hover:bg-[var(--color-interactive-hover)] transition-all hover:scale-110"
                    aria-label="Bluesky"
                  >
                    <svg className="w-6 h-6" fill="white" viewBox="0 0 600 530">
                      <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/ltejedor"
                    className="p-3 rounded-full bg-[var(--color-canvas-subtle)] hover:bg-[var(--color-interactive-hover)] transition-all hover:scale-110"
                    aria-label="GitHub"
                  >
                    <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://huggingface.co/Leeps"
                    className="p-3 rounded-full bg-[var(--color-canvas-subtle)] hover:bg-[var(--color-interactive-hover)] transition-all hover:scale-110"
                    aria-label="Hugging Face"
                  >
                    <img src="/icons/hf-logo-pirate.svg" alt="Hugging Face" className="w-6 h-6" />
                  </a>
                  <a
                    href="https://replicate.com/ltejedor"
                    className="p-3 rounded-full bg-[var(--color-canvas-subtle)] hover:bg-[var(--color-interactive-hover)] transition-all hover:scale-110"
                    aria-label="Replicate"
                  >
                    <svg className="w-6 h-6" fill="white" viewBox="0 0 87 96">
                      <polygon points="86.96 0 86.96 10.74 12.03 10.74 12.03 95.41 0 95.41 0 0 86.96 0" />
                      <polygon points="86.96 20.37 86.96 31.11 34.75 31.11 34.75 95.41 22.71 95.41 22.71 20.37 86.96 20.37" />
                      <polygon points="86.96 40.67 86.96 51.47 57.46 51.47 57.46 95.41 45.42 95.41 45.42 40.67 86.96 40.67" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="text-center lg:text-left order-1 lg:order-2">
                <div className="mb-6">
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                    Leandra Tejedor
                  </h1>
                </div>

                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    Previously
                    MIT, Y Combinator alum, and Forbes 30 Under 30.
                  </p>

                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    Currently working on products in stealth.
                  </p>

                  <div className="pt-4">
                    <Link href="/about">
                      <Button variant="primary" size="sm" className="shadow-sm">
                        About Me
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
