import { X } from '@phosphor-icons/react';
import Dropdown from '../../common/Dropdown';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '@/types/types';

import PropertyInputValidation from '@/components/common/PropertyInputValidation';
import { useEffect, useState } from 'react';

const keywordInput1 = [
  {
    value: '중도금 무이자',
    label: '중도금 무이자',
    trailingExtra: '무이자 지원',
  },
  {
    value: '이자후불제',
    label: '이자후불제',
    trailingExtra: '이자 후불제 지원',
  },
];

interface SupportInputFieldProps {
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
const SupportInputField = ({ name, keyword, onClick }: SupportInputFieldProps) => {
  const [input1, setInput1] = useState<string>(keywordInput1[0].value);
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();

  useEffect(() => {
    setValue(`${name}.input1` as keyof FormValues, input1);
    if (keyword !== undefined) {
      (setValue as any)(`${name}.input2`, null);
    }
  }, [name, input1, setValue]);

  const handleRemove = () => {
    (setValue as any)(`${name}.input1` as keyof FormValues, input1);
    (setValue as any)(`${name}.input2`, null);
    onClick();
  };

  const getTrailingExtra = (value: string): string => {
    const foundItem = keywordInput1.find((item) => item.value === value);
    return foundItem ? foundItem.trailingExtra : '';
  };
  const input1DefaultValue =
    (getValues(`${name}.input1` as keyof FormValues) as string) || keywordInput1[0].value;
  const onSelect = (value: string) => {
    setValue(`${name}.input1` as keyof FormValues, value as string);
    setInput1(value);
  };
  return (
    <>
      {keyword !== undefined && (
        <div className="w-full flex flex-col gap-6">
          <label className="text-title-base font-bold text-static-default">{keyword.name}</label>
          <div className="flex gap-6 items-center">
            <Dropdown
              items={keywordInput1}
              defaultLabel={input1DefaultValue || ''}
              buttonWidth="w-fit"
              onSelect={onSelect}
            />
            <PropertyInputValidation
              name={`${name}.input2`}
              placeholder={keyword.placeholder}
              className="w-full !mb-0"
              inputClassName="text-end"
              forwardExtra="중도금"
              trailingExtra="%"
              errorMessage={errors.keywords?.message}
              numberOnly={true}>
              <span className="text-body-lg text-static-default text-nowrap">{getTrailingExtra(input1)}</span>
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

export default SupportInputField;
