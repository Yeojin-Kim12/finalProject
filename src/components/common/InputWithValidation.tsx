import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { Input } from '../ui/input';
import { type InputFieldProps } from './InputField';

export interface InputWithValidationProps extends InputFieldProps {
  trigger?: () => Promise<boolean>;
  errorMessage?: string;
  success: string;
  children?: React.ReactNode;
  recordValue: string;
}

const InputWithValidation = React.forwardRef<HTMLInputElement, InputWithValidationProps>(
  ({ className, onChange, success, children, trigger, recordValue, ...props }, ref) => {
    const [value, setValue] = React.useState<string>(recordValue);
    const [isValid, setIsValid] = React.useState<boolean | null>(null);
    const [isMessage, setIsMessage] = React.useState('');

    const validateValue = async () => {
      try {
        if (trigger) {
          const result = await trigger();
          if (result) {
            setIsMessage(success);
            setIsValid(true);
          } else {
            setIsMessage('');
            setIsValid(false);
          }
        }
      } catch (error) {
        console.error('Validation trigger failed:', error);
        setIsMessage('Validation failed');
        setIsValid(false);
      }
    };

    React.useEffect(() => {
      if (value) {
        validateValue();
      }
    }, []);

    const handleValueChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      await validateValue();
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          value={value}
          onChange={(e) => {
            onChange && onChange(e);
            handleValueChange(e);
          }}
          className={cn(
            {
              'focus:shadow-focus': value && isValid === true,
              'shadow-focus': value && isValid === true,
              'focus:shadow-error': value && isValid === false,
              'shadow-error': value && isValid === false,
            },
            className,
          )}
          {...props}
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 right-0 flex items-center gap-3 mr-5">
          {children}
          {value && isValid !== null && (
            <div className="right-0 flex items-center pointer-events-none">
              {isValid ? (
                <CheckCircle size={24} className="text-primary-default" />
              ) : (
                <WarningCircle size={24} className="text-accent-error" />
              )}
            </div>
          )}
        </div>
        {value && isMessage && (
          <p
            className={`absolute left-0 top-full mt-3 text-detail-lg mobile:text-detail-lg-m ${!isValid ? 'text-accent-error' : 'text-primary-default'}`}>
            {isMessage}
          </p>
        )}
      </div>
    );
  },
);
InputWithValidation.displayName = 'InputWithValidation';

export { InputWithValidation };
