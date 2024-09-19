import { CaretRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface BreadcrmbProps {
  links: string[]; // 순서대로 입력
}

const Breadcrumb = ({ links }: BreadcrmbProps) => {
  if (!links || links.length === 0) {
    return null;
  }

  // 중간 경로가 두 종류밖에 없음, 마지막 경로는 이동X
  const getPath = (link: string) => {
    switch (link) {
      case '마이페이지':
        return '/favorite';
      case '미분양 정보':
        return '/property';
      default:
        return '';
    }
  };

  return (
    <div className="sticky top-[93px] bg-white flex items-center w-full px-6 py-7 text-links-base text-assistive-strong z-30 tablet:top-[65px] mobile:hidden">
      <Link to="/">홈</Link>
      {links.map((link, index) => {
        const isLast = index === links.length - 1;
        return (
          <div key={index} className="flex items-center">
            <CaretRight size={24} />
            {isLast ? <p className="font-bold">{link}</p> : <Link to={getPath(link)}>{link}</Link>}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
