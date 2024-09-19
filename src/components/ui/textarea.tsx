import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  text: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ text, className, ...props }, ref) => {
    return (
      <div className="flex min-h-[80px] w-full rounded-6 border text-assistive-strong text-label-lg mobile:text-label-lg-m border-assistive-default bg-assistive-base p-6 ">
        <textarea
          className={cn(
            'flex min-h-[100px] w-full resize-none disabled:cursor-not-allowed  focus:outline-none focus:ring-0 bg-assistive-base',
            className,
          )}
          value={text}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
