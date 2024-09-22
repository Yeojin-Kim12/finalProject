import { X } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import useResponsive from '@/hooks/useResponsive';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../ui/drawer';
import { Popover, PopoverContent } from '../ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { getValues } from '@/utils/selectedValue';

interface SelectedMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitFilters: (filters: {
    price: { min: number | undefined | null; max: number | undefined | null };
    squareMeter: { min: number | undefined | null; max: number | undefined | null };
    householdNumber: { min: number | undefined | null; max: number | undefined | null };
    priceSelectedIds: number[];
    squareMeterSelectedIds: number[];
    householdNumberSelectedIds: number[];
  }) => void;
  filters: {
    price: { min: number | undefined | null; max: number | undefined | null };
    squareMeter: { min: number | undefined | null; max: number | undefined | null };
    householdNumber: { min: number | undefined | null; max: number | undefined | null };
    priceSelectedIds: number[];
    squareMeterSelectedIds: number[];
    householdNumberSelectedIds: number[];
  };
}

const SelectedMenu = ({ isOpen, onClose, onSubmitFilters, filters }: SelectedMenuProps) => {
  const [activeTab, setActiveTab] = useState<'price' | 'squareMeter' | 'householdNumber'>('price');
  const [priceRange, setPriceRange] = useState(filters.price);
  const [priceSelectedIds, setPriceSelectedIds] = useState(filters.priceSelectedIds);
  const [squareMeterRange, setSquareMeterRange] = useState(filters.squareMeter);
  const [squareMeterSelectedIds, setSquareMeterSelectedIds] = useState(filters.squareMeterSelectedIds);
  const [householdNumberRange, setHouseholdNumberRange] = useState(filters.householdNumber);
  const [householdNumberSelectedIds, setHouseholdNumberSelectedIds] = useState(
    filters.householdNumberSelectedIds,
  );

  // 제곱미터
  const [isSquareMeterToggle, setIsSquareMeterToggle] = useState(false);
  const { isMobile } = useResponsive();

  const handleTabChange = (tab: 'price' | 'squareMeter' | 'householdNumber') => {
    setActiveTab(tab);
  };

  const handleButtonClick = (value: number, id: number) => {
    let rangeSetter: React.Dispatch<
      React.SetStateAction<{ min: number | undefined | null; max: number | undefined | null }>
    >;
    let selectedIdsSetter: React.Dispatch<React.SetStateAction<number[]>> = setPriceSelectedIds;

    if (activeTab === 'price') {
      rangeSetter = setPriceRange;
      selectedIdsSetter = setPriceSelectedIds;
    } else if (activeTab === 'squareMeter') {
      rangeSetter = setSquareMeterRange;
      selectedIdsSetter = setSquareMeterSelectedIds;
    } else if (activeTab === 'householdNumber') {
      rangeSetter = setHouseholdNumberRange;
      selectedIdsSetter = setHouseholdNumberSelectedIds;
    }

    selectedIdsSetter((prevIds) => {
      if (id === 1) {
        rangeSetter({ min: undefined, max: undefined });
        return [1];
      }
      if (id === 2) {
        rangeSetter({ min: 0, max: value });
        return [2];
      }
      if (id === 10) {
        rangeSetter({ min: value, max: null });
        return [10];
      }
      if (prevIds.includes(id)) {
        return prevIds;
      }

      if (prevIds.length === 0 || prevIds.includes(1) || prevIds.includes(2) || prevIds.includes(10)) {
        rangeSetter({ min: value, max: undefined });
        return [id];
      }
      if (prevIds.length === 1) {
        rangeSetter((prevRange) => {
          if (value < prevRange.min!) {
            return { min: value, max: prevRange.min };
          } else {
            return { min: prevRange.min, max: value };
          }
        });
        return [...prevIds, id];
      }

      rangeSetter({ min: value, max: undefined });
      return [id];
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'min' | 'max') => {
    const value = parseInt(e.target.value, 10) || 0;

    let rangeSetter: React.Dispatch<
      React.SetStateAction<{ min: number | undefined | null; max: number | undefined | null }>
    > = setPriceRange;
    let selectedIdsSetter: React.Dispatch<React.SetStateAction<number[]>> = setPriceSelectedIds;

    if (activeTab === 'price') {
      rangeSetter = setPriceRange;
      selectedIdsSetter = setPriceSelectedIds;
    } else if (activeTab === 'squareMeter') {
      rangeSetter = setSquareMeterRange;
      selectedIdsSetter = setSquareMeterSelectedIds;
    } else if (activeTab === 'householdNumber') {
      rangeSetter = setHouseholdNumberRange;
      selectedIdsSetter = setHouseholdNumberSelectedIds;
    }

    selectedIdsSetter([]);

    rangeSetter((prevRange) => {
      if (field === 'min') {
        return { min: value, max: prevRange.max };
      } else {
        return { min: prevRange.min, max: value };
      }
    });
  };

  const handleSquareMeterToggle = () => {
    setIsSquareMeterToggle((prevToggle) => {
      const newToggle = !prevToggle;
      setSquareMeterRange((prevRange) => {
        const unit = 3.3;
        const changeUnit = (value: number | null | undefined) =>
          value !== null && value !== undefined
            ? newToggle
              ? Math.round(value * unit)
              : Math.round(value / unit)
            : null;

        return {
          min: changeUnit(prevRange.min),
          max: changeUnit(prevRange.max),
        };
      });
      return newToggle;
    });
  };

  const getCurrentRange = () => {
    if (activeTab === 'price') return priceRange;
    if (activeTab === 'squareMeter') return squareMeterRange;
    if (activeTab === 'householdNumber') return householdNumberRange;
    return { min: undefined, max: undefined };
  };

  const getCurrentSelectedIds = () => {
    if (activeTab === 'price') return priceSelectedIds;
    if (activeTab === 'squareMeter') return squareMeterSelectedIds;
    if (activeTab === 'householdNumber') return householdNumberSelectedIds;
    return [];
  };

  const currentRange = getCurrentRange();
  const selectedIds = getCurrentSelectedIds();

  const handleReset = () => {
    setPriceRange({ min: undefined, max: undefined });
    setPriceSelectedIds([1]);
    setSquareMeterRange({ min: undefined, max: undefined });
    setSquareMeterSelectedIds([1]);
    setIsSquareMeterToggle(false);
    setHouseholdNumberRange({ min: undefined, max: undefined });
    setHouseholdNumberSelectedIds([1]);
  };

  const isValidSelection = () => {
    const validPriceSelections = priceSelectedIds.filter((id) => ![1, 2, 10].includes(id));
    const validSquareMeterSelections = squareMeterSelectedIds.filter((id) => ![1, 2, 10].includes(id));
    const validHouseholdSelections = householdNumberSelectedIds.filter((id) => ![1, 2, 10].includes(id));

    const isPriceRangeValid = priceRange.min !== undefined && priceRange.max !== undefined;
    const isSquareMeterRangeValid = squareMeterRange.min !== undefined && squareMeterRange.max !== undefined;
    const isHouseholdNumberRangeValid =
      householdNumberRange.min !== undefined && householdNumberRange.max !== undefined;

    const isValidPrice =
      validPriceSelections.length >= 2 ||
      isPriceRangeValid ||
      priceSelectedIds.includes(1) ||
      priceSelectedIds.includes(2) ||
      priceSelectedIds.includes(10);
    const isValidSquareMeter =
      validSquareMeterSelections.length >= 2 ||
      isSquareMeterRangeValid ||
      squareMeterSelectedIds.includes(1) ||
      squareMeterSelectedIds.includes(2) ||
      squareMeterSelectedIds.includes(10);
    const isValidHousehold =
      validHouseholdSelections.length >= 2 ||
      isHouseholdNumberRangeValid ||
      householdNumberSelectedIds.includes(1) ||
      householdNumberSelectedIds.includes(2) ||
      householdNumberSelectedIds.includes(10);

    return isValidPrice && isValidSquareMeter && isValidHousehold;
  };
  const handleSubmit = () => {
    if (isValidSelection()) {
      const adjustedFilters = {
        price: priceRange,
        squareMeter: squareMeterRange,
        householdNumber: householdNumberRange,
        priceSelectedIds,
        squareMeterSelectedIds,
        householdNumberSelectedIds,
      };

      onSubmitFilters(adjustedFilters);
      onClose();
    } else {
      console.log('2개이상 선택');
    }
  };

  useEffect(() => {
    if (isOpen) {
      setPriceRange(filters.price);
      setPriceSelectedIds(filters.priceSelectedIds);
      setSquareMeterRange(filters.squareMeter);
      setSquareMeterSelectedIds(filters.squareMeterSelectedIds);
      setHouseholdNumberRange(filters.householdNumber);
      setHouseholdNumberSelectedIds(filters.householdNumberSelectedIds);
    }
  }, [isOpen, filters]);

  const renderContent = () => {
    return (
      <>
        <div className={`flex justify-end px-8 py-2 ${isMobile ? 'hidden' : 'block'}`}>
          <X size={32} className="text-assistive-strong cursor-pointer" onClick={onClose} />
        </div>
        <div>
          <div
            className={`flex items-center justify-center w-full gap-2 ${isMobile ? 'text-label-lg-m' : 'py-3 text-label-lg'} font-bold text-center`}>
            <div
              className={`w-full px-7 py-4 ${activeTab === 'price' ? 'text-primary-default' : 'text-assistive-detail'} cursor-pointer`}
              onClick={() => handleTabChange('price')}>
              분양가
            </div>
            <div className="w-[1px] h-6 bg-assistive-strong"></div>
            <div
              className={`w-full px-7 py-4 ${activeTab === 'squareMeter' ? 'text-primary-default' : 'text-assistive-detail'} cursor-pointer`}
              onClick={() => handleTabChange('squareMeter')}>
              면적
            </div>
            <div className="w-[1px] h-6 bg-assistive-strong"></div>
            <div
              className={`w-full px-7 py-4 ${activeTab === 'householdNumber' ? 'text-primary-default' : 'text-assistive-detail'} cursor-pointer`}
              onClick={() => handleTabChange('householdNumber')}>
              세대수
            </div>
          </div>
        </div>
        <div>
          <div
            className={`${!isMobile ? `${activeTab === 'squareMeter' ? '' : 'mt-[64px]'} mx-[50px]` : `${activeTab === 'squareMeter' ? '' : 'mt-[70px]'} my-6`} `}>
            <div className={`${activeTab === 'squareMeter' ? 'block' : 'hidden'} flex justify-end mb-5`}>
              <Button
                size="sm"
                variant="assistive"
                onClick={handleSquareMeterToggle}
                className={`${isSquareMeterToggle && 'bg-primary-strong !text-white'} ${isMobile && 'py-3 px-6'}`}>
                ㎡
              </Button>
            </div>
            <div>
              <div className={`grid grid-cols-5 ${!isMobile ? ' mb-7' : ''}`}>
                {getValues(activeTab, isSquareMeterToggle).map(({ id, value, text }) => (
                  <button
                    key={id}
                    onClick={() => handleButtonClick(value, id)}
                    className={`py-4 text-center border border-assistive-default ${isMobile ? 'text-label-base-m' : 'text-label-sm'} text-assistive-detail ${
                      selectedIds.includes(id) ? 'bg-primary-default text-white' : ''
                    }`}>
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`flex justify-center items-center py-6 gap-3 text-static-default font-bold ${isMobile ? 'text-label-sm-m' : 'text-label-sm'}`}>
            <input
              type="text"
              placeholder="최소"
              value={
                selectedIds.includes(1)
                  ? ''
                  : selectedIds.includes(2)
                    ? ''
                    : currentRange.min
                      ? currentRange.min
                      : ''
              }
              onChange={(e) => handleInputChange(e, 'min')}
              className="w-[123px] px-3 py-4 border rounded-4 text-center"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="5" viewBox="0 0 18 5" fill="none">
              <path
                d="M0 1.72905C0.638831 1.32682 1.35282 1.02142 2.14196 0.812849C2.93111 0.604283 3.77035 0.5 4.65971 0.5C5.34864 0.5 6.01253 0.552142 6.65136 0.656425C7.30271 0.760708 8.10438 0.917132 9.05637 1.1257C9.95825 1.33426 10.7411 1.49441 11.405 1.60615C12.0814 1.71788 12.7641 1.77374 13.453 1.77374C14.3173 1.77374 15.1378 1.66946 15.9144 1.46089C16.691 1.25233 17.3862 0.946927 18 0.544693V3.27095C17.3612 3.67318 16.6472 3.97858 15.858 4.18715C15.0689 4.39572 14.2296 4.5 13.3403 4.5C12.6514 4.5 11.9687 4.44413 11.2923 4.3324C10.6284 4.22067 9.84551 4.06052 8.94363 3.85196C7.99165 3.64339 7.18998 3.48696 6.53862 3.38268C5.89979 3.2784 5.23591 3.22626 4.54697 3.22626C3.68267 3.22626 2.86221 3.33054 2.0856 3.53911C1.30898 3.74767 0.613779 4.05307 0 4.45531V1.72905Z"
                fill="#B2B6BE"
              />
            </svg>
            <input
              type="text"
              placeholder="최대"
              value={
                selectedIds.includes(1)
                  ? ''
                  : selectedIds.includes(10)
                    ? ''
                    : currentRange.max
                      ? currentRange.max
                      : ''
              }
              onChange={(e) => handleInputChange(e, 'max')}
              className="w-[123px] px-3 py-4 border rounded-4 text-center"
            />
          </div>
          <div className={`flex justify-center items-center py-6 gap-5 ${isMobile ? '' : 'px-8'}`}>
            <Button variant="assistive" className="w-[157px]" onClick={handleReset}>
              초기화
            </Button>
            <Button className="w-[157px]" onClick={handleSubmit}>
              적용하기
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="absolute top-7 right-48">
      {isMobile && isOpen ? (
        <Drawer open={true} onOpenChange={onClose}>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          <DrawerContent className={`h-[420px] pt-6 px-5 bg-white`}>
            <DrawerDescription />
            {renderContent()}
          </DrawerContent>
        </Drawer>
      ) : (
        <Popover open={isOpen} onOpenChange={() => false}>
          <PopoverTrigger></PopoverTrigger>
          <PopoverContent className="w-[420px] h-[500px] py-5 bg-white rounded-[40px] shadow-[0_4px_20px_0] shadow-effect-shadow">
            {renderContent()}
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default SelectedMenu;
