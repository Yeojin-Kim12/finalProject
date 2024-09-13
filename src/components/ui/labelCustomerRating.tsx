import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const labelVariants = cva('inline-flex items-center justify-center whitespace-nowrap font-bold', {
  variants: {
    size: {
      s: 'px-2 py-1 rounded-2 text-[15px] font-normal',
      m: 'px-3 py-2 rounded-4 text-[17px]',
      l: 'px-5 py-2 rounded-4 text-[19px]',
    },
    variant: {
      elevated: 'bg-effect-elevated text-highlight-normal',
      assistive: 'bg-assistive-alternative text-effect-elevated',
      accent: 'bg-accent-base text-accent-strong',
      highlight: 'bg-highlight-base text-highlight-strong',
      primary: 'bg-primary-base text-primary-default',
      secondary: 'bg-secondary-base text-secondary-default',
      space: 'pl-6 pr-5 py-3 bg-assistive-base text-effect-elevated font-normal rounded-full !text-label-lg', // size L만 사용
    },
  },
  defaultVariants: {
    size: 'l',
    variant: 'elevated',
  },
});

export interface LabelProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof labelVariants> {
  keyword?: string;
}

type VariantType = 'elevated' | 'assistive' | 'accent' | 'highlight' | 'primary' | 'secondary' | 'space';

const LabelCustomerRating = React.forwardRef<HTMLSpanElement, LabelProps>(
  ({ className, size, variant, keyword, ...props }, ref) => {
    const computedVariant: VariantType = keyword ? getVariantByKeyword(keyword) : variant || 'elevated';
    return (
      <span
        className={cn(labelVariants({ size, variant: computedVariant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

LabelCustomerRating.displayName = 'Label';

export { LabelCustomerRating, labelVariants };

// 키워드에 따른 스타일 변경
const getVariantByKeyword = (keyword: string): VariantType => {
  const tierVariants = {
    S: 'highlight',
    A: 'accent',
    B: 'primary',
    C: 'secondary',
    D: 'assistive',
  } as const;

  if (keyword in tierVariants) {
    return tierVariants[keyword as keyof typeof tierVariants];
  }

  return 'elevated';
};
