import { X } from '@phosphor-icons/react';
import Dropdown from '../../common/Dropdown';
import { useFormContext } from 'react-hook-form';
import { FormValues, KeywordData } from '@/types/types';
import { useState } from 'react';
import PropertyInput from './PropertyInput';
import { Tag } from '../../ui/tag';

const keywordInput1 = [
  {
    value: '무상제공',
    label: '무상제공',
  },
  {
    value: '무상확장',
    label: '무상확장',
  },
  {
    value: '사은품',
    label: '사은품',
  },
];

interface OptionInputFieldProps {
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
const OptionInputField = ({ keyword, onClick }: OptionInputFieldProps) => {
  const [input1, setInput1] = useState<string>(keywordInput1[0].value);
  const [input2, setInput2] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();
  const handleButtonClick = () => {
    if (!input2) {
      setIsError(true);
      return;
    }

    setIsError(false);
    if (keyword) {
      const currentKeywords: KeywordData[] = getValues('keywords') || [];
      const currentKeywordField = currentKeywords.find((field) => field.name === keyword.value);

      const newInput = { input1, input2 };

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
      setInput2('');
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
            <Dropdown
              items={keywordInput1}
              defaultLabel={input1}
              buttonWidth="w-fit"
              onSelect={(value) => setInput1(value)}
            />
            <PropertyInput
              value={input2}
              placeholder={keyword.placeholder}
              className="w-full !mb-0"
              error={isError}
              errorMessage={errors.areas?.message}
              buttonTitle="입력추가"
              buttonSize="lg"
              buttonVariant="outline"
              buttonType="button"
              onChange={(value: string) => setInput2(value)}
              onButtonClick={handleButtonClick}></PropertyInput>
            <div className="size-8" onClick={onClick}>
              <X weight="light" className="size-8 cursor-pointer text-assistive-default" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 ml-[150px]">
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

export default OptionInputField;
