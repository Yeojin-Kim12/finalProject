import { useEffect, useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import PropertyInputValidation from '../common/PropertyInputValidation';
import { useFileUpload } from '@/hooks/useFileUpload';
import { getUsableFileUrl } from '@/lib/utils';

export const PdfUpload = () => {
  const {
    control,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useFormContext();
  const {
    fields: fileFields,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: 'files',
  });
  const [pdfName, setPdfName] = useState<string | null>(null); // PDF 파일명
  const { uploadToServer } = useFileUpload();

  useEffect(() => {
    const existingFile = getValues('files')?.find((file: any) => file.type === 'SUPPLY_INFORMATION');
    if (existingFile) {
      setPdfName(existingFile.name);
    }
  }, []);

  // pdf 파일
  const handlePdfFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleRemovePdf();
    const file = e.target.files?.[0];

    if (file && file.type === 'application/pdf') {
      setPdfName(file.name);
      const uploadedUrls = await uploadToServer([file], 'SUPPLY_INFORMATION');

      if (uploadedUrls !== undefined && uploadedUrls.length > 0) {
        console.log('업로드된 파일 URL:', getUsableFileUrl(uploadedUrls[0], 'SUPPLY_INFORMATION', file.name));
        appendFile({
          name: file.name,
          url: getUsableFileUrl(uploadedUrls[0], 'SUPPLY_INFORMATION', file.name),
          type: 'SUPPLY_INFORMATION',
        });
      }
    } else {
      setError('files.1', {
        message: 'PDF 파일만 업로드할 수 있습니다.',
      });
    }
  };

  useEffect(() => {
    setValue('propertySupplyInformation', pdfName || '');
  }, [pdfName, setPdfName]);

  const handleRemovePdf = () => {
    setPdfName(null);
    const index = fileFields.findIndex((file: any) => file.type === 'SUPPLY_INFORMATION');
    if (index !== -1) {
      removeFile(index);
    }
  };

  return (
    <>
      <PropertyInputValidation
        name="propertySupplyInformation"
        label="공급안내표"
        placeholder="10MB 이하의 pdf 파일만 등록할 수 있어요"
        errorMessage={errors?.files && (errors?.files as any)?.[1]?.message}
        className="w-full mb-[0px]"
        buttonTitle="파일 첨부"
        buttonSize="lg"
        buttonVariant="outline"
        buttonClassName="ml-4"
        buttonType="button"
        onButtonClick={() => document.getElementById('supplyInput')?.click()}
      />
      <input
        type="file"
        id="supplyInput"
        accept="application/pdf"
        onChange={handlePdfFileChange}
        className="hidden"
      />
    </>
  );
};
