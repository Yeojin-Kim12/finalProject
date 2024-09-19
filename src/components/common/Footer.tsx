import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="flex flex-col gap-10 tablet:gap-8 mobile:gap-7 bg-assistive-base p-[50px] tablet:px-[34px] mobile:px-[26px]">
      <nav className="flex gap-[10px] items-center">
        <Link to="abc" className="text-links-base font-bold">
          개인정보처리방침
        </Link>
        <div className="w-[1px] h-6 bg-static-default"></div>
        <Link to="abc" className="text-links-base font-bold">
          서비스이용약관
        </Link>
      </nav>
      <section className="flex mobile:flex-col gap-6 tablet:gap-3 mobile:gap-2 text-detail-sm desktop:text-detail-lg text-static-default">
        <article>
          <h3 className="font-bold">Protect</h3>
        </article>
        <article className="flex flex-col gap-2">
          <div className="flex gap-2 flex-col desktop:flex-row tablet:gap-3 desktop:gap-6">
            <div className="flex gap-2 mobile:flex-col tablet:gap-3 desktop:gap-6">
              <div className="flex gap-2">
                <p>CEO :</p>
                <p className="text-assistive-strong">이규화</p>
              </div>
              <div className="flex gap-2">
                <p>이메일 :</p>
                <a
                  href="mailto:splash@protect.ne.kr"
                  className="text-assistive-strong underline underline-offset-4">
                  splash@protect.ne.kr
                </a>
              </div>
            </div>
            <div className="flex gap-2">
              <p>연락처 :</p>
              <p className="text-assistive-strong">02-6012-0117</p>
            </div>
            <div className="flex gap-2">
              <p>주소 :</p>
              <p className="text-assistive-strong">서울시 공항대로 186 1109호</p>
            </div>
          </div>

          <div className="flex gap-2">
            <p>사업자등록번호 :</p>
            <p className="text-assistive-strong">211-12-64382</p>
          </div>
        </article>
      </section>
      <section className="flex justify-end text-static-default text-detail-sm desktop:text-detail-lg">
        <p>ⓒ 프로텍트 All rights reserved</p>
      </section>
    </footer>
  );
};

export default Footer;
