import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'rose' | 'mauve' | 'neutral' | 'subtle';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-mono font-semibold uppercase tracking-wider rounded-chip transition-colors';

  const variants = {
    emerald: 'bg-[#ECFDF5] text-[#065F46] shadow-sm',
    rose: 'bg-[#FEF2F2] text-[#991B1B]',
    mauve: 'bg-mauve/20 text-mauve',
    neutral: 'bg-white/80 text-navy shadow-sm',
    subtle: 'bg-white/10 text-pink',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-[11.5px] px-3 py-1 gap-2',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
