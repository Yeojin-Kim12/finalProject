import React, { ChangeEvent } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { WarningCircle } from '@phosphor-icons/react';

interface PropertyInputProps {
  value: string;
  error?: boolean;
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
  onChange: (value: string) => void;
}

const PropertyInput = React.forwardRef<HTMLInputElement, PropertyInputProps>(
  (
    {
      value,
      label,
      error,
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
      children,
      onChange,
    },
    ref,
  ) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event.target.value);
      }
    };
    return (
      <div className={`relative mb-4 ${className}`}>
        <div className="flex items-center gap-3">
          {label && (
            <label className="block my-3 text-title-base font-bold text-static-default">{label}</label>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 text-label-lg text-assistive-default">
              {forwardExtra}
            </div>
            <Input
              ref={ref}
              type={type}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
              className={` ${error ? 'shadow-error focus:shadow-error' : ''} ${inputClassName} pr-10`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-5">
              {trailingExtra && (
                <div className="mr-3 text-label-lg text-assistive-default">{trailingExtra}</div>
              )}
              {error && <WarningCircle size={24} className="text-accent-error" />}
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
      </div>
    );
  },
);

PropertyInput.displayName = 'PropertyInput';

export default PropertyInput;
