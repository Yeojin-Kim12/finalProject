import { useFieldArray, useFormContext } from 'react-hook-form';
import KeywordToggleItem from './KeywordToggleItem';
import InfraInputField from './KeywordInputField/InfraInputField';
import { FormValues, KeywordData } from '@/types/types';
import { benefitKeywords, infraKeywords } from '@/constants/propertyDataMap';
import OptionInputField from './KeywordInputField/OptionInputField';
import SupportInputField from './KeywordInputField/SupportInputField';
import GuaranteedInputField from './KeywordInputField/GuaranteedInputField';
import CashInputField from './KeywordInputField/CashInputField';
import BalanceInputField from './KeywordInputField/BalanceInputField';
import DiscountInputField from './KeywordInputField/DiscountInputField';
import { ReactNode } from 'react';

const PropertyKeywords = () => {
  const { control, getValues } = useFormContext<FormValues>();

  const {
    fields: keywordFields,
    append: appendKeyword,
    remove: removeKeyword,
    update: updateKeyword,
  } = useFieldArray({
    control,
    name: 'keywords',
  });
  const benefitComponentMap: Record<string, (props: any) => ReactNode> = {
    DISCOUNT_SALE: DiscountInputField,
    BALANCE_DEFERRAL: BalanceInputField,
    CASH_PAYMENT: CashInputField,
    GUARANTEED_PAYMENT: GuaranteedInputField,
    SUPPORT_PAYMENT: SupportInputField,
    OPTION_PAYMENT: OptionInputField,
  };
  const isBenefitType = (keyword: string) => {
    return benefitKeywords.some((item) => item.value === keyword);
  };
  const hasKeywordType = (keywordFields: KeywordData[], type: 'BENEFIT' | 'INFRA'): boolean => {
    return keywordFields.some((field) => field.type === type);
  };

  const badgeNumber = (keyword: string) => {
    const index = getValues('keywords').findIndex((field: KeywordData) => field.name === keyword);
    return index >= 0 && index <= 2 ? index + 1 : null;
  };

  const handleKeywordToggle = (keyword: string) => {
    const currentKeywords = keywordFields.map((field) => field.name);
    const hasKeyword = currentKeywords.includes(keyword);

    const updatedKeywords = hasKeyword
      ? currentKeywords.filter((selectedKeyword) => selectedKeyword !== keyword)
      : [...currentKeywords, keyword];

    updatedKeywords.forEach((newKeyword, index) => {
      const keywordIndex = keywordFields.findIndex((field) => field.name === newKeyword);
      const isSearchEnabled = index <= 2;

      const newField: KeywordData =
        keywordIndex === -1
          ? {
              searchEnabled: isSearchEnabled,
              name: newKeyword,
              type: isBenefitType(newKeyword) ? 'BENEFIT' : 'INFRA',
              input: '',
            }
          : {
              ...keywordFields[keywordIndex],
              searchEnabled: isSearchEnabled,
              input: getValues(`keywords.${keywordIndex}.input`),
            };
      if (keywordIndex === -1) {
        appendKeyword(newField);
      } else {
        updateKeyword(keywordIndex, newField);
      }
    });

    keywordFields.forEach((field, index) => {
      if (!updatedKeywords.includes(field.name)) {
        removeKeyword(index);
      }
    });
  };

  return (
    <div className="flex flex-col w-[720px] h-full m-auto">
      <section className="flex flex-col gap-9">
        <article className="flex flex-col gap-3 py-5">
          <h3 className="text-title-xl text-static-default font-bold">
            등록하는 매물에 해당하는 키워드를 선택해주세요
          </h3>
          <p className="text-detail-lg text-assistive-strong">우선 선택된 3가지가 메인 키워드로 노출됩니다</p>
        </article>
        <article className="flex flex-col gap-3">
          <h4 className="text-title-xl text-static-default font-bold">혜택 줍줍</h4>
          <p className="text-detail-base text-assistive-strong">분양 혜택과 관련된 키워드를 선택해주세요</p>
          <div className="grid grid-cols-3 gap-3">
            {benefitKeywords.map((keyword) => (
              <KeywordToggleItem
                key={keyword.value}
                label={keyword.name}
                isSelected={getValues('keywords').some((field: KeywordData) => field.name === keyword.value)}
                variant={
                  getValues('keywords').some((field: KeywordData) => field.name === keyword.value)
                    ? 'accent'
                    : 'default'
                }
                badgeNumber={badgeNumber(keyword.value)}
                onClick={() => handleKeywordToggle(keyword.value)}
              />
            ))}
          </div>
        </article>

        <article className="flex flex-col gap-3">
          <h4 className="text-title-xl text-static-default font-bold">주변 핵심 체크</h4>
          <p className="text-detail-base text-assistive-strong">주변 인프라와 관련된 키워드를 선택해주세요</p>
          <div className="grid grid-cols-4 gap-3">
            {infraKeywords.map((keyword) => (
              <KeywordToggleItem
                key={keyword.value}
                label={keyword.name}
                isSelected={getValues('keywords').some((field: KeywordData) => field.name === keyword.value)}
                variant={
                  getValues('keywords').some((field: KeywordData) => field.name === keyword.value)
                    ? 'primary'
                    : 'default'
                }
                badgeNumber={badgeNumber(keyword.value)}
                onClick={() => handleKeywordToggle(keyword.value)}
              />
            ))}
          </div>
        </article>
      </section>
      {hasKeywordType(keywordFields, 'BENEFIT') && (
        <>
          <div className="w-full h-[1px] my-10 bg-assistive-divider"></div>
          <section className="flex flex-col gap-8">
            <h4 className="text-title-xl text-static-default font-bold">혜택 줍줍</h4>
            {benefitKeywords.map((benefitKeyword) => {
              const isVisible = getValues('keywords').some(
                (field: KeywordData) => field.name === benefitKeyword.value,
              );
              const keywordIndex = keywordFields.findIndex((field) => field.name === benefitKeyword.value);
              const BenefitComponent = benefitComponentMap[benefitKeyword.value];
              return (
                <div key={benefitKeyword.value} className={isVisible ? 'block' : 'hidden'}>
                  {BenefitComponent && (
                    <BenefitComponent
                      name={`keywords.${keywordIndex}.input`}
                      keyword={benefitKeyword}
                      onClick={() => handleKeywordToggle(benefitKeyword.value)}
                    />
                  )}
                </div>
              );
            })}
          </section>
        </>
      )}
      {hasKeywordType(keywordFields, 'INFRA') && (
        <>
          <div className="w-full h-[1px] my-10 bg-assistive-divider"></div>
          <section className="flex flex-col gap-8">
            <h4 className="text-title-xl text-static-default font-bold">주변 핵심 체크</h4>
            {infraKeywords.map((infraKeyword) => {
              const isVisible = getValues('keywords').some(
                (field: KeywordData) => field.name === infraKeyword.value,
              );

              return (
                isVisible && (
                  <div key={infraKeyword.value}>
                    <InfraInputField
                      keyword={infraKeyword}
                      onClick={() => handleKeywordToggle(infraKeyword.value)}
                    />
                  </div>
                )
              );
            })}
          </section>
        </>
      )}
    </div>
  );
};

export default PropertyKeywords;
