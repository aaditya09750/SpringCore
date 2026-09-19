'use client';

import React from 'react';
import { useTelemetry } from '@/hooks/use-telemetry';
import { formatUptime } from '@/lib/utils';
import { Cpu } from 'lucide-react';

export const TelemetryBadge: React.FC = () => {
  const { telemetry, isOnline } = useTelemetry(4000);

  if (!telemetry || !isOnline) {
    return (
      <div className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-btn bg-white/70 text-prune font-mono text-xs shadow-sm">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span>Connecting to Spring Boot...</span>
      </div>
    );
  }

  const { uptimeSeconds, memoryUsage } = telemetry;

  return (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-btn bg-white/80 text-navy font-mono text-xs shadow-sm border-0">
      <span className="w-5 h-5 rounded-full bg-mauve/15 flex items-center justify-center shrink-0">
        <Cpu className="w-3 h-3 text-mauve" />
      </span>
      <span>
        JVM: <strong>{formatUptime(uptimeSeconds)}</strong> · {memoryUsage.usedMb}MB / {memoryUsage.totalMb}MB
      </span>
    </div>
  );
};
