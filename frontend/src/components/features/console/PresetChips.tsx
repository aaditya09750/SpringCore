'use client';

import React from 'react';
import { PRESET_ENDPOINTS, PresetEndpoint } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface PresetChipsProps {
  activePresetId: string | null;
  onSelectPreset: (preset: PresetEndpoint) => void;
}

export const PresetChips: React.FC<PresetChipsProps> = ({ activePresetId, onSelectPreset }) => {
  return (
    <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Predefined Endpoints">
      {PRESET_ENDPOINTS.map((preset) => {
        const isActive = activePresetId === preset.id;
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelectPreset(preset)}
            className={cn(
              'px-2.5 py-1 rounded-chip font-mono text-[11px] transition-all border-0 flex items-center gap-1.5',
              isActive
                ? 'bg-mauve/30 text-white font-medium'
                : 'bg-blush/[0.08] text-pink hover:bg-mauve/20 hover:text-white'
            )}
          >
            <span className={cn('font-bold', isActive ? 'text-white' : 'text-mauve')}>{preset.method}</span>
            <span>{preset.path.split('?')[0]}</span>
          </button>
        );
      })}
    </div>
  );
};
