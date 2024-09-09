import * as React from 'react';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDots } from '@phosphor-icons/react';

interface SingleDatePickerProps {
  defaultLabel: string;
  onChange: (date: Date | undefined) => void;
}
const SingleDatePicker = ({ defaultLabel, onChange }: SingleDatePickerProps) => {
  const [date, setDate] = React.useState<Date | undefined>();
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const handleToggle = () => {
    setIsActive((prevState) => !prevState);
  };
  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    onChange(date);
  };
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
            'w-[187px] justify-between  font-normal pl-7 pr-5 py-4 text-label-lg',
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
