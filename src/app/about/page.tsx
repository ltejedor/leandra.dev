import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-bg-secondary)] scroll-smooth">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section - Opening Identity Block */}
        <section id="intro" className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Leandra Tejedor
              </h1>
              <div className="text-xl text-[var(--color-text-secondary)] leading-relaxed space-y-4">
                <p>
                  <span className="text-[var(--color-accent)]">MIT ML × HCI researcher</span> • <span className="text-[var(--color-accent)]">Vidcode co-founder</span> (Acquired, YC) • <span className="text-[var(--color-accent)]">Forbes 30U30</span>
                </p>
                <p>
                  (You can call her Lea.) Currently building AI agents in a hacker house in Norway for the Tech Bros accelerator. Previously turning cutting-edge AI into human-centered tools from post-disaster mapping to creative coding for millions.
                </p>
                <div className="flex items-center space-x-4 mt-6">
                  <span className="text-sm text-[var(--color-text-secondary)] flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Last updated December 2024
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-full overflow-hidden">
                <Image
                  src="/images/leandra-sri-lanka.jpg"
                  alt="Leandra in Sri Lanka"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Career Chronology - Backwards */}
        <section id="career" className="mb-20">
          <div className="prose prose-lg max-w-none">
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              AI Fellow at <span className="text-white font-semibold">C10 Labs</span>, 
              researcher at <span className="text-white font-semibold">MIT</span>, 
              co-founder of <span className="text-white font-semibold">Sundai Club</span> (the largest AI hacker club in Cambridge), 
              former IDM Fellow at <span className="text-white font-semibold">MIT</span>, 
              Work of the Future Fellow at <span className="text-white font-semibold">MIT</span>, 
              co-founder of <span className="text-white font-semibold">Vidcode</span> (acquired, Y Combinator), 
              Forbes 30 Under 30 honoree.
            </p>
          </div>
        </section>

        {/* Client Roster - Breathless List */}
        <section id="clients" className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Featured In & Worked With</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 mb-8">
            <div className="flex items-center justify-center">
              <Image src="/logos/forbes_logo.svg" alt="Forbes" width={120} height={40} className="opacity-60 hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center justify-center">
              <Image src="/logos/wired_logo.svg" alt="Wired" width={120} height={40} className="opacity-60 hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center justify-center">
              <Image src="/logos/techcrunch.svg" alt="TechCrunch" width={120} height={40} className="opacity-60 hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center justify-center">
              <Image src="/logos/abc_news_logo.svg" alt="ABC News" width={120} height={40} className="opacity-60 hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center justify-center">
              <Image src="/logos/teen_vogue_logo.svg" alt="Teen Vogue" width={120} height={40} className="opacity-60 hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center justify-center">
              <Image src="/logos/vice_logo.svg" alt="Vice" width={120} height={40} className="opacity-60 hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center justify-center">
              <Image src="/logos/fast-company.svg" alt="Fast Company" width={120} height={40} className="opacity-60 hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            <span className="text-white font-semibold">Forbes</span>, <span className="text-white font-semibold">Wired</span>, <span className="text-white font-semibold">TechCrunch</span>, <span className="text-white font-semibold">ABC News</span>, <span className="text-white font-semibold">Teen Vogue</span>, <span className="text-white font-semibold">Vice</span>, <span className="text-white font-semibold">Fast Company</span>, <span className="text-white font-semibold">MIT News</span>, <span className="text-white font-semibold">Google</span>, <span className="text-white font-semibold">EdSurge</span>, <span className="text-white font-semibold">Devex</span>, <span className="text-white font-semibold">UNDP Haiti</span>, <span className="text-white font-semibold">Help.NGO</span>, <span className="text-white font-semibold">LifeMoves</span>, <span className="text-white font-semibold">Girl Scouts USA</span>, <span className="text-white font-semibold">Harvard Finale's Lab</span>, <span className="text-white font-semibold">Cambridge Meditation Center</span>, <span className="text-white font-semibold">Y Combinator</span>, <span className="text-white font-semibold">CVPR AI Art Gallery</span>.
          </p>
        </section>

        {/* Teaching + Parenthetical Aside */}
        <section id="teaching" className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Teaching</h2>
          <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            She's taught classes and workshops on technology + creativity all around the world: a Makerspace in Sri Lanka during a political crisis, a school in a Township outside of Cape Town, a pop-up structure by the Salton Sea, and guided high school startup teams made up of Israelis and Palestinians in Jerusalem during wartime. (She's ambivalent about referring to herself in the third person, but it does make achievements sound more impressive, doesn't it?)
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-6">
            <blockquote className="text-[var(--color-text-secondary)] italic mb-4">
              "Cyber Arts is one of my favorite new startups. They had put a shipping container next to the Mississippi River and young people were inside learning coding, tech, and internet of things. It was fabulous!"
            </blockquote>
            <p className="text-xs text-[var(--color-text-secondary)]">
              — Megan Smith, former CTO of the United States
            </p>
          </div>
        </section>

        {/* Education, Awards, Recognition - Bullet-like Sub-sections */}
        <section id="recognition" className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
              <ul className="space-y-3 text-[var(--color-text-secondary)]">
                <li>• MIT IDM Fellow</li>
                <li>• Dual Master's in CS + Management</li>
                <li>• Ramapo College, BA Communication Arts</li>
                <li>• MIT Prison Education Program instructor</li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Awards</h3>
              <ul className="space-y-3 text-[var(--color-text-secondary)]">
                <li>• <span className="text-[var(--color-accent)]">Forbes 30 Under 30</span> Education</li>
                <li>• <span className="text-[var(--color-accent)]">James Dyson Award</span></li>
                <li>• <span className="text-[var(--color-accent)]">MIT $15K Creative Arts</span> Winner</li>
                <li>• <span className="text-[var(--color-accent)]">Parents Choice Award</span> 2020</li>
                <li>• <span className="text-[var(--color-accent)]">Prototypes for Humanity</span></li>
                <li>• <span className="text-[var(--color-accent)]">iF Design Award</span></li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
                             <h3 className="text-xl font-semibold text-white mb-4">Recent Projects</h3>
               <ul className="space-y-3 text-[var(--color-text-secondary)]">
                 <li>• AI agents for &lt;$20/mo</li>
                <li>• CVPR 2025 Art Gallery</li>
                <li>• "The Meaning of Mirror"</li>
                <li>• Controllable AI mosaics</li>
                <li>• Post-disaster mapping Haiti</li>
                <li>• CA shelter policy generation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Philosophy + Personal Note */}
        <section id="philosophy" className="mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              I think technology you (yes, you) build can change the world. Really. We see it all the time in ways that make things better (malaria, HIV) and make them worse (Meta in Myanmar) every day. This belief hasn't changed since my first startup where we designed curriculum around what students were asking to build, not what tech companies were saying they needed from workers.
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              I believe in open source technology and having a <a href="http://www.catb.org/jargon/html/H/hacker.html" className="text-[var(--color-accent)] hover:underline" target="_blank" rel="noopener noreferrer">hacker mentality</a>. I've taken to heart what Paul Graham says about 'staying upwind' — working on interesting and new technology with the smartest (and kindest, and ambitious, and authentic) people you can find.
            </p>
          </div>
        </section>

        {/* Contact + Social - Clear Next Steps */}
        <section id="contact" className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Let's Build Something</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Interested in collaborating on technology that actually matters? Drop me a line.
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              <a 
                href="mailto:hello@leandratejedor.com" 
                className="bg-[var(--color-accent)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Email Me
              </a>
              <a 
                href="https://bsky.app/profile/leandratejedor.com" 
                className="border border-[var(--color-accent)] text-[var(--color-accent)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-accent)] hover:text-white transition-all"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Bluesky
              </a>
            </div>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/leandratejedor" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://huggingface.co/leandratejedor" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/hf-logo-pirate.svg" alt="Hugging Face" width={24} height={24} className="opacity-70 hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://replicate.com/leandratejedor" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/replicate.svg" alt="Replicate" width={24} height={24} className="opacity-70 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 