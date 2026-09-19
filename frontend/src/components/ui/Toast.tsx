'use client';

import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string | null;
  isError?: boolean;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isError = false, isVisible }) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-btn shadow-2xl transition-all duration-300 pointer-events-none',
        'bg-navy text-white text-[13px] font-medium border-0',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      )}
      role="status"
      aria-live="polite"
    >
      {isError ? (
        <span className="w-6 h-6 rounded-full bg-rose-500/15 flex items-center justify-center shrink-0">
          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
        </span>
      ) : (
        <span className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        </span>
      )}
      <span>{message}</span>
    </div>
  );
};
