'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TelemetryBadge } from './TelemetryBadge';
import { ArrowRight } from 'lucide-react';

interface HeroCardProps {
  onTestHello: () => void;
  isLoading?: boolean;
}

export const HeroCard: React.FC<HeroCardProps> = ({ onTestHello, isLoading }) => {
  return (
    <Card variant="light" className="mb-6">
      {/* SVG Rounded Tile Grid Layer with Soft Gradient Mask */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-65 [mask-image:linear-gradient(to_right,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.95)_50%,rgba(0,0,0,0.4)_100%)] [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.95)_50%,rgba(0,0,0,0.4)_100%)]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="light-tiles-next" width="48" height="48" patternUnits="userSpaceOnUse">
            <rect
              x="2"
              y="2"
              width="44"
              height="44"
              rx="3"
              fill="none"
              stroke="rgba(127, 98, 105, 0.12)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#light-tiles-next)" />
      </svg>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center gap-9 lg:gap-12">
        {/* Left Column: Eyebrow, Heading, Description, Actions */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-prune mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-mauve" />
            <span>SpringCore · Production Architecture Active</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-4">
            Hello World!
            <br />
            Enterprise setup is live.
          </h1>

          <p className="font-sans text-[15px] leading-relaxed text-prune-dark max-w-md mb-7">
            Your Spring Boot service is running with clean layered architecture, immutable Java 17 DTOs, Bean
            Validation, Actuator health probes, and centralized error handling.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
            <Button variant="primary" size="md" onClick={onTestHello} isLoading={isLoading} className="group">
              <span>Test GET /hello</span>
              <ArrowRight className="w-3.5 h-3.5 text-pink group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <TelemetryBadge />
          </div>
        </div>

        {/* Right Column: Status Code 200 & Pulsing Indicator */}
        <div className="flex flex-col items-center justify-center order-first lg:order-last">
          <div
            className="font-display text-7xl sm:text-8xl lg:text-[146px] font-extrabold text-prune-num tracking-tighter leading-none select-none"
            aria-label="HTTP Status Code 200"
          >
            200
          </div>
          <div className="mt-3.5 inline-flex items-center gap-2 bg-white/90 text-navy rounded-sm px-3.5 py-1 font-mono text-[11.5px] font-semibold tracking-wider uppercase shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Actuator · Health UP</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
