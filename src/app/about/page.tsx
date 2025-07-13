import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-bg-secondary)] scroll-smooth">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section id="intro" className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About Leandra
              </h1>
              <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
                Technologist and AI researcher living in San Francisco. Previously an MIT IDM Fellow and Forbes 30 Under 30 honoree studying at the intersection of Machine Learning and Human-Computer Interaction at MIT.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-full overflow-hidden">
                <Image
                  src="/images/leandra-sri-lanka.jpg"
                  alt="Leandra Tejedor in Sri Lanka"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Background & Philosophy */}
        <section id="background" className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Background</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              I previously co-founded <strong className="text-white">Vidcode</strong>, an award-winning creative coding platform that reached over 10 million learners globally before being acquired. The platform was built around what students were asking to build, not what tech companies were saying they needed from workers.
            </p>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              I think technology you (yes, you) build can change the world. Really. We see it all the time in ways that make things better (malaria, HIV) and make them worse (Meta in Myanmar) every day. This belief hasn't changed since my first startup.
            </p>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              I believe in open source technology and having a{' '}
              <a 
                href="http://www.catb.org/jargon/html/H/hacker.html" 
                className="text-[var(--color-accent)] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                hacker mentality
              </a>. I've taken to heart what Paul Graham says about 'staying upwind' - working on interesting and new technology - and working with the smartest (and kindest, and ambitious, and authentic) people you can find.
            </p>
          </div>
        </section>

        {/* Featured In */}
        <section id="press" className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Featured In</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 mb-12">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Coverage</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://www.wired.com/story/sundai-club-generative-ai-hackathon-group/" className="text-[var(--color-accent)] hover:underline" target="_blank" rel="noopener noreferrer">
                    Wired: Sundai Club - Generative AI Hackathon Group
                  </a>
                </li>
                <li>
                  <a href="https://techcrunch.com/2017/07/07/yc-backed-vidcode-raises-1-5m-to-teach-teens-to-code-using-snapchat-filters-videos-memes-and-more/" className="text-[var(--color-accent)] hover:underline" target="_blank" rel="noopener noreferrer">
                    TechCrunch: YC-backed Vidcode raises $1.5M to teach teens to code
                  </a>
                </li>
                <li>
                  <a href="https://www.teenvogue.com/story/learn-to-code-video-app" className="text-[var(--color-accent)] hover:underline" target="_blank" rel="noopener noreferrer">
                    Teen Vogue: Learn to Code Video App
                  </a>
                </li>
                <li>
                  <a href="https://www.vice.com/en/article/bey-script-uses-a-clever-beyonce-analogy-to-teach-non-techies-how-to-code/" className="text-[var(--color-accent)] hover:underline" target="_blank" rel="noopener noreferrer">
                    Vice: Beyoncé Analogy to Teach Non-Techies How to Code
                  </a>
                </li>
                <li>
                  <a href="https://abcnews.go.com/GMA/Living/girl-scouts-reveal-42-badges-girls-control/story?id=64294186" className="text-[var(--color-accent)] hover:underline" target="_blank" rel="noopener noreferrer">
                    ABC News: Girl Scouts Reveal 42 New Badges
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Recognition</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://www.forbes.com/profile/leandra-tejedor/" className="text-[var(--color-accent)] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Forbes 30 Under 30</a>
                  <p className="text-[var(--color-text-secondary)] text-sm">Education category for co-founding Vidcode</p>
                </li>
                <li>
                  <a href="https://arts.mit.edu/2022-15kcreativeartscomp/" className="text-[var(--color-accent)] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">MIT $15K Creative Arts Competition</a>
                  <p className="text-[var(--color-text-secondary)] text-sm">Winner for Flux, AI-powered creative tools</p>
                </li>
                <li>
                  <span className="text-[var(--color-accent)] font-semibold">James Dyson Award</span>
                  <p className="text-[var(--color-text-secondary)] text-sm">For Apt design project (also recognized by Fast Company)</p>
                </li>
                <li>
                  <span className="text-[var(--color-accent)] font-semibold">Parents Choice Award 2020</span>
                  <p className="text-[var(--color-text-secondary)] text-sm">For Vidcode platform</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Teaching */}
        <section id="teaching" className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Teaching</h2>
          <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            I've taught classes and workshops on technology + creativity all around the world: a Makerspace in Sri Lanka during a political crisis, a school in a Township outside of Cape Town, a pop-up structure by the Salton Sea, and guided high school startup teams made up of Israelis and Palestinians in Jerusalem during wartime.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Highlighted Programs</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[var(--color-accent)] font-semibold">Cyber Arts Camp</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm italic">
                    "Cyber Arts is one of my favorite new startups. They had put a shipping container next to the Mississippi River and young people were inside learning coding, tech, and internet of things. It was fabulous!"
                  </p>
                  <p className="text-[var(--color-text-secondary)] text-xs mt-1">
                    - Megan Smith, former CTO of the United States
                  </p>
                </div>
                <div>
                  <h4 className="text-[var(--color-accent)] font-semibold">Global Startup Lab - Uruguay</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm">
                    Teaching creative AI and live-coding JavaScript to students in Paysandú
                  </p>
                </div>
                <div>
                  <h4 className="text-[var(--color-accent)] font-semibold">MIT Prison Education Program</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm">
                    Computer Science education for incarcerated individuals
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Workshops</h3>
              <ul className="space-y-2 text-[var(--color-text-secondary)]">
                <li>• Agents Workshop @ Frontier Tower</li>
                <li>• ITP Camp Workshops</li>
                <li>• Low-tech VR Starter Kit</li>
                <li>• Mars College</li>
                <li>• MEET Summer Startup Camp 2024</li>
                <li>• MIT AI Club - Gen AI & Agents</li>
                <li>• Ed Games Expo</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Events & Hackathons */}
        <section id="events" className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Events & Hackathons</h2>
          <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            I was featured in Wired for my work organizing AI hackathons at MIT. I do this a lot. Here are some of my favorites:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Events I've Organized</h3>
              <ul className="space-y-2 text-[var(--color-text-secondary)]">
                <li>• <span className="text-[var(--color-accent)]">Sundai Club</span> - largest AI Hacker Club in Cambridge, MA</li>
                <li>• MIT AI Conference AI Agents Hackathon</li>
                <li>• AI Agents Workshops</li>
                <li>• Women Who AI Build Day</li>
                <li>• Vidcode Coding Club (during COVID)</li>
                <li>• Arcade Jam Shenzhen</li>
                <li>• MDM Build Days</li>
                <li>• Spacycloud Livecoding Festival</li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Mentored & Judged</h3>
              <ul className="space-y-2 text-[var(--color-text-secondary)]">
                <li>• ForgeHacks</li>
                <li>• Hudson Valley Tech Fest 2019 + 2020</li>
                <li>• HackMIT 2022 & 2023</li>
                <li>• Reality Hack at MIT Startup Track</li>
                <li>• C10 Labs - Startup Mentor & AI Fellow</li>
                <li>• & Many others...</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interests */}
        <section id="interests" className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Interests</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Makerspaces</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                I've traveled all around the world to help build and activate makerspaces:
              </p>
              <ul className="space-y-2 text-[var(--color-text-secondary)]">
                <li>• Paysandú, Uruguay</li>
                <li>• Batticaloa, Sri Lanka</li>
                <li>• Chengdu, China</li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Creative Technology</h3>
              <p className="text-[var(--color-text-secondary)]">
                Exploring the intersection of art, technology, and human expression through interactive installations, generative art, and creative coding.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Performances</h3>
              <p className="text-[var(--color-text-secondary)]">
                I spent time performing at LiveCoding events around the world, creating music and visuals through code in real-time.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Let's Connect</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Interested in collaborating on creative technology projects or discussing AI research?
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="mailto:hello@leandratejedor.com" 
                className="bg-[var(--color-accent)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Get In Touch
              </a>
              <a 
                href="/timeline" 
                className="border border-[var(--color-accent)] text-[var(--color-accent)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-accent)] hover:text-white transition-all"
              >
                View Timeline
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 