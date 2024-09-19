import * as React from 'react';
import { InputWithValidation } from './InputWithValidation';
import { PwInputWithValidation } from './PasswordInputWithValidation';
import { useFormContext } from 'react-hook-form';
import { type InputProps } from '../ui/input';

export interface InputFieldProps extends InputProps {
  label?: string;
  id: string;
  success: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ type, label, className, id, ...props }, ref) => {
    const { register, getValues, trigger } = useFormContext();
    const { ref: registerRef, ...rest } = register(id, { required: true });
    return (
      <div className="flex flex-col">
        <label className="my-5 text-title-base font-bold mobile:text-title-base-m">{label}</label>
        {type === 'password' ? (
          <PwInputWithValidation
            className={className}
            id={id}
            recordValue={getValues(id) || ''}
            trigger={() => trigger(id)}
            {...register(id, { required: true })}
            ref={(instance) => {
              registerRef(instance);
              if (typeof ref === 'function') {
                ref(instance);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = instance;
              }
            }}
            {...rest}
            {...props}
          />
        ) : (
          <InputWithValidation
            className={className}
            id={id}
            recordValue={getValues(id) || ''}
            trigger={() => trigger(id)}
            {...register(id, { required: true })}
            ref={(instance) => {
              registerRef(instance);
              if (typeof ref === 'function') {
                ref(instance);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = instance;
              }
            }}
            {...rest}
            {...props}
          />
        )}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export { InputField };
