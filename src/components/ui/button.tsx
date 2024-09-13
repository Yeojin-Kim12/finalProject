import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(`inline-flex items-center justify-center whitespace-nowrap font-bold  `, {
  variants: {
    variant: {
      primary:
        'bg-primary-default shadow-focus !text-static-white active:bg-primary-alternative disabled:bg-assistive-alternative disabled:shadow-none',
      outline:
        'bg-static-white shadow-[inset_0_0_0_1px_#204AE5] !text-primary-default active:bg-primary-base',
      assistive: 'bg-static-white shadow-default !text-static-default active:!text-assistive-default',
      disabled: 'bg-assistive-alternative !text-assistive-strong',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      xl: 'px-8 py-5 rounded-5 text-label-lg mobile:text-label-lg-m',
      lg: 'px-7 py-4 rounded-5 text-label-lg mobile:text-label-lg-m',
      md: 'px-7 py-4 rounded-5 text-label-base mobile:text-label-base-m',
      sm: 'px-7 py-4 rounded-4 text-label-sm mobile:text-label-sm-m',
      xs: 'px-4 py-3 rounded-4 text-label-xs mobile:text-label-xs-m',
      icon: 'h-9 w-9',
      default: 'h-9 px-4 py-2',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'xl',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
