import { X } from '@phosphor-icons/react';
import Dropdown from '../../common/Dropdown';
import { useFormContext } from 'react-hook-form';
import { FormValues, KeywordData } from '@/types/types';
import { useState } from 'react';
import PropertyInput from './PropertyInput';
import { Tag } from '../../ui/tag';

const infraInput2 = [
  {
    value: '도보',
    label: '도보',
  },
  {
    value: '차량',
    label: '차량',
  },
];
const infraInput3 = [
  {
    value: '5분',
    label: '5분',
  },
  {
    value: '10분',
    label: '10분',
  },
  {
    value: '15분',
    label: '15분',
  },
  {
    value: '20분',
    label: '20분',
  },
];
interface InfraInputFieldProps {
  keyword:
    | {
        name: string;
        value: string;
        placeholder?: string;
      }
    | undefined;
  onClick: () => void;
}
interface KeywordDataArray extends KeywordData {
  input:
    | string
    | { input1: string | number; input2: string | number; input3?: string | number }[]
    | Record<string | number, unknown>;
  searchEnabled: boolean;
}
const InfraInputField = ({ keyword, onClick }: InfraInputFieldProps) => {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>(infraInput2[0].value);
  const [input3, setInput3] = useState<string>(infraInput3[0].value);
  const [isError, setIsError] = useState<boolean>(false);
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();

  const handleButtonClick = () => {
    if (!input1) {
      setIsError(true);
      return;
    }

    setIsError(false);
    if (keyword) {
      const currentKeywords: KeywordData[] = getValues('keywords') || [];
      const currentKeywordField = currentKeywords.find((field) => field.name === keyword.value);

      const newInput = { input1, input2, input3 };

      const updatedInputArray =
        currentKeywordField && Array.isArray(currentKeywordField.input)
          ? [...currentKeywordField.input, newInput]
          : [newInput];

      const updatedKeywordData: KeywordDataArray = {
        searchEnabled: currentKeywordField?.searchEnabled ?? true,
        name: currentKeywordField?.name ?? keyword.value,
        type: currentKeywordField?.type ?? 'BENEFIT',
        input: updatedInputArray,
      };

      setValue(
        'keywords',
        currentKeywords.map((field) => (field.name === keyword.value ? updatedKeywordData : field)),
      );
      setInput1('');
    }
  };
  const handleRemoveInput = (index: number) => {
    if (keyword) {
      const currentKeywords: KeywordData[] = getValues('keywords') || [];
      const currentKeywordField = currentKeywords.find((field) => field.name === keyword.value);

      if (currentKeywordField && Array.isArray(currentKeywordField.input)) {
        const updatedInputArray = currentKeywordField.input.filter((_, i) => i !== index);

        const updatedKeywordData: KeywordDataArray = {
          ...currentKeywordField,
          input: updatedInputArray,
        };

        setValue(
          'keywords',
          currentKeywords.map((field) => (field.name === keyword.value ? updatedKeywordData : field)),
        );
      }
    }
  };

  if (!keyword) {
    return null; // keyword가 없으면 아무것도 렌더링하지 않음
  }

  const keywordInput = getValues('keywords')?.find(
    (field) => field.name === keyword.value,
  ) as KeywordDataArray;
  return (
    <>
      {keyword !== undefined && (
        <div className="w-full flex flex-col gap-6">
          <label className="text-title-base font-bold text-static-default">{keyword.name}</label>
          <div className="flex gap-6 items-center">
            <PropertyInput
              value={input1}
              placeholder={keyword.placeholder}
              className="w-full !mb-0"
              error={isError}
              errorMessage={errors.areas?.message}
              buttonTitle="입력추가"
              buttonSize="lg"
              buttonVariant="outline"
              buttonType="button"
              onChange={(value: string) => setInput1(value)}
              onButtonClick={handleButtonClick}>
              <Dropdown
                items={infraInput2}
                defaultLabel={input2}
                buttonWidth="w-[105px]"
                onSelect={(value) => setInput2(value)}
              />
              <Dropdown
                items={infraInput3}
                defaultLabel={input3}
                buttonWidth="w-[112px] "
                onSelect={(value) => setInput3(value)}
              />
            </PropertyInput>
            <div className="size-8" onClick={onClick}>
              <X weight="light" className="size-8 cursor-pointer text-assistive-default" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(keywordInput?.input) &&
              keywordInput.input.map((input, index) => (
                <Tag
                  key={index}
                  label={`${input.input1} ${input.input2} ${input.input3 ?? ''}`}
                  onClick={() => handleRemoveInput(index)}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default InfraInputField;
