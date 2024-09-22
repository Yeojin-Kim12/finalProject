import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaretDown, CaretUp, List, MagnifyingGlass, X } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import { Button } from '../ui/button';
import SearchBar from '../common/SearchBar';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';
import { loginState } from '@/recoilstate/login/atoms';
import { useRecoilState } from 'recoil';

const GNB = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLnbMenuOpen, setIsLnbMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginData, setLoginData] = useRecoilState(loginState);
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement>(null); // tablet 이하 display - Menu 외부 감지
  const buttonGroupRef = useRef<HTMLDivElement>(null); // 햄버거 버튼, 검색 버튼 외부 처리 X
  const searchRef = useRef<HTMLDivElement>(null); // Search 모달 외부 감지

  const location = useLocation();
  const { isDesktop, isMobile } = useResponsive();

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

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      setLoginData({
        isLoggedIn: false,
        userInfo: null,
      });
    } catch (error) {
      console.error('Logout failed', error);
    }

    window.location.replace('/');
  };

  const adminLinks = [
    { to: '/dashboard', label: '대시보드' },
    { to: '/customer-service', label: '고객 관리' },
    { to: '/property-management', label: '매물 관리' },
  ];

  const userLinks = [
    { to: '/favorite', label: '관심 매물' },
    { to: '/counsel-list', label: '상담신청 현황' },
  ];

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
      <header className="sticky top-0 z-50 desktop:h-[93px] tablet:h-[65px] mobile:h-[54px] pl-9 pr-8 tablet:px-7 mobile:px-5 bg-white border-b border-assistive-divider">
        <nav className="flex justify-between items-center w-full h-full max-w-[1920px] mx-auto">
          <div className="flex gap-8">
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
              <Link to="/">
                <img src="/images/logos/logo_size_l.png" alt="logo_l" className="hidden desktop:block" />
                <img src="/images/logos/logo_size_m.png" alt="logo_m" className="hidden tablet:block" />
                <img src="/images/logos/logo_size_s.png" alt="logo_s" className="hidden mobile:block" />
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
                  to="/property"
                  className={`w-[193px] px-5 py-8 text-center ${location.pathname === '/property' ? 'text-primary-default' : ''}`}>
                  미분양정보
                </Link>
                <Link
                  to="/service-overview"
                  className={`w-[193px] px-5 py-8 text-center ${location.pathname === '/service-overview' ? 'text-primary-default' : ''}`}>
                  서비스 소개
                </Link>
                {loginData.isLoggedIn && (
                  <div
                    className={`block w-[193px] px-5 py-8 text-center cursor-pointer relative group ${location.pathname === '/favorite' || location.pathname === '/counsel-list' || location.pathname === '/dashboard' || location.pathname === '/customer-service' || location.pathname === '/property-management' ? 'text-primary-default' : ''}`}
                    onClick={() => navigate('/favorite')}>
                    <p>마이페이지</p>
                    <div className="hidden absolute left-0 top-[93px] w-full bg-white shadow-lg text-assistive-detail group-hover:flex flex-col items-start font-normal z-40">
                      <ul className="w-full">
                        {loginData.userInfo?.role === 'ADMIN'
                          ? adminLinks.map((link) => (
                              <Link
                                key={link.to}
                                to={link.to}
                                className={`block px-9 py-7 cursor-pointer hover:bg-primary-default hover:text-white hover:font-bold ${
                                  location.pathname === link.to ? 'text-primary-default font-bold' : ''
                                }`}
                                onClick={(e) => e.stopPropagation()}>
                                {link.label}
                              </Link>
                            ))
                          : userLinks.map((link) => (
                              <Link
                                key={link.to}
                                to={link.to}
                                className={`block px-9 py-7 cursor-pointer hover:bg-primary-default hover:text-white hover:font-bold ${
                                  location.pathname === link.to ? 'text-primary-default font-bold' : ''
                                }`}
                                onClick={(e) => e.stopPropagation()}>
                                {link.label}
                              </Link>
                            ))}
                        <li
                          className="block px-9 py-7 cursor-pointer hover:bg-primary-default hover:text-white hover:font-bold"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLogout();
                          }}>
                          로그아웃
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6" ref={buttonGroupRef}>
            {!isSearchOpen ? (
              <>
                <MagnifyingGlass
                  size={32}
                  weight={isDesktop ? 'bold' : 'thin'}
                  className={`block text-assistive-strong cursor-pointer ${location.pathname === '/' || location.pathname === '/login' || location.pathname === '/search' ? 'desktop:hidden' : 'block'}`}
                  onClick={handleSearch}
                />
              </>
            ) : (
              <X
                size={32}
                weight={isDesktop ? 'bold' : 'thin'}
                className="hidden desktop:block text-assistive-strong cursor-pointer"
                onClick={handleSearch}
              />
            )}
            {loginData.isLoggedIn && loginData.userInfo ? (
              <p className="text-detail-xl text-assistive-detail hidden desktop:block">
                <span className="text-primary-default font-bold">{loginData.userInfo.name}</span>님 반갑습니다
              </p>
            ) : (
              <Link to="/login">
                <Button variant="assistive" size="md" className="hidden desktop:block">
                  로그인/회원가입
                </Button>
              </Link>
            )}

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
            <li
              onClick={() => {
                setIsLnbMenuOpen(false);
                setIsMenuOpen(false);
              }}>
              <Link to="/" className="block p-5">
                홈
              </Link>
            </li>
            <li
              onClick={() => {
                setIsLnbMenuOpen(false);
                setIsMenuOpen(false);
              }}>
              <Link to="/property" className="block p-5">
                미분양 정보
              </Link>
            </li>
            <li
              onClick={() => {
                setIsLnbMenuOpen(false);
                setIsMenuOpen(false);
              }}>
              <Link to="/service-overview" className="block p-5">
                서비스 소개
              </Link>
            </li>
            {loginData.isLoggedIn ? (
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
            ) : (
              <li
                onClick={() => {
                  setIsLnbMenuOpen(false);
                  setIsMenuOpen(false);
                }}>
                <Link to="/login" className="block p-5">
                  로그인/회원가입
                </Link>
              </li>
            )}
            {isLnbMenuOpen && (
              <div className="flex flex-col items-start bg-white w-full fixed z-50 shadow-lg text-links-sm text-assistive-detail">
                <ul className="w-full">
                  {loginData.userInfo?.role === 'ADMIN'
                    ? adminLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="block px-7 py-5 cursor-pointer"
                          onClick={() => {
                            setIsLnbMenuOpen(false);
                            setIsMenuOpen(false);
                          }}>
                          {link.label}
                        </Link>
                      ))
                    : userLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="block px-7 py-5 cursor-pointer"
                          onClick={() => {
                            setIsLnbMenuOpen(false);
                            setIsMenuOpen(false);
                          }}>
                          {link.label}
                        </Link>
                      ))}
                  <li className="block px-7 py-5 cursor-pointer" onClick={handleLogout}>
                    로그아웃
                  </li>
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
              <SearchBar
                type="text"
                placeholder="아파트명, 지역명으로 검색하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/search?search=${searchQuery}`);
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }
                }}
                className="w-full px-9 py-7 mobile:px-7 mobile:py-4 border-2 border-primary-default rounded-10 focus:border-2 focus:border-primary-default focus:shadow-default"
                trailingExtra={
                  <MagnifyingGlass
                    size={isMobile ? 24 : 32}
                    weight="bold"
                    className="block text-primary-default cursor-pointer"
                    onClick={() => {
                      navigate(`/search?search=${searchQuery}`);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                  />
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
