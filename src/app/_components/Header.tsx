"use client";

import { useState, useEffect } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  const navigationItems = [
    { label: "Home", href: "/", hasDropdown: false },
    {
      label: "About",
      href: "#about",
      hasDropdown: true,
      dropdownItems: [
        { label: "Story", href: "#story" },
        { label: "Events", href: "#events" },
        { label: "Mentorship", href: "#mentorship" },
        { label: "Speaking", href: "#speaking" },
      ],
    },
    {
      label: "Blog",
      href: "/blog",
      hasDropdown: true,
      dropdownItems: [
        { label: "Build in Public", href: "/blog/build-in-public" },
        { label: "Tutorials", href: "/blog/tutorials" },
        { label: "Adventures", href: "/blog/adventures" },
      ],
    },
    {
      label: "Work with me",
      href: "#work-with-me",
      hasDropdown: true,
      dropdownItems: [
        { label: "Teaching", href: "#teaching" },
        { label: "Hackathons", href: "#hackathons" },
        { label: "Consulting", href: "#consulting" },
      ],
    },
  ];

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const openDropdown = (label: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const scheduleCloseDropdown = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay before closing
    setDropdownTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-canvas)]/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/" className="text-xl font-bold text-white hover:text-[var(--color-accent)]">
              Leandra
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={scheduleCloseDropdown}
                  >
                    <button
                      className="flex items-center space-x-1 text-[var(--color-text-secondary)] hover:text-white transition-colors"
                      onClick={() => handleDropdownToggle(item.label)}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {activeDropdown === item.label && (
                      <div 
                        className="absolute top-full left-0 mt-1 w-48 bg-[var(--color-canvas-subtle)] border border-white/10 rounded-lg shadow-lg py-2"
                        onMouseEnter={() => openDropdown(item.label)}
                        onMouseLeave={scheduleCloseDropdown}
                      >
                        {item.dropdownItems?.map((dropdownItem) => (
                          <a
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-interactive)] transition-colors"
                            onClick={closeDropdown}
                          >
                            {dropdownItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-[var(--color-text-secondary)] hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <a
              href="#contact"
              className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-full hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col space-y-2 mt-4">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        className="flex items-center justify-between w-full px-2 py-2 text-[var(--color-text-secondary)] hover:text-white transition-colors"
                        onClick={() => handleDropdownToggle(item.label)}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {activeDropdown === item.label && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <a
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              className="block px-2 py-1 text-[var(--color-text-secondary)] hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {dropdownItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-2 py-2 text-[var(--color-text-secondary)] hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <a
                href="#contact"
                className="mx-2 mt-4 bg-[var(--color-accent)] text-white px-4 py-2 rounded-full hover:bg-[var(--color-accent-hover)] transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
