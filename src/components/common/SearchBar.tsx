import React from 'react';
import { Input, InputProps } from '../ui/input';
import { cn } from '@/lib/utils';

export interface SearchBarProps extends InputProps {
  trigger?: () => Promise<boolean>;
  success?: string;
  errorMessage?: string;
  trailingExtra: React.ReactNode; // 아이콘 or 텍스트
}
const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ trailingExtra, className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          className={cn('placeholder:opacity-100 focus:placeholder:opacity-0', className)}
          {...props}
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 right-7 desktop:right-9 flex items-center">
          {trailingExtra}
        </div>
      </div>
    );
  },
);

export default SearchBar;
