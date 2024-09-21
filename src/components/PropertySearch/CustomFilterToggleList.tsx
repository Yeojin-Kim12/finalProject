import { type ListItem } from '@/constants/keywordIconMap';
import React, { useCallback, useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import CustomFilterToggleItem from './CustomFilterToggleItem';
import useResponsive from '@/hooks/useResponsive';
import { CaretDown, CaretUp } from '@phosphor-icons/react';

export interface CustomFilterToggleListProps {
  list: ListItem[];
  activeItems: string[];
  onToggle: (title: string) => void;
}

const CustomFilterToggleList = ({ list, onToggle, activeItems }: CustomFilterToggleListProps) => {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const [open, setOpen] = React.useState<boolean>(false);
  const { events } = useDraggable(ref); //
  const handleToggle = useCallback(
    (title: string) => {
      onToggle(title);
    },
    [onToggle],
  );
  const { isDesktop } = useResponsive();
  return (
    <>
      {/* isDesktop */}
      <div className="relative">
        <div
          className={` w-full bg-assistive-base px-7 py-6 gap-9 grid-cols-6 grid ${!isDesktop && 'hidden'} ${list.length > 6 && !open ? 'max-h-[200px]' : 'max-h-[500px]'} transition-all duration-300 overflow-hidden z-50`}>
          <div className="absolute w-full top-0 left-0 h-[1px] shadow-shadow"></div>
          {list.map((listItem) => (
            <CustomFilterToggleItem
              key={listItem.title}
              title={listItem.title}
              onIcon={listItem.onIcon}
              offIcon={listItem.offIcon}
              isActive={activeItems.includes(listItem.title)}
              onClick={() => handleToggle(listItem.title)}
            />
          ))}
        </div>
        {isDesktop && list.length > 6 && (
          <div
            className="absolute -bottom-5 inset-x-0 mx-auto size-[36px] rounded-10 bg-static-white flex items-center justify-center cursor-pointer p-2 shadow-shadow"
            onClick={() => setOpen(!open)}>
            {open ? (
              <CaretUp weight="bold" className="size-full text-primary-default" />
            ) : (
              <CaretDown weight="bold" className="size-full text-primary-default" />
            )}
          </div>
        )}
      </div>
      {/* !isDesktop */}
      <div
        className={`relative w-full bg-assistive-base px-7 py-6 flex gap-9 mobile:gap-5 overflow-x-scroll ${isDesktop && 'hidden'}`}
        {...events}
        ref={ref}>
        <div className="absolute w-full top-0 left-0 h-[1px] shadow-shadow"></div>
        {list.map((listItem) => (
          <CustomFilterToggleItem
            key={listItem.title}
            title={listItem.title}
            onIcon={listItem.onIcon}
            offIcon={listItem.offIcon}
            isActive={activeItems.includes(listItem.title)}
            onClick={() => handleToggle(listItem.title)}
          />
        ))}
      </div>
    </>
  );
};
export default CustomFilterToggleList;
