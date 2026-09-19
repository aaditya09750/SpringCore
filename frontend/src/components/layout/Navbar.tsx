'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onExploreClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onExploreClick }) => {
  return (
    <header className="sticky top-4 z-50 w-full flex justify-center mb-6 sm:mb-8">
      <nav
        className="bg-white/95 backdrop-blur-md rounded-nav shadow-nav px-3.5 py-2 flex items-center gap-7 sm:gap-9 transition-shadow hover:shadow-md border-0"
        aria-label="Main Navigation"
      >
        {/* Brand Mark */}
        <Link href="/" className="flex items-center" title="SpringCore">
          <div className="w-8 h-8 rounded-full bg-navy text-blush flex items-center justify-center transition-transform hover:scale-105">
            <Zap className="w-4 h-4 fill-current" />
          </div>
        </Link>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-6 list-none">
          <li>
            <Link
              href="/"
              className="font-sans text-xs font-semibold uppercase tracking-wider text-navy transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#tester"
              className="font-sans text-xs font-semibold uppercase tracking-wider text-prune hover:text-navy transition-colors"
            >
              API Console
            </a>
          </li>
          <li>
            <a
              href="/actuator/health"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs font-semibold uppercase tracking-wider text-prune hover:text-navy transition-colors"
            >
              Health Probe
            </a>
          </li>
          <li>
            <a
              href="/api/info"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs font-semibold uppercase tracking-wider text-prune hover:text-navy transition-colors"
            >
              Telemetry
            </a>
          </li>
          <li>
            <a
              href="/hello"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs font-semibold uppercase tracking-wider text-prune hover:text-navy transition-colors"
            >
              Hello Route
            </a>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a
            href="/actuator/info"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs font-semibold uppercase tracking-wider text-prune hover:text-navy transition-colors hidden sm:inline"
          >
            Actuator
          </a>
          <button
            onClick={onExploreClick}
            className="bg-navy text-white rounded-btn px-4 py-2 flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider hover:bg-navy-light hover:-translate-y-0.5 transition-all group border-0 shadow-none"
          >
            <span>Explore APIs</span>
            <ArrowRight className="w-3.5 h-3.5 text-pink group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </nav>
    </header>
  );
};
