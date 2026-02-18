"use client";

import Image from 'next/image';
import { Card } from '~/app/_components/ui/Card';
import { Button } from '~/app/_components/ui/Button';

export default function About() {

  return (
    <div className="min-h-screen bg-[var(--color-canvas)]">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section with Main Image */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                About Me
              </h1>

              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  I'm an independent researcher, educator, and technology-builder.
                </p>

                <p>
                  I believe technology has world-changing potential when it's built with intention and empathy.
                  This philosophy hasn't changed since my first startup where we designed around what students wanted to build,
                  not what tech companies were saying they needed from future workers.
                </p>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/about-page-main.JPG"
                alt="Leandra Tejedor"
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 rounded-lg border-2 border-[var(--color-accent)] opacity-20"></div>
            </div>
          </div>
        </section>



        {/* Recognition & Features */}
        <section className="mb-20 py-8 border-t border-b border-[var(--color-border)]">
          <div className="space-y-4 text-lg leading-relaxed text-center mb-8">
            <p>
              Winner of the <a href="https://www.jamesdysonaward.org/en-US/2022/project/apt-accessible-pregnancy-test/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">James Dyson Award</a>, <a href="https://www.prototypesforhumanity.com/project/apt/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">Prototypes for Humanity</a>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
            <a href="https://www.forbes.com/30-under-30-2017/education/#2d956f5a5e71" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              <Image src="/logos/forbes_logo.svg" alt="Forbes" width={100} height={30} className="filter brightness-0 invert" />
            </a>
            <a href="https://www.wired.com/story/sundai-club-generative-ai-hackathon-group/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              <Image src="/logos/wired_logo.svg" alt="WIRED" width={100} height={30} className="filter brightness-0 invert" />
            </a>
            <a href="https://abcnews.go.com/GMA/Living/girl-scouts-reveal-42-badges-girls-control/story?id=64294186" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              <Image src="/logos/abc_news_logo.svg" alt="ABC News" width={100} height={30} className="filter brightness-0 invert" />
            </a>
            <a href="https://techcrunch.com/2017/07/07/yc-backed-vidcode-raises-1-5m-to-teach-teens-to-code-using-snapchat-filters-videos-memes-and-more/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              <Image src="/logos/techcrunch.svg" alt="TechCrunch" width={120} height={30} className="filter brightness-0 invert" />
            </a>
            <a href="https://www.teenvogue.com/story/learn-to-code-video-app" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              <Image src="/logos/teen_vogue_logo.svg" alt="Teen Vogue" width={100} height={30} className="filter brightness-0 invert" />
            </a>
            <a href="https://www.vice.com/en/article/bey-script-uses-a-clever-beyonce-analogy-to-teach-non-techies-how-to-code/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              <Image src="/logos/vice_logo.svg" alt="Vice" width={80} height={30} className="filter brightness-0 invert" />
            </a>
          </div>
        </section>

        {/* Previously Section */}
        <section className="mb-20">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8">Previously</h2>
          <div className="space-y-6">
            <div className="bg-[var(--color-canvas-subtle)] border border-[var(--color-canvas-muted)] rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">MIT</h3>
                <span className="text-sm text-[var(--color-accent)] font-bold">2021-2024</span>
              </div>
              <p className="text-[var(--color-text-secondary)]">
                Dual Master's in Computer Science and Human-centered Design. Research focused on creative generative AI for 3D models and ML × HCI applications.
              </p>
            </div>

            <div className="bg-[var(--color-canvas-subtle)] border border-[var(--color-canvas-muted)] rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Vidcode Co-founder & CPO</h3>
                <span className="text-sm text-[var(--color-accent)] font-bold">2014-2021</span>
              </div>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Built a creative coding platform and computer science curriculum used by over 10 million students globally. Went through Y Combinator, <a href="https://techcrunch.com/2017/07/07/yc-backed-vidcode-raises-1-5m-to-teach-teens-to-code-using-snapchat-filters-videos-memes-and-more/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">raised $1.5M</a>, and successfully exited. Featured in <a href="https://www.forbes.com/30-under-30-2017/education/#2d956f5a5e71" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">Forbes 30 Under 30</a>.
              </p>
            </div>
          </div>
        </section>

        {/* Teaching & Impact Section */}
        <section className="mb-20">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8">Teaching</h2>
          <p className="text-lg leading-relaxed mb-12">
            I've taught classes and workshops on technology + creativity all around the world: a Makerspace in Sri Lanka during a political crisis,
            a school in a Township outside of Cape Town, a pop-up structure by the Salton Sea, and guided high school startup teams made up of
            Israelis and Palestinians in Jerusalem during wartime.
          </p>

          {/* Teaching Photo Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="relative group">
              <Image
                src="/images/teaching-in-paysandu-uruguay.jpg"
                alt="Teaching in Paysandu, Uruguay"
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-semibold">Teaching in Uruguay</h4>
                  <p className="text-sm">Paysandu School Workshop</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <Image
                src="/images/paysandu-school-entrance.jpg"
                alt="Paysandu School Entrance, Uruguay"
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-semibold">School in Uruguay</h4>
                  <p className="text-sm">Global Education Initiative</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <Image
                src="/images/teaching-mars-ca.jpg"
                alt="Teaching in Mars, California"
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-semibold">Mars, California</h4>
                  <p className="text-sm">Desert Workshop</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Teaching Image */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <Image
                src="/images/teaching-sf.jpeg"
                alt="Teaching workshop in San Francisco"
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded">
                San Francisco Workshop
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="interactive" className="card h-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className="text-xl font-semibold text-white"><a href="https://www.cyberarts.io/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">Cyber Arts Camp</a></h3>
                <span className="text-sm text-[var(--color-accent)] font-bold">2021</span>
              </div>
              <div className="mb-3">
                <span className="text-xs font-semibold bg-[var(--color-accent-subtle)] text-[var(--color-accent)] rounded-sm px-2 py-1">
                  Cofounder
                </span>
              </div>
              <p className="text-[var(--color-text-secondary)] mb-3">
                Co-founded between the Vidcode acquisition and MIT. Taught 100 students in bioengineering and cybersecurity that first summer. Still going strong.
              </p>
              <p className="text-[var(--color-text-secondary)] text-sm italic">
                "One of my favorite new startups" - Megan Smith, former CTO of the United States
              </p>
            </Card>

            <Card variant="interactive" className="card h-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className="text-xl font-semibold text-white"><a href="https://www.sundai.club/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">Sundai Club</a></h3>
                <span className="text-sm text-[var(--color-accent)] font-bold">2024</span>
              </div>
              <div className="mb-3">
                <span className="text-xs font-semibold bg-[var(--color-accent-subtle)] text-[var(--color-accent)] rounded-sm px-2 py-1">
                  Cofounder
                </span>
              </div>
              <p className="text-[var(--color-text-secondary)] mb-3">
                The largest AI hacker club in Boston. Co-founded in my last semester at MIT, now an active non-profit with hundreds of hackers taking part. <a href="https://www.wired.com/story/sundai-club-generative-ai-hackathon-group/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">Featured in WIRED</a>.
              </p>
            </Card>
          </div>
        </section>

        {/* Papers & Research */}
        <section className="mb-20">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8">Papers</h2>
          <div className="space-y-6">
            <div className="bg-[var(--color-canvas-subtle)] border border-[var(--color-canvas-muted)] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Stylizing 3D Models With Generative AI for Fabrication</h3>
              <p className="text-sm text-[var(--color-accent)] font-bold mb-2">MIT Master's Thesis</p>
              <p className="text-[var(--color-text-secondary)]">
                <a href="https://dspace.mit.edu/handle/1721.1/163692" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">View thesis</a>
              </p>
            </div>

            <div className="bg-[var(--color-canvas-subtle)] border border-[var(--color-canvas-muted)] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">MechStyle: Augmenting Generative AI with Mechanical Simulation to Create Stylized and Structurally Viable 3D Models</h3>
              <p className="text-sm text-[var(--color-accent)] font-bold mb-2">SCF '25</p>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                Faraz Faruqi, Amira Abdel-Rahman, <span className="text-white">Leandra Tejedor</span>, Martin Nisser, Jiaji Li, Vrushank Phadnis, Varun Jampani, Neil Gershenfeld, Megan Hofmann, Stefanie Mueller
              </p>
              <p className="text-[var(--color-text-secondary)]">
                <a href="https://www.youtube.com/watch?v=3BEZYZ86DNQ" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">Watch video</a>
              </p>
            </div>

            <div className="bg-[var(--color-canvas-subtle)] border border-[var(--color-canvas-muted)] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Style2Fab: Functionality-Aware Segmentation for Fabricating Personalized 3D Models with Generative AI</h3>
              <p className="text-sm text-[var(--color-accent)] font-bold mb-2">UIST '23</p>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                Faraz Faruqi, Ahmed Katary, Tarik Hasic, Amira Abdel-Rahman, Nayeemur Rahman, <span className="text-white">Leandra Tejedor</span>, Mackenzie Leake, Megan Hofmann, Stefanie Mueller
              </p>
              <p className="text-[var(--color-text-secondary)]">
                <a href="https://doi.org/10.1145/3586183.3606723" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">DOI</a>
                <span className="mx-2">·</span>
                <a href="https://www.youtube.com/watch?v=wGp1vMNsM3Q" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">Watch video</a>
              </p>
            </div>

            <div className="bg-[var(--color-canvas-subtle)] border border-[var(--color-canvas-muted)] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">SAP-sLDA: An Interpretable Interface for Exploring Unstructured Text</h3>
              <p className="text-sm text-[var(--color-accent)] font-bold mb-2">Acknowledged contributor</p>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                Contributed initial work on the project including dataset collection and data preprocessing techniques.
              </p>
              <p className="text-[var(--color-text-secondary)]">
                <a href="https://arxiv.org/abs/2308.01420" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">arXiv</a>
              </p>
            </div>
          </div>
        </section>

        {/* Featured Podcasts */}
        <section className="mb-20">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8">Featured Podcasts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://www.buzzsprout.com/1646461/episodes/7937611" target="_blank" rel="noopener noreferrer" className="block">
              <Card variant="interactive" className="card h-full">
                <div className="mb-3">
                  <span className="text-xs font-semibold bg-[var(--color-accent-subtle)] text-[var(--color-accent)] rounded-sm px-2 py-1">
                    Age of Awareness Podcast
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Ep. 1 - Art, Startups, and Teaching Kids to Code</h3>
                <p className="text-[var(--color-text-secondary)]">
                  A conversation with Vidcode Cofounder Leandra Tejedor
                </p>
              </Card>
            </a>

            <a href="https://soundcloud.com/chris-davis-276158228/vidcode-designing-for-girls-coding-for-all" target="_blank" rel="noopener noreferrer" className="block">
              <Card variant="interactive" className="card h-full">
                <div className="mb-3">
                  <span className="text-xs font-semibold bg-[var(--color-accent-subtle)] text-[var(--color-accent)] rounded-sm px-2 py-1">
                    Chris Davis
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Vidcode: Designing for Girls, Coding for All</h3>
                <p className="text-[var(--color-text-secondary)]">
                  On building inclusive coding education
                </p>
              </Card>
            </a>
          </div>
        </section>

        {/* Creative Work Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Beyond traditional tech work, I explore the intersection of creativity and technology through live coding performances,
                  generative art, and experimental interfaces. This creative practice informs my approach to building more human-centered systems.
                </p>

                <p>
                  Recently exhibited at <a href="https://thecvf-art.com/project/the-meaning-of-mirror/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">CVPR 2025 Art Gallery</a> with "The Meaning of Mirror" -
                  a self-portrait exploring generative AI through meaningful visual grammar.
                </p>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/livecoding-performing.jpg"
                alt="Live coding performance"
                width={600}
                height={400}
                className="w-full h-80 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded">
                Live Coding Performance
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
