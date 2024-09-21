import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '../ui/input';
import { CheckCircle, Eye, EyeClosed, WarningCircle } from '@phosphor-icons/react';
import { Button } from '../ui/button';

interface SignUpInputValidationProps {
  id?: string;
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
  onInputClick?: () => void;
  onButtonClick?: ((isValid: boolean) => void) | (() => void);
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonType?: 'submit' | 'reset' | 'button';
  errorMessage?: string;
  numberOnly?: boolean;
  optional?: boolean;
  children?: React.ReactNode;
  onBlur?: () => void;
  disabled?: boolean;
  buttonDisabled?: boolean;
  noValidation?: boolean;
}
const successMessage: { [key: string]: string } = {
  email: '올바른 이메일(아이디) 형식이에요',
  password: '올바른 비밀번호 형식이에요',
  confirmPassword: '비밀번호가 일치합니다',
};
const SignUpInputValidation = React.forwardRef<HTMLInputElement, SignUpInputValidationProps>(
  (
    {
      id,
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
      onFileChange,
      buttonType,
      errorMessage,
      numberOnly = false,
      optional,
      children,
      disabled = false,
      buttonDisabled = false,
      noValidation = false,
    },
    ref,
  ) => {
    const { control, trigger } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
          const [isValid, setIsValid] = React.useState<boolean | null>(null);
          const [isMessage, setIsMessage] = React.useState<string | undefined>(undefined);
          const togglePasswordVisibility = () => {
            setIsPasswordVisible(!isPasswordVisible);
          };

          const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (disabled) return;
            if (numberOnly) {
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
            }
            field.onChange(e);
            const isValid = await trigger(name);
            if (!isValid) {
              console.log(fieldState.error?.message);
              setIsValid(false);
              setIsMessage(fieldState.error?.message || errorMessage);
            } else {
              setIsValid(true);
              setIsMessage(successMessage[name]);
            }
          };

          const handleButtonClick = async () => {
            if (noValidation && onButtonClick) return onButtonClick(true);

            const isValid = await trigger(name); //
            setIsValid(isValid);
            errorMessage;
            if (!isValid) {
              setIsMessage(errorMessage || fieldState.error?.message);
            } else {
              setIsMessage(successMessage[name]);
            }

            if (onButtonClick) onButtonClick(isValid);
          };
          React.useEffect(() => {
            setIsMessage(fieldState.error?.message);
            fieldState.error?.type === 'success';
          }, [fieldState.error]);
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
                    type={type === 'password' && !isPasswordVisible ? 'password' : 'text'}
                    value={type === 'file' ? '' : field.value}
                    placeholder={placeholder}
                    onChange={handleInputChange}
                    className={` 
                      ${
                        field.value && isValid !== null
                          ? isValid && !fieldState.error?.type?.includes('Error')
                            ? 'shadow-focus'
                            : 'shadow-error focus:shadow-error'
                          : ''
                      } ${forwardExtra && 'pl-[80px]'} ${trailingExtra && 'pr-[70px] text-end placeholder:text-start'} ${inputClassName}`}
                    disabled={disabled}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-5 gap-3">
                    {type === 'password' && (
                      <div className="cursor-pointer" onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? (
                          <Eye size={24} className="text-assistive-default" />
                        ) : (
                          <EyeClosed size={24} className="text-assistive-default" />
                        )}
                      </div>
                    )}
                    {trailingExtra && (
                      <div className="mr-3 text-label-lg text-assistive-default">{trailingExtra}</div>
                    )}
                    {field.value ? (
                      <div className="pointer-events-none">
                        {isValid !== null ? (
                          isValid && !fieldState.error?.type?.includes('Error') ? (
                            <CheckCircle size={24} className="text-primary-default" />
                          ) : (
                            <WarningCircle size={24} className="text-accent-error" />
                          )
                        ) : (
                          ''
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
                {children}
                {buttonTitle &&
                  (type === 'file' ? (
                    <>
                      <input type={type} className="hidden" id={id} ref={ref} onChange={onFileChange} />
                      <Button
                        type={buttonType}
                        size={buttonSize}
                        variant={buttonVariant}
                        className={buttonClassName}
                        onClick={() => document.getElementById(`${id}`)?.click()}>
                        {buttonTitle}
                      </Button>
                    </>
                  ) : (
                    <Button
                      type={buttonType}
                      size={buttonSize}
                      variant={buttonDisabled ? 'disabled' : buttonVariant}
                      className={buttonClassName}
                      onClick={handleButtonClick}
                      disabled={buttonDisabled}>
                      {buttonTitle}
                    </Button>
                  ))}
              </div>
              {isValid !== null && (
                <p
                  className={`absolute left-0 mt-3 text-sm ${isValid && !fieldState.error?.type?.includes('Error') ? 'text-primary-default' : 'text-accent-error'}`}>
                  {isMessage}
                </p>
              )}
            </div>
          );
        }}
      />
    );
  },
);

SignUpInputValidation.displayName = 'SignUpInputValidation';

export default SignUpInputValidation;
