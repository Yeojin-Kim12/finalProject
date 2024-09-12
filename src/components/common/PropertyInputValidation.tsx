import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '../ui/input';
import { WarningCircle } from '@phosphor-icons/react';
import { Button } from '../ui/button';

interface PropertyInputValidationProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  inputClassName?: string;
  forwardExtra?: string;
  trailingExtra?: React.ReactNode;
  buttonTitle?: React.ReactNode;
  buttonClassName?: string;
  buttonSize?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  buttonVariant?: 'primary' | 'outline' | 'assistive';
  onButtonClick?: () => void;
  buttonType?: 'submit' | 'reset' | 'button';
  errorMessage?: string;
  numberOnly?: boolean;
  optional?: boolean;
  children?: React.ReactNode;
  onBlur?: () => void;
}

const PropertyInputValidation = React.forwardRef<HTMLInputElement, PropertyInputValidationProps>(
  (
    {
      name,
      label,
      placeholder,
      type = 'text',
      className,
      inputClassName,
      forwardExtra,
      trailingExtra,
      buttonTitle,
      buttonClassName,
      buttonSize = 'xl',
      buttonVariant = 'primary',
      onButtonClick,
      buttonType,
      errorMessage,
      numberOnly = false,
      optional,
      children,
      onBlur,
    },
    ref,
  ) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (numberOnly) {
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
            }
            field.onChange(e);
          };
          return (
            <div className={`relative mb-4 ${className}`}>
              <div className="flex items-center gap-3">
                {label && (
                  <label className="block my-3 text-title-base font-bold text-static-default">{label}</label>
                )}
                {optional && <label className="text-accent-error text-detail-lg">선택</label>}
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 text-label-lg text-assistive-default">
                    {forwardExtra}
                  </div>
                  <Input
                    {...field}
                    ref={ref}
                    type={type}
                    value={field.value === 0 ? '' : field.value}
                    placeholder={placeholder}
                    onChange={handleInputChange}
                    onBlur={onBlur}
                    className={` ${
                      fieldState.error || errorMessage ? 'shadow-error focus:shadow-error' : ''
                    } ${forwardExtra && 'pl-[80px]'} ${trailingExtra && 'pr-[80px] text-end placeholder:text-start'} ${inputClassName}`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {trailingExtra && (
                      <div className="mr-3 text-label-lg text-assistive-default">{trailingExtra}</div>
                    )}
                    {(fieldState.error || errorMessage) && (
                      <WarningCircle size={24} className="text-accent-error" />
                    )}
                  </div>
                </div>
                {children}
                {buttonTitle && (
                  <Button
                    type={buttonType}
                    size={buttonSize}
                    variant={buttonVariant}
                    className={buttonClassName}
                    onClick={onButtonClick}>
                    {buttonTitle}
                  </Button>
                )}
              </div>
              {(fieldState.error || errorMessage) && (
                <p className="absolute left-0 mt-1 text-sm text-red-500">
                  {fieldState.error?.message || errorMessage}
                </p>
              )}
            </div>
          );
        }}
      />
    );
  },
);

PropertyInputValidation.displayName = 'PropertyInputValidation';

export default PropertyInputValidation;
