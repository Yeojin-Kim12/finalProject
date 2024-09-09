import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const mobileStyle =
  'mobile:size-[90px] mobile:min-w-[90px] mobile:p-3 mobile:text-label-base-m mobile:rounded-4';
const toggleVariants = cva(
  `relative flex flex-col justify-between size-[160px] min-w-[160px] rounded-6 p-6 text-label-lg shadow-shadow ${mobileStyle}`,
  {
    variants: {
      variant: {
        default: 'bg-static-white !text-primary-strong',
        fill: 'bg-primary-strong !text-static-white ',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const CustomFilterToggleButton = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, className }))} {...props} />
));

CustomFilterToggleButton.displayName = TogglePrimitive.Root.displayName;

export { CustomFilterToggleButton, toggleVariants };
