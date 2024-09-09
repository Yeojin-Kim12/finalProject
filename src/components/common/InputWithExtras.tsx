import React from 'react';
import { Input, InputProps } from '../ui/input';
import { InputWithValidation } from './InputWithValidation';
import { cn } from '@/lib/utils';
import { z } from 'zod';

// 아이콘 or 텍스트가 뒤에 오는 InputText
export interface InputWithExtrasProps extends InputProps {
  validationSchema?: z.ZodSchema<any>; // 유효성 검사를 위한 스키마 - 선택
  success?: string;
  errorMessage?: string;
  trailingExtra: React.ReactNode; // 아이콘 or 텍스트
}

const InputWithExtras = React.forwardRef<HTMLInputElement, InputWithExtrasProps>(
  ({ validationSchema, success, errorMessage, trailingExtra, className, ...props }, ref) => {
    // 유효성 검사가 필요한 경우
    if (validationSchema) {
      return (
        <InputWithValidation
          ref={ref}
          validationSchema={validationSchema}
          success={success || ''}
          errorMessage={errorMessage || ''}
          className={className}
          {...props}>
          {trailingExtra}
        </InputWithValidation>
      );
    }

    // 검색bar
    return (
      <div className="relative w-full">
        <Input ref={ref} className={cn('', className)} {...props} />
        <div className="absolute top-1/2 transform -translate-y-1/2 right-7 desktop:right-9 flex items-center">
          {trailingExtra}
        </div>
      </div>
    );
  },
);

InputWithExtras.displayName = 'InputWithExtras';

export { InputWithExtras };
