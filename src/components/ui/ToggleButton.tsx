import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'relative w-full flex justify-between p-6 rounded-5 shadow-default font-bold text-label-lg mobile:rounded-4',
  {
    variants: {
      variant: {
        default: 'bg-static-white !text-assistive-strong ',
        assistive: 'bg-assistive-base  shadow-assistive !text-assistive-strong ',
        primary: 'bg-primary-base shadow-focus !text-primary-default ',
        accent: ' bg-accent-base shadow-error !text-accent-strong ',
        strong: 'bg-primary-strong !text-static-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const ToggleButton = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, className }))} {...props} />
));

ToggleButton.displayName = TogglePrimitive.Root.displayName;

export { ToggleButton, toggleVariants };
