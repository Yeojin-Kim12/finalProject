import * as React from 'react';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDots } from '@phosphor-icons/react';

interface SingleDatePickerProps {
  defaultLabel: string;
  value?: Date | undefined;
  onChange: (date: Date | undefined) => void;
}
const SingleDatePicker = ({ defaultLabel, value, onChange }: SingleDatePickerProps) => {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const handleToggle = () => {
    setIsActive((prevState) => !prevState);
  };
  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    onChange(date);
  };
  // value prop이 변경될 때마다 date 상태를 업데이트
  React.useEffect(() => {
    setDate(value);
  }, [value]);
  const handleReset = () => {
    setDate(undefined);
    onChange(undefined);
  };

  return (
    <Popover onOpenChange={handleToggle}>
      <PopoverTrigger asChild>
        <Button
          variant="assistive"
          size="sm"
          className={cn(
            'w-[187px] justify-between  font-normal pl-7 pr-5 py-4 text-label-lg rounded-5',
            isActive && 'shadow-focus',
          )}>
          {date ? formatDate(date) : <span>{defaultLabel}</span>}
          <CalendarDots size={24} weight="light" className="text-assistive-default" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto  px-6 py-6  z-50 bg-static-white" align="start">
        <Calendar mode="single" selectedDate={date} setDate={handleDateChange} />
        <footer className="flex px-6 py-4 justify-end">
          <Button variant="assistive" size="xs" onClick={handleReset} className="w-[115px]">
            초기화
          </Button>
        </footer>
      </PopoverContent>
    </Popover>
  );
};
export default SingleDatePicker;
