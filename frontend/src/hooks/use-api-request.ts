'use client';

import { useState, useCallback } from 'react';
import { ApiExecutionResult } from '@/types/api';
import { executeApiRequest } from '@/lib/api-client';

export function useApiRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApiExecutionResult | null>(null);

  const execute = useCallback(
    async (method: string, path: string, payload?: string) => {
      setIsLoading(true);
      try {
        const res = await executeApiRequest(method, path, payload);
        setResult(res);
        return res;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clear = useCallback(() => {
    setResult(null);
  }, []);

  return {
    isLoading,
    result,
    execute,
    clear,
  };
}
