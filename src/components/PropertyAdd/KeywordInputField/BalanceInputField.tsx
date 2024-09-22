import { X } from '@phosphor-icons/react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '@/types/types';
import PropertyInputValidation from '@/components/common/PropertyInputValidation';
import { useEffect } from 'react';

interface BalanceInputFieldProps {
  name: string;
  keyword:
    | {
        name: string;
        value: string;
        placeholder?: string;
      }
    | undefined;
  onClick: () => void;
}
const BalanceInputField = ({ name, keyword, onClick }: BalanceInputFieldProps) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();

  useEffect(() => {
    if (keyword !== undefined) {
      (setValue as any)(`${name}.input1`, null);
      (setValue as any)(`${name}.input2`, null);
    }
  }, [keyword, name, setValue]);

  const handleRemove = () => {
    (setValue as any)(`${name}.input1`, null);
    (setValue as any)(`${name}.input2`, null);
    onClick();
  };

  return (
    <>
      {keyword !== undefined && (
        <div className="flex flex-col gap-6">
          <label className="text-title-base font-bold text-static-default">{keyword.name}</label>
          <div className="flex gap-6 items-center">
            <PropertyInputValidation
              name={`${name}.input1`}
              className="!mb-0"
              inputClassName="w-[279px]"
              forwardExtra="잔금"
              trailingExtra="%"
              errorMessage={errors.keywords?.message}
              numberOnly={true}>
              <PropertyInputValidation
                name={`${name}.input2`}
                className="!mb-0"
                inputClassName="w-[279px]"
                trailingExtra="개월"
                errorMessage={errors.keywords?.message}
                numberOnly={true}
              />
              <span className="text-body-lg text-static-default text-nowrap">동안 유예</span>
            </PropertyInputValidation>
            <div className="size-8" onClick={handleRemove}>
              <X weight="light" className="size-8 cursor-pointer text-assistive-default" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BalanceInputField;
