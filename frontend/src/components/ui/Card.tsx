import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark';
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'light',
  children,
  ...props
}) => {
  const variants = {
    light: 'bg-gradient-to-br from-white via-blush-light to-[#F5E8E7] text-navy shadow-card-light',
    dark: 'bg-[radial-gradient(ellipse_at_85%_15%,_rgba(189,142,137,0.1)_0%,_transparent_60%),linear-gradient(145deg,#0E1627_0%,#121C2F_55%,#162238_100%)] text-white shadow-card-dark',
  };

  return (
    <div
      className={cn(
        'relative w-full rounded-card overflow-hidden p-8 sm:p-11 lg:p-14 border-0',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
