import { useFormContext, useFieldArray } from 'react-hook-form';
import PropertyInputValidation from '../common/PropertyInputValidation';
import { Check, Plus, X } from '@phosphor-icons/react';
import { useState } from 'react';
import { Label } from '../ui/label';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { FormValues } from '@/types/types';
import PropertyDateValidation from '../common/PropertyDateValidation';
import { ToggleButton } from '../ui/ToggleButton';
import { KeywordBadge } from '../ui/KeywordBadge';
import { ImageUpload } from './ImageUpload';
import { PdfUpload } from './PdfUpload';

export const PropertyInformation = () => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();
  const [propertyType, setPropertyType] = useState<string>('APARTMENT'); // 분양 유형
  const [salesType, SetSalesType] = useState<string>('PRIVATE_SALE'); //분양 형태
  setValue('propertyType', 'APARTMENT');
  setValue('salesType', 'PRIVATE_SALE');

  // Daum 주소 API
  const postcodeUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const postcodeOpen = useDaumPostcodePopup(postcodeUrl);

  const handlePostcodeComplete = (data: any, inputType: 'areaAddr' | 'modelhouseAddr') => {
    if (inputType === 'areaAddr') {
      setValue('areaAddr', data.address);
      setValue('addrDo', data.sido);
      setValue('addrGu', data.sigungu);
      setValue('addrDong', data.bname);
      setValue('buildingName', data.buildingName);
    } else if (inputType === 'modelhouseAddr') {
      setValue('modelhouseAddr', data.address);
    }
  };

  const handlePostcodeClick = (inputType: 'areaAddr' | 'modelhouseAddr') => {
    postcodeOpen({
      onComplete: (data) => handlePostcodeComplete(data, inputType),
    });
  };

  // 분양 유형/형태
  const handlePropertyTypeSelect = (value: string) => {
    setPropertyType(value);
    setValue('propertyType', value);
  };
  const handleSalesTypeSelect = (value: string) => {
    SetSalesType(value);
    setValue('salesType', value);
  };

  const {
    fields: areaFields,
    append: appendArea,
    remove: removeArea,
  } = useFieldArray({
    control,
    name: 'areas',
  });

  // 세대면적 추가
  const addArea = () => {
    const householdArea = parseInt(getValues('propertyHouseholdArea'));
    if (householdArea) {
      appendArea({
        squareMeter: householdArea,
        price: 0,
        discountPercent: null,
        discountPrice: null,
      });
      setValue('propertyHouseholdArea', '');
    }
  };

  return (
    <div className="flex flex-col w-[720px] h-full mx-auto">
      <div className="flex flex-col w-full gap-8">
        <ImageUpload />

        <PropertyInputValidation name="name" label="매물명" placeholder="매물명을 입력해주세요" />
        <div className="flex w-full gap-9">
          <PropertyInputValidation
            name="constructorName"
            label="시공사"
            placeholder="ex) 대방건설(주)"
            className="w-full"
          />
          <PropertyInputValidation
            name="companyName"
            label="시행사"
            placeholder="ex) 삼익건설개발(주)"
            className="w-full"
          />
        </div>
        <PropertyInputValidation
          name="totalNumber"
          label="세대수"
          forwardExtra="총"
          className="w-[340px]"
          trailingExtra="세대"
          numberOnly={true}
        />
        <PropertyDateValidation
          name="dateRange"
          label="모집기간"
          errorMessage={{
            startDate: (errors.dateRange as any)?.startDate?.message || '',
            endDate: (errors.dateRange as any)?.endDate?.message || '',
          }}
        />
      </div>

      <div className="w-full h-[1px] my-10 bg-assistive-divider" />

      <div className="flex flex-col w-full gap-8">
        <div>
          <PropertyInputValidation
            name="propertyHouseholdArea"
            label="세대면적"
            placeholder="ex)24, 32"
            trailingExtra="평"
            className="w-[481px] mb-8"
            errorMessage={errors.areas?.message}
            numberOnly={true}
            buttonTitle={
              <>
                <span className="mr-4">추가</span>
                <Plus size={24} strokeWidth={2} />
              </>
            }
            buttonSize="lg"
            buttonVariant="outline"
            buttonClassName="ml-4"
            buttonType="button"
            onButtonClick={addArea}
          />

          {areaFields.length !== 0 && (
            <div className="flex flex-col gap-7">
              <label className="block my-3 text-title-base font-bold text-static-default">평형별 가격</label>
              {areaFields.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4 h-[53px] w-[396px]">
                  <Label variant="space">{item.squareMeter}평</Label>
                  <div className="w-[1px] h-[41px] bg-assistive-divider"></div>
                  <PropertyInputValidation
                    name={`areas.${index}.price`}
                    trailingExtra="만원"
                    className="w-[340px] mb-[0px]"
                    numberOnly={true}
                  />
                  <X
                    size={32}
                    weight="light"
                    className="cursor-pointer text-assistive-default ml-4"
                    onClick={() => removeArea(index)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <PdfUpload />
      </div>
      <div className="w-full h-[1px] my-10 bg-assistive-divider"></div>

      <div className="flex flex-col gap-8">
        <div>
          <label className="block my-3 text-title-base font-bold text-static-default">분양유형</label>
          <div className="grid grid-cols-3 gap-x-3 gap-y-4 text-label-lg font-bold">
            {[
              { name: '아파트', value: 'APARTMENT' },
              { name: '오피스텔', value: 'OFFICETEL' },
              { name: '빌라', value: 'VILLA' },
              { name: '도시형 생활 주택', value: 'URBAN_HOUSING' },
              { name: '생활 숙박 시설', value: 'LIVING_ACCOMMODATION' },
              { name: '상가/업무', value: 'DOWNTOWN' },
            ].map((type) => (
              <ToggleButton
                key={type.value}
                variant={propertyType === type.value ? 'primary' : 'default'}
                onClick={() => handlePropertyTypeSelect(type.value)}
                className="p-6 border rounded-5">
                <span>{type.name}</span>
                {propertyType === type.value && (
                  <KeywordBadge variant="primary">
                    <Check size={20} weight="bold" />
                  </KeywordBadge>
                )}
              </ToggleButton>
            ))}
          </div>
        </div>
        <div>
          <label className="block my-3 text-title-base font-bold text-static-default">분양형태</label>
          <div className="grid grid-cols-3 gap-x-3 gap-y-4 text-label-lg font-bold">
            {[
              { name: '민간분양', value: 'PRIVATE_SALE' },
              { name: '공공분양', value: 'PUBLIC_SALE' },
              { name: '임대분양', value: 'LEASE_SALE' },
            ].map((type) => (
              <ToggleButton
                key={type.value}
                variant={salesType === type.value ? 'primary' : 'default'}
                onClick={() => handleSalesTypeSelect(type.value)}
                className="p-6 border rounded-5">
                <span>{type.name}</span>
                {salesType === type.value && (
                  <KeywordBadge variant="primary">
                    <Check size={20} weight="bold" />
                  </KeywordBadge>
                )}
              </ToggleButton>
            ))}
          </div>
        </div>
        <PropertyInputValidation
          name="areaAddr"
          label="대지위치"
          placeholder="주소를 입력해주세요"
          className="w-full mb-[0px]"
          buttonTitle="우편번호 검색"
          buttonSize="lg"
          buttonVariant="outline"
          buttonClassName="ml-4"
          buttonType="button"
          onButtonClick={() => handlePostcodeClick('areaAddr')}
        />
        <PropertyInputValidation
          name="modelhouseAddr"
          label="모델하우스 주소"
          placeholder="주소를 입력해주세요"
          className="w-full mb-[0px]"
          buttonTitle="우편번호 검색"
          buttonSize="lg"
          buttonVariant="outline"
          buttonClassName="ml-4"
          buttonType="button"
          onButtonClick={() => handlePostcodeClick('modelhouseAddr')}
        />
      </div>
    </div>
  );
};
