"use client";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--color-canvas-subtle)] mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-8">
          {/* Social links section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-[var(--color-text-primary)] text-sm font-semibold mb-4 tracking-wide uppercase">
              Connect
            </h3>
            <div className="flex space-x-6">
              <a 
                href="https://bsky.app/profile/leeps.bsky.social" 
                className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200 group"
                aria-label="Bluesky"
              >
                <svg className="w-6 h-6 group-hover:fill-[var(--color-accent)] transition-colors duration-200" fill="white" viewBox="0 0 600 530">
                  <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/ltejedor" 
                className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200 group"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6 group-hover:fill-[var(--color-accent)] transition-colors duration-200" fill="white" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://huggingface.co/Leeps" 
                className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200 group"
                aria-label="Hugging Face"
              >
                <img 
                  src="/icons/hf-logo-pirate.svg" 
                  alt="Hugging Face" 
                  className="w-6 h-6 group-hover:brightness-0 group-hover:saturate-100 group-hover:filter group-hover:[filter:brightness(0)_saturate(100%)_invert(47%)_sepia(96%)_saturate(4456%)_hue-rotate(352deg)_brightness(106%)_contrast(94%)] transition-all duration-200" 
                />
              </a>
              <a 
                href="https://replicate.com/ltejedor" 
                className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200 group"
                aria-label="Replicate"
              >
                <svg className="w-6 h-6 group-hover:fill-[var(--color-accent)] transition-colors duration-200" fill="white" viewBox="0 0 87 96">
                  <polygon points="86.96 0 86.96 10.74 12.03 10.74 12.03 95.41 0 95.41 0 0 86.96 0"/>
                  <polygon points="86.96 20.37 86.96 31.11 34.75 31.11 34.75 95.41 22.71 95.41 22.71 20.37 86.96 20.37"/>
                  <polygon points="86.96 40.67 86.96 51.47 57.46 51.47 57.46 95.41 45.42 95.41 45.42 40.67 86.96 40.67"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Site info section */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <div className="flex flex-col space-y-1">
              <p className="text-[var(--color-text-secondary)] text-sm">
                © 2025 Leandra Tejedor
              </p>
              <a 
                href="https://github.com/ltejedor/leandra.dev" 
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm underline decoration-dotted underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source Code
              </a>
            </div>
          </div>
        </div>

        {/* Bottom border accent */}
        <div className="border-t border-white/5 pt-6">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-30"></div>
        </div>
      </div>
    </footer>
  );
}
