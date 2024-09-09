import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'flex items-center justify-center size-[28px] font-bold !text-static-white rounded-4 text-label-sm',
  {
    variants: {
      variant: {
        default: 'bg-assistive-default',
        primary: 'bg-primary-default',
        accent: 'bg-accent-strong',
        assistive: 'bg-assistive-strong',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  children: React.ReactNode | number;
}

function KeywordBadge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
}

export { KeywordBadge, badgeVariants };
