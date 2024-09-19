import React from 'react';
import { getPropertyLabel } from '@/lib/utils';
import { CustomFilterToggleButton } from '../ui/CustomFilterToggleButton';

export interface CustomFilterToggleItemProps {
  title: string;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}
const CustomFilterToggleItem = ({
  title,
  onIcon,
  offIcon,
  isActive,
  onClick,
}: CustomFilterToggleItemProps) => {
  const label = getPropertyLabel(title);
  const icon = isActive ? onIcon : offIcon;
  const labelColor = isActive ? 'text-static-white' : 'text-static-default';
  const variant = isActive ? 'fill' : 'default';
  return (
    <CustomFilterToggleButton onClick={onClick} variant={variant}>
      <div
        className={`text-static-default font-bold text-left select-none mobile:w-[56px] break-keep ${labelColor}`}>
        {label}
      </div>
      <div className="absolute bottom-6 right-6 w-full flex justify-end mobile:bottom-3 mobile:right-3">
        <div className="flex items-end size-10 mobile:size-7">{icon}</div>
      </div>
    </CustomFilterToggleButton>
  );
};

export default CustomFilterToggleItem;
