'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PresetChips } from './PresetChips';
import { ResponseViewer } from './ResponseViewer';
import { PRESET_ENDPOINTS, PresetEndpoint } from '@/lib/constants';
import { ApiExecutionResult } from '@/types/api';
import { Check, ChevronDown } from 'lucide-react';

interface ApiConsoleProps {
  onExecute: (method: string, path: string, payload?: string) => Promise<ApiExecutionResult>;
  isLoading: boolean;
  result: ApiExecutionResult | null;
}

export const ApiConsole: React.FC<ApiConsoleProps> = ({ onExecute, isLoading, result }) => {
  const [activePresetId, setActivePresetId] = useState<string | null>('hello-get');
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [path, setPath] = useState('/hello');
  const [payload, setPayload] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectPreset = (preset: PresetEndpoint) => {
    setActivePresetId(preset.id);
    setMethod(preset.method);
    setPath(preset.path);
    setPayload(preset.payload || '');
    onExecute(preset.method, preset.path, preset.payload);
  };

  const handleManualExecute = () => {
    onExecute(method, path, payload);
  };

  return (
    <Card variant="dark" id="tester" className="scroll-mt-8">
      {/* SVG Dark Grid Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-45 [mask-image:radial-gradient(circle_at_50%_50%,rgba(0,0,0,1)_30%,rgba(0,0,0,0.25)_100%)] [-webkit-mask-image:radial-gradient(circle_at_50%_50%,rgba(0,0,0,1)_30%,rgba(0,0,0,0.25)_100%)]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="dark-tiles-next" width="48" height="48" patternUnits="userSpaceOnUse">
            <rect
              x="2"
              y="2"
              width="44"
              height="44"
              rx="3"
              fill="none"
              stroke="rgba(229, 197, 193, 0.05)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dark-tiles-next)" />
      </svg>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-start gap-9 lg:gap-12">
        {/* Left Column: Title, Architecture Checklist, Capability Tags */}
        <div className="flex flex-col">
          <h2 className="font-display text-2xl lg:text-[26px] font-bold text-white tracking-tight leading-snug mb-5">
            Interactive API Console &amp;
            <br />
            Architecture Capabilities
          </h2>

          <div className="flex flex-col gap-3.5 mb-6">
            <div className="flex items-center gap-2.5 font-sans text-[13.5px] font-medium text-pink">
              <span className="w-5 h-5 rounded-sm bg-blush flex items-center justify-center shrink-0">
              <span className="w-5 h-5 rounded-full bg-blush flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-navy stroke-[3]" />
              </span>
              <span>Layered Controller → Service → DTO Pattern</span>
            </div>

            <div className="flex items-center gap-2.5 font-sans text-[13.5px] font-medium text-pink">
              <span className="w-5 h-5 rounded-sm bg-blush flex items-center justify-center shrink-0">
              <span className="w-5 h-5 rounded-full bg-blush flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-navy stroke-[3]" />
              </span>
              <span>Jakarta Validation (@NotBlank, @Size)</span>
            </div>

            <div className="flex items-center gap-2.5 font-sans text-[13.5px] font-medium text-pink">
              <span className="w-5 h-5 rounded-sm bg-blush flex items-center justify-center shrink-0">
              <span className="w-5 h-5 rounded-full bg-blush flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-navy stroke-[3]" />
              </span>
              <span>RFC 7807 Global Exception Handling</span>
            </div>

            <div className="flex items-center gap-2.5 font-sans text-[13.5px] font-medium text-pink">
              <span className="w-5 h-5 rounded-sm bg-blush flex items-center justify-center shrink-0">
              <span className="w-5 h-5 rounded-full bg-blush flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-navy stroke-[3]" />
              </span>
              <span>Distributed Tracing with X-Correlation-ID</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="bg-white/10 text-white px-2.5 py-1 rounded-sm font-mono text-[11px]">Java 17 Records</span>
            <span className="bg-white/10 text-white px-2.5 py-1 rounded-sm font-mono text-[11px]">Actuator Probes</span>
            <span className="bg-white/10 text-white px-2.5 py-1 rounded-sm font-mono text-[11px]">MDC Logging</span>
            <span className="bg-white/10 text-white px-2.5 py-1 rounded-sm font-mono text-[11px]">CORS Enabled</span>
          </div>
        </div>

        {/* Right Column: Console Controls */}
        <div className="flex flex-col gap-3">
          {/* Preset Chips */}
          <PresetChips activePresetId={activePresetId} onSelectPreset={handleSelectPreset} />

          {/* Method and Path Input Row */}
          <div className="flex gap-2">
            {/* Professional Custom Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="h-full inline-flex items-center gap-2 bg-white/10 text-blush rounded-btn px-4 py-3 font-mono text-xs font-bold hover:bg-white/15 focus:outline-none transition-all border-0 select-none whitespace-nowrap"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                aria-label="Select HTTP Method"
              >
                <span>{method}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-pink transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute top-[calc(100%+6px)] left-0 min-w-[210px] bg-[#121C2F]/98 backdrop-blur-md rounded-btn p-1.5 shadow-2xl z-50 flex flex-col gap-1 border-0 animate-in fade-in slide-in-from-top-2 duration-150"
                  role="listbox"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMethod('GET');
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-chip text-left text-xs transition-colors border-0 ${
                      method === 'GET' ? 'bg-mauve/25 text-white' : 'text-pink hover:bg-white/10 hover:text-white'
                    }`}
                    role="option"
                    aria-selected={method === 'GET'}
                  >
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                      GET
                    </span>
                    <span className="flex-1 text-white/70">Read / Query</span>
                    {method === 'GET' && <Check className="w-3.5 h-3.5 text-blush" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMethod('POST');
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-chip text-left text-xs transition-colors border-0 ${
                      method === 'POST' ? 'bg-mauve/25 text-white' : 'text-pink hover:bg-white/10 hover:text-white'
                    }`}
                    role="option"
                    aria-selected={method === 'POST'}
                  >
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-mauve/25 text-blush">
                      POST
                    </span>
                    <span className="flex-1 text-white/70">Write / Command</span>
                    {method === 'POST' && <Check className="w-3.5 h-3.5 text-blush" />}
                  </button>
                </div>
              )}
            </div>

            <input
              type="text"
              value={path}
              onChange={(e) => {
                setPath(e.target.value);
                setActivePresetId(null);
              }}
              placeholder="ENTER ENDPOINT PATH"
              className="flex-1 bg-white/5 rounded-btn px-4 py-3 font-mono text-xs sm:text-[13px] text-white placeholder:text-pink/40 outline-none focus:bg-white/10 focus:ring-2 focus:ring-mauve border-0 transition-all"
              aria-label="Endpoint Path"
            />
          </div>

          {/* JSON Payload Editor (for POST/PUT) */}
          {method === 'POST' && (
            <textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              placeholder='JSON Request Payload (e.g. { "name": "Developer" })'
              rows={3}
              className="w-full bg-black/40 rounded-btn p-3 font-mono text-xs text-white placeholder:text-pink/30 outline-none focus:ring-2 focus:ring-mauve border-0 resize-y"
              aria-label="Request Payload"
            />
          )}

          {/* Submit Button */}
          <Button
            variant="secondary"
            size="md"
            onClick={handleManualExecute}
            isLoading={isLoading}
            className="w-full"
          >
            Execute Request
          </Button>

          {/* Live Response Drawer */}
          <ResponseViewer result={result} />
        </div>
      </div>
    </Card>
  );
};
