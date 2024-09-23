import { useEffect, useState } from 'react';
import PropertyInputValidation from '../common/PropertyInputValidation';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormValues } from '@/types/types';
import { useFileUpload } from '@/hooks/useFileUpload';
import { getUsableFileUrl } from '@/lib/utils';

const AdditionalInformation = () => {
  const {
    control,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<FormValues>();

  console.log(errors);

  const [pdfName, setPdfName] = useState<string | null>(null); // PDF 파일명
  const { uploadToServer } = useFileUpload();

  useEffect(() => {
    const existingFile = getValues('files')?.find((file: any) => file.type === 'MARKETING');
    if (existingFile) {
      setPdfName(existingFile.name);
    }
  }, []);

  const handlePdfFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleRemovePdf();
    const file = e.target.files?.[0];
    console.log(file);

    if (file && file.type === 'application/pdf') {
      setPdfName(file.name);
      const uploadedUrls = await uploadToServer([file], 'MARKETING');

      if (uploadedUrls !== undefined && uploadedUrls.length > 0) {
        console.log('업로드된 파일 URL:', getUsableFileUrl(uploadedUrls[0], 'MARKETING'));
        appendFile({
          name: file.name,
          url: getUsableFileUrl(uploadedUrls[0], 'MARKETING'),
          type: 'MARKETING',
        });
      }
    } else {
      setError('files.2', {
        message: 'PDF 파일만 업로드할 수 있습니다.',
      });
    }
  };

  useEffect(() => {
    if (pdfName) {
      setValue('marketting', pdfName);
    }
  }, [pdfName]);

  const handleRemovePdf = () => {
    const index = fileFields.findIndex((file: any) => file.type === 'MARKETING');
    if (index !== -1) {
      removeFile(index);
    }
    setPdfName(null);
  };

  const {
    fields: fileFields,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: 'files',
  });

  return (
    <div className="flex flex-col w-[720px] h-full mx-auto">
      <div className="flex flex-col w-full gap-8">
        <PropertyInputValidation
          name="phoneNumber"
          label="분양 문의 번호"
          placeholder="ex) 010-0000-0000 / 0000-0000"
        />
        <PropertyInputValidation
          name="marketting"
          label="마케팅 자료"
          optional={true}
          placeholder="10MB 이하의 pdf 파일만 등록할 수 있어요"
          errorMessage={errors?.files && errors.files[2]?.message}
          buttonType="button"
          buttonVariant="outline"
          buttonSize="lg"
          buttonClassName="ml-4"
          buttonTitle="파일 첨부"
          onButtonClick={() => document.getElementById('marketingInput')?.click()}
        />
        <input
          type="file"
          id="marketingInput"
          accept="application/pdf"
          onChange={handlePdfFileChange}
          className="hidden"
        />
        <PropertyInputValidation
          name="homepage"
          label="홈페이지 링크"
          optional={true}
          placeholder="홈페이지 링크를 입력해주세요"
        />
        <PropertyInputValidation
          name="contactChannel"
          label="카카오톡 채널 링크"
          optional={true}
          placeholder="카카오톡 채널 링크를 입력해주세요"
        />
      </div>
    </div>
  );
};

export default AdditionalInformation;
