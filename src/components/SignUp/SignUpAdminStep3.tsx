import React from 'react';
import SignUpInputValidation from '../common/SignUpInputValidation';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Tag } from '../ui/tag';
import { getUsableFileUrl } from '@/lib/utils';

const SignUpAdminStep3 = () => {
  const [pdfName, setPdfName] = React.useState('');
  const { uploadToServer } = useFileUpload();
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { append: appendHousingFile, remove: removeHousingFile } = useFieldArray({
    control,
    name: 'housingFile',
  });

  // useEffect를 사용하여 pdfName 업데이트
  React.useEffect(() => {
    const getFile = getValues('housingFile');
    if (getFile.length > 0) {
      setPdfName(getFile[0].name); // 첫 번째 파일의 이름을 pdfName으로 설정
    } else {
      setPdfName('');
    }
  }, [getValues]);

  // 파일첨부
  const handlePdfFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type === 'application/pdf') {
      const fileType = 'HOUSING';
      const getFile = getValues('housingFile');
      setPdfName(file.name);
      // 기존 파일이 있으면 제거
      if (getFile.length > 0) {
        removeHousingFile(0); // 첫 번째 파일 제거
      }

      // 새로운 파일 업로드
      const uploadedUrls = await uploadToServer([file], fileType);
      if (uploadedUrls !== undefined && uploadedUrls.length > 0) {
        const url = getUsableFileUrl(uploadedUrls[0], fileType, file.name);
        appendHousingFile({
          name: file.name,
          url: url,
          type: fileType,
        });
      }
    } else {
      console.error('PDF 파일만 업로드할 수 있습니다.');
    }
  };

  // 파일 제거
  const handleRemoveFile = (name: string) => {
    const housingFiles = getValues('housingFile');
    const index = housingFiles.findIndex((file: { name: string }) => file.name === name);

    if (index !== -1) {
      removeHousingFile(index);
      setPdfName(''); // pdfName 상태 초기화
    }
  };

  return (
    <>
      <article className="flex flex-col gap-10 mobile:gap-6">
        <SignUpInputValidation
          name="companyName"
          label="회사명"
          placeholder="회사명을 입력해주세요"
          disabled
        />
        <SignUpInputValidation name="business" label="담당 업무" placeholder="담당 업무를 입력해주세요" />
        <SignUpInputValidation
          name="email"
          label="회사 메일"
          placeholder="이메일(아이디)를 입력해주세요"
          disabled
        />
        <div className="flex flex-col gap-5">
          <SignUpInputValidation
            id="housingInputId"
            type="file"
            name="housingFile"
            label="매물 증명"
            placeholder="10MB 이하의 pdf 파일만 등록할 수 있어요"
            buttonTitle="파일첨부"
            buttonVariant="outline"
            buttonSize="lg"
            onFileChange={handlePdfFileChange}
            errorMessage={errors?.housingFile && (errors?.housingFile as any).message}
            disabled
          />
          {pdfName && <Tag label={pdfName} onClick={() => handleRemoveFile(pdfName)} />}
        </div>
      </article>
    </>
  );
};

export default SignUpAdminStep3;
