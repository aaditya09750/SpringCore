import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Container: React.FC<ContainerProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('w-full max-w-[1180px] mx-auto flex flex-col items-center', className)} {...props}>
      {children}
    </div>
  );
};
