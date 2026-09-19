'use client';

import { useState, useEffect } from 'react';
import { SystemInfoResponse } from '@/types/api';

export function useTelemetry(pollingIntervalMs = 5000) {
  const [telemetry, setTelemetry] = useState<SystemInfoResponse | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchTelemetry() {
      try {
        const response = await fetch('/api/info');
        if (response.ok) {
          const data = (await response.json()) as SystemInfoResponse;
          if (isMounted) {
            setTelemetry(data);
            setIsOnline(true);
          }
        } else {
          if (isMounted) setIsOnline(false);
        }
      } catch {
        if (isMounted) setIsOnline(false);
      }
    }

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, pollingIntervalMs);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [pollingIntervalMs]);

  return { telemetry, isOnline };
}
