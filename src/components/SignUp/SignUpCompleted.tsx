import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CompleteLarge from '@/assets/CompleteLarge';

const SignUpCompleted = () => {
  const location = useLocation();
  const name = location.state?.name || '고객';
  const type = location.state?.type;
  return (
    <main className="flex w-full min-h-[900px] justify-center items-center mobile:px-5">
      <section className="flex flex-col justify-center gap-[120px] mobile:gap-12">
        <article className="flex flex-col items-center gap-9 mobile:gap-6">
          <CompleteLarge className="size-11 text-primary-strong mobile:size-9" />
          <p className="text-center font-bold text-heading-base text-static-default mobile:text-heading-sm-m">
            {name}님, 환영합니다!
            <br />
            회원가입이 완료되었어요
          </p>
          {type === 'member' ? (
            <p className="text-center text-body-lg text-assistive-strong mobile:text-body-base-m">
              <span className="text-assistive-detail font-bold">{name}님</span>에게 딱 맞는 미분양 매물을
              찾아보세요
            </p>
          ) : (
            <p className="text-center text-body-lg text-assistive-strong mobile:text-body-base-m">
              회원가입 완료는 <span className="text-assistive-detail font-bold">최대 5일</span> 정도 소요될 수
              있습니다.
            </p>
          )}
        </article>
        <article className="flex justify-stretch gap-6 w-[400px] mobile:w-full mobile:gap-5">
          <Link to="/" className="w-1/2">
            <Button className="w-full" variant="assistive">
              홈으로 이동
            </Button>
          </Link>
          <Link to="/login" className="w-1/2">
            <Button className="w-full">로그인</Button>
          </Link>
        </article>
      </section>
    </main>
  );
};

export default SignUpCompleted;
