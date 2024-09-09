import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretDown, CaretUp, List, MagnifyingGlass, X } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import { Button } from '../ui/button';
import { InputWithExtras } from '../common/InputWithExtras';

const GNB = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLnbMenuOpen, setIsLnbMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null); // tablet 이하 display - Menu 외부 감지
  const buttonGroupRef = useRef<HTMLDivElement>(null); // 햄버거 버튼, 검색 버튼 외부 처리 X
  const searchRef = useRef<HTMLDivElement>(null); // Search 모달 외부 감지

  const location = useLocation();
  const { isDesktop } = useResponsive();

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsLnbMenuOpen(false);
    setIsSearchOpen(false);
  };
  const handleLnbMenu = () => {
    setIsLnbMenuOpen(!isLnbMenuOpen);
  };

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    closeMenus();
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsLnbMenuOpen(false);
  };

  useEffect(() => {
    // 외부감지
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        (menuRef.current &&
          !menuRef.current.contains(target) &&
          buttonGroupRef.current &&
          !buttonGroupRef.current.contains(target)) ||
        (searchRef.current &&
          !searchRef.current.contains(target) &&
          buttonGroupRef.current &&
          !buttonGroupRef.current.contains(target))
      ) {
        closeMenus();
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDesktop) {
      closeMenus();
    }
  }, [isDesktop]);

  return (
    <>
      <header className="sticky top-0 z-50 desktop:h-[93px] tablet:h-[65px] mobile:h-[54px] pl-9 pr-8 bg-white border-b border-assistive-divider">
        <nav className="flex justify-between items-center w-full h-full">
          <div className="flex gap-8">
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
              <Link to="/">
                <img src="/logo_size_l.png" alt="logo_l" className="hidden desktop:block" />
                <img src="/logo_size_m.png" alt="logo_m" className="hidden tablet:block" />
                <img src="/logo_size_s.png" alt="logo_s" className="hidden mobile:block" />
              </Link>
            </div>

            <div className="hidden desktop:flex items-center w-[771px]">
              <ul className="flex text-assistive-detail text-links-lg font-bold h-full w-full">
                <Link
                  to="/"
                  className={`w-[193px] px-5 py-8 text-center ${location.pathname === '/' ? 'text-primary-default' : ''}`}>
                  홈
                </Link>
                <Link
                  to="/"
                  className={`w-[193px] px-5 py-8 text-center ${location.pathname === '/information' ? 'text-primary-default' : ''}`}>
                  미분양정보
                </Link>
                <Link
                  to="/"
                  className={`w-[193px] px-5 py-8 text-center ${location.pathname === '/service' ? 'text-primary-default' : ''}`}>
                  서비스 소개
                </Link>
                <li
                  className={`w-[193px] px-5 py-8 text-center cursor-pointer relative group ${location.pathname === '/mypage' ? 'text-primary-default' : ''}`}>
                  마이페이지
                  <div className="hidden absolute left-0 top-[93px] w-full bg-white shadow-lg text-assistive-detail group-hover:flex flex-col items-start font-normal z-40">
                    <ul className="w-full">
                      <li className="px-9 py-7 cursor-pointer hover:bg-primary-default hover:text-white hover:font-bold">
                        관심 매물
                      </li>
                      <li className="px-9 py-7 cursor-pointer hover:bg-primary-default hover:text-white hover:font-bold">
                        상담신청 현황
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6" ref={buttonGroupRef}>
            {!isSearchOpen ? (
              <>
                {/* location 수정하기 */}
                <MagnifyingGlass
                  size={32}
                  weight="bold"
                  className={`hidden desktop:block text-assistive-strong cursor-pointer ${location.pathname === '/home' || location.pathname === '/login' || location.pathname === '/search' ? 'desktop:hidden' : 'block'}`}
                  onClick={handleSearch}
                />
                <MagnifyingGlass
                  size={32}
                  weight="thin"
                  className={`block desktop:hidden text-assistive-strong cursor-pointer ${location.pathname === '/home' || location.pathname === '/login' || location.pathname === '/search' ? 'desktop:hidden' : 'block'}`}
                  onClick={handleSearch}
                />
              </>
            ) : (
              <>
                <X
                  size={32}
                  weight="bold"
                  className="hidden desktop:block text-assistive-strong cursor-pointer"
                  onClick={handleSearch}
                />
                <X
                  size={32}
                  weight="thin"
                  className="block desktop:hidden text-assistive-strong cursor-pointer"
                  onClick={handleSearch}
                />
              </>
            )}
            {/* 로그인 시 내용 변경 이후 추가 */}
            <Link to="/login">
              <Button variant="assistive" size="md" className="hidden desktop:block">
                로그인/회원가입
              </Button>
            </Link>
            <List
              size={32}
              weight="thin"
              className="block desktop:hidden text-static-default cursor-pointer"
              onClick={handleMenu}
            />
          </div>
        </nav>
      </header>

      {/* Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="flex flex-col items-start bg-white w-full fixed z-50 shadow-lg text-links-base font-normal text-static-default">
          <ul className="w-full">
            <li className="p-5 ">
              <Link to="/">홈</Link>
            </li>
            <li className="p-5 ">
              <Link to="/">미분양 정보</Link>
            </li>
            <li className="p-5 ">
              <Link to="/">서비스 소개</Link>
            </li>
            {/* 마이페이지 리스트 - 어드민이 로그인 시 내용 변경 이후 추가 */}
            <li
              className={`p-5 flex justify-between cursor-pointer ${
                isLnbMenuOpen ? 'bg-primary-default text-white' : ''
              }`}
              onClick={handleLnbMenu}>
              마이페이지
              {isLnbMenuOpen ? (
                <CaretDown size={24} weight="thin" className="text-white" />
              ) : (
                <CaretUp size={24} weight="thin" className="text-static-default" />
              )}
            </li>
            {isLnbMenuOpen && (
              <div className="flex flex-col items-start bg-white w-full fixed z-50 shadow-lg text-links-sm text-assistive-detail">
                <ul className="w-full">
                  <li className="px-7 py-5 cursor-pointer">관심 매물</li>
                  <li className="px-7 py-5 cursor-pointer">상담신청 현황</li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      )}

      {/* 검색 */}
      {isSearchOpen && (
        <div className="fixed z-40 top-[93px] w-full h-screen bg-effect-elevated">
          <div
            ref={searchRef}
            className="flex items-center justify-center w-full h-60 px-9 tablet:h-52 mobile:h-44 desktop:px-0 bg-white">
            <div className="w-[1200px] h-[80px] mobile:h-[52px]">
              <InputWithExtras
                type="text"
                placeholder="아파트명, 지역명으로 검색하세요"
                className="w-full px-9 py-7 mobile:px-7 mobile:py-4 border-2 border-primary-default rounded-10 focus:border-2 focus:border-primary-default focus:shadow-default"
                trailingExtra={
                  <>
                    <MagnifyingGlass
                      size={32}
                      weight="bold"
                      className="block mobile:hidden text-assistive-strong cursor-pointer"
                    />
                    <MagnifyingGlass
                      size={24}
                      weight="bold"
                      className="hidden mobile:block text-assistive-strong cursor-pointer"
                    />
                  </>
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GNB;
