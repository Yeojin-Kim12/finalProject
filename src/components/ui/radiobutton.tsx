import { useState } from 'react';
import { FieldValues, UseFormGetValues, UseFormRegister } from 'react-hook-form';

interface RadioButtonProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  required?: boolean;
}
const RadioButton = ({ id, register, getValues, required }: RadioButtonProps) => {
  const isGetValue = getValues(id);
  const [isChecked, setIsChecked] = useState(isGetValue === 'true');

  return (
    <div className="flex space-x-4">
      <label className="relative flex items-center cursor-pointer">
        <input
          id={id}
          type="radio"
          className="absolute w-8 h-8 mobile:w-7 mobile:h-7 opacity-0 cursor-pointer "
          value="true"
          checked={isChecked}
          {...register(id, { required: required })}
          onChange={() => setIsChecked(!isChecked)}
        />
        <div
          className={`w-8 h-8 mobile:w-7 mobile:h-7 rounded-10 shadow-2 flex items-center justify-center
          ${isChecked ? 'text-primary-default shadow-focus' : 'shadow-default2'}`}>
          {isChecked && (
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 0C7.168 0 0 7.168 0 16C0 24.832 7.168 32 16 32C24.832 32 32 24.832 32 16C32 7.168 24.832 0 16 0ZM11.664 22.864L5.92 17.12C5.296 16.496 5.296 15.488 5.92 14.864C6.544 14.24 7.552 14.24 8.176 14.864L12.8 19.472L23.808 8.464C24.432 7.84 25.44 7.84 26.064 8.464C26.688 9.088 26.688 10.096 26.064 10.72L13.92 22.864C13.312 23.488 12.288 23.488 11.664 22.864Z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>
      </label>
    </div>
  );
};

export default RadioButton;
