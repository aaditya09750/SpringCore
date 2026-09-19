'use client';

import React, { useState } from 'react';
import { ApiExecutionResult } from '@/types/api';
import { Badge } from '@/components/ui/Badge';
import { Copy, Check } from 'lucide-react';

interface ResponseViewerProps {
  result: ApiExecutionResult | null;
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(result.rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-2 bg-navy/90 rounded-btn p-4 font-mono text-xs shadow-inner animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-pink/10 text-[11px] text-pink">
        <div className="flex items-center gap-2">
          <Badge variant={result.isOk ? 'emerald' : 'rose'} size="sm">
            {result.status} {result.statusText}
          </Badge>
          <span className="text-white/60">{result.durationMs} ms</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] text-pink/80 hover:text-white transition-all"
          title="Copy response body"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {result.correlationId && (
        <div className="text-[11px] text-mauve mb-2">
          <span>X-Correlation-ID: </span>
          <span className="text-white/80">{result.correlationId}</span>
        </div>
      )}

      <pre className="text-white/90 overflow-x-auto max-h-56 leading-relaxed whitespace-pre-wrap break-all">
        {result.rawText}
      </pre>
    </div>
  );
};
