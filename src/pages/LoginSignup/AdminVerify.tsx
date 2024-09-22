import Input from '@/components/LoginSignup/Input';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const inputFields = [
  { title: '소속 회사', placeholder: '소속 회사를 입력해주세요' },
  { title: '담당 업무', placeholder: '담당 업무를 입력해주세요' },
  { title: '회사 메일', placeholder: '회사 메일을 입력해주세요' },
];

export default function AdminVerify() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileBtnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <main className="flex w-full justify-center">
      <section className="flex flex-col max-w-[1536px] py-[80px] justify-center gap-y-16">
        <article className="flex justify-center">
          <h1 className=" font-bold text-heading-lg mobile:text-heading-sm">담당자 인증</h1>
        </article>

        <article className="flex flex-col w-[720px] gap-y-9">
          {inputFields.map((field, index) => (
            <Input key={index} title={field.title} placeholder={field.placeholder} />
          ))}
          <div className="flex">
            <label className="flex-col  font-bold text-title-base">
              <span className="inline-block my-5">매물 증명</span>
              <div className="flex gap-4">
                <input className="hidden" type="file" ref={fileInputRef} />
                <div className="w-[589px] h-[53px] px-4 py-3 border rounded-5  font-normal text-label-lg text-neutral-40">
                  매물 증명을 위한 파일을 첨부해주세요
                </div>
                <button
                  className="w-[119px] h-[53px] px-4 py-3 border rounded-5  font-bold text-primary-50"
                  onClick={handleFileBtnClick}>
                  파일 첨부
                </button>
              </div>
            </label>
          </div>
        </article>
        <article className="flex w-[720px] mx-auto justify-center gap-6">
          <Link to="/signup-terms" className="w-[190px]">
            <Button className="w-full" variant="assistive">
              이전
            </Button>
          </Link>
          <Link to="/signup-completed" className="w-[190px]">
            <Button className="w-full">다음</Button>
          </Link>
        </article>
      </section>
    </main>
  );
}
