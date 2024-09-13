import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  `relative flex flex-col justify-between rounded-4 px-6 py-3 text-label-sm font-bold`,
  {
    variants: {
      variant: {
        default: 'bg-static-white border text-assistive-strong',
        fill: 'px-7 bg-primary-strong border text-static-white ',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const ToggleSmall = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, className }))} {...props} />
));

ToggleSmall.displayName = TogglePrimitive.Root.displayName;

export { ToggleSmall, toggleVariants };
