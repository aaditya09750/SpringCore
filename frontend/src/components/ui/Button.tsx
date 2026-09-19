'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-bold tracking-wide uppercase transition-all duration-150 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-mauve';

    const variants = {
      primary: 'bg-navy text-white hover:bg-navy-light hover:-translate-y-0.5 shadow-none border-0',
      secondary: 'bg-blush text-navy hover:bg-white hover:-translate-y-0.5 shadow-none border-0',
      ghost: 'bg-transparent text-prune hover:text-navy border-0',
    };

    const sizes = {
      sm: 'text-[11px] px-3 py-1.5 rounded-btn gap-1.5',
      md: 'text-xs px-5 py-2.5 rounded-btn gap-2',
      lg: 'text-sm px-6 py-3 rounded-btn gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
