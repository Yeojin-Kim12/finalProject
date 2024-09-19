import React from 'react';
import { Link } from 'react-router-dom';

const ServiceOverview = () => {
  const [isSelected, setIsSelected] = React.useState<string>('member');
  return (
    <main className="flex flex-col items-center gap-[5vw]">
      <img src="/ServiceOverview/service-overview-common.png" alt="common" />
      <div className="relative w-[23vw] h-[3vw] py-[2vw] bg-assistive-base rounded-[1.4vw] text-[1vw] font-bold flex items-center">
        <div
          className={`flex items-center justify-center transition-all duration-300 cursor-pointer absolute left-0 w-1/2 h-full z-10 ${isSelected === 'member' ? 'text-static-white' : 'text-assistive-strong'}`}
          onClick={() => setIsSelected('member')}>
          고객
        </div>
        <div
          className={`flex items-center justify-center transition-all duration-300 cursor-pointer absolute right-0  w-1/2 h-full z-10 ${isSelected === 'admin' ? 'text-static-white' : 'text-assistive-strong'}`}
          onClick={() => setIsSelected('admin')}>
          담당자
        </div>
        <div
          className={`transition-transform duration-300 rounded-[1.4vw] w-1/2 h-full shadow-banner bg-primary-strong absolute top-0 left-0 transform ${isSelected === 'member' ? 'translate-x-0' : 'translate-x-full'}`}></div>
      </div>
      {isSelected === 'member' ? (
        <div className="relative">
          <img src="/ServiceOverview/service-overview-member.png" alt="common" />
          {/* 로그인 - 매물등록, 비로그인 - 로그인화면 */}
          <Link to="/">
            <div className="absolute w-[12vw] p-[1vw] bottom-[13vw] left-[53.3vw] border-[1px] border-primary-default text-primary-default font-bold rounded-[1vw] text-center text-[1vw]">
              인기 매물 보러가기
            </div>
          </Link>
        </div>
      ) : (
        <div className="relative">
          <img src="/ServiceOverview/service-overview-admin.png" alt="common" />
          <Link to="/">
            <div className="absolute w-[12vw] p-[1vw] bottom-[4vw] inset-x-0 mx-auto bg-static-white border-[1px] border-primary-default text-primary-default font-bold rounded-[1vw] text-center text-[1vw]">
              미분양 매물 등록하기
            </div>
          </Link>
        </div>
      )}
    </main>
  );
};

export default ServiceOverview;
