import * as React from 'react';
import { InputWithValidation } from './InputWithValidation';
import { Button } from '../ui/button';
import { useFormContext } from 'react-hook-form';
import { InputProps } from '../ui/input';

export interface InputFieldWithBtnProps extends InputProps {
  label: string;
  id: string;
  btnLabel: string;
  success: string;
}

const InputFieldWithBtn = React.forwardRef<HTMLInputElement, InputFieldWithBtnProps>(
  ({ label, btnLabel, className, id, ...props }, ref) => {
    const { register, getValues, trigger } = useFormContext();

    return (
      <div className="flex flex-col">
        <label className="my-5 text-title-base font-bold mobile:text-title-base-m">{label}</label>
        <div className="flex items-center gap-4">
          <div className="flex-grow">
            <InputWithValidation
              id={id}
              recordValue={getValues(id) || ''}
              trigger={() => trigger(id)}
              {...register(id, { required: true })}
              ref={ref}
              {...props}
            />
          </div>
          <div className="flex-shrink-0">
            <Button variant="outline" size="lg" className="grow-0">
              {btnLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

InputFieldWithBtn.displayName = 'InputValidWithLabel';

export { InputFieldWithBtn };
