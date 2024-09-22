import { useEffect, useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FilePlus } from '@phosphor-icons/react';
import { Tag } from '../ui/tag';
import { useFileUpload } from '@/hooks/useFileUpload';
import { getUsableFileUrl } from '@/lib/utils';

export const ImageUpload = () => {
  const {
    control,
    setError,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const {
    fields: fileFields,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: 'files',
  });
  const { uploadToServer } = useFileUpload();

  useEffect(() => {
    const existingFile = getValues('files')?.find((file: any) => file.type === 'PROPERTY_IMAGE');
    if (existingFile) {
      setImageSrc(existingFile.url);
      setImageName(existingFile.name);
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        setImageSrc(reader.result as string);
        setImageName(file.name);
        const uploadedUrls = await uploadToServer([file], 'PROPERTY_IMAGE');

        if (uploadedUrls !== undefined && uploadedUrls.length > 0) {
          console.log('업로드된 파일 URL:', getUsableFileUrl(uploadedUrls[0], 'PROPERTY_IMAGE', file.name));
          appendFile({
            name: file.name,
            url: getUsableFileUrl(uploadedUrls[0], 'PROPERTY_IMAGE', file.name),
            type: 'PROPERTY_IMAGE',
          });
        }
      };
    } else {
      setError('files.0', {
        message: '이미지 파일만 업로드할 수 있습니다.',
      });
    }
  };

  const handleRemoveImage = () => {
    const index = fileFields.findIndex((file: any) => file.type === 'PROPERTY_IMAGE');
    if (index !== -1) {
      removeFile(index);
    }
    setImageSrc(null);
    setImageName(null);
    (document.getElementById('imageInput') as HTMLInputElement).value = '';
  };

  return (
    <div className="relative">
      <label className="inline-block my-5 text-static-default text-title-base font-bold">대표이미지</label>
      <div
        className="relative flex flex-col items-center justify-center w-[464px] h-[261px] bg-assistive-base text-assistive-strong border border-assistive-default rounded-6 text-detail-base cursor-pointer"
        onClick={() => document.getElementById('imageInput')?.click()}>
        {imageSrc ? (
          <img src={imageSrc} alt="미리보기 이미지" className="w-full h-full rounded-6 object-cover" />
        ) : (
          <>
            <FilePlus size={80} weight="light" className="mb-3" />
            <p className="text-label-lg font-bold">대표 이미지 등록하기</p>
            <p>10MB 이하의 jpg, jpeg, png 파일만 등록할 수 있어요.</p>
            <p>사진 크기는 464x261 픽셀로 노출됩니다</p>
          </>
        )}
      </div>
      {(errors?.files as any)?.[0]?.message && (
        <p className="absolute left-0 mt-1 text-sm text-red-500">{(errors?.files as any)[0]?.message}</p>
      )}

      <input type="file" id="imageInput" accept="image/*" onChange={handleFileChange} className="hidden" />
      {imageName && (
        <div className={`mt-4 ${errors?.files && (errors?.files as any)?.message ? 'mt-7' : ''}`}>
          <Tag label={imageName} onClick={handleRemoveImage} />
        </div>
      )}
    </div>
  );
};
