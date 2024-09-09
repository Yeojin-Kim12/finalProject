import * as React from 'react';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDots } from '@phosphor-icons/react';
import { DateRange } from 'react-day-picker';

interface RangeDatePickerProps {
  fromLabel: string;
  toLabel: string;
  onChange: (range: DateRange | undefined) => void;
  initialRange?: DateRange;
}

const RangeDatePicker = ({ fromLabel, toLabel, onChange, initialRange }: RangeDatePickerProps) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(initialRange);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const handleToggle = () => {
    setIsActive((prevState) => !prevState);
  };

  const handleReset = () => {
    setDateRange(undefined);
    onChange(undefined);
  };
  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    onChange(range);
  };
  const getDateLabel = () => {
    if (dateRange?.from && dateRange?.to) {
      return (
        <>
          <span>{formatDate(dateRange.from)}</span> <span>-</span> <span>{formatDate(dateRange.to)}</span>
        </>
      );
    }
    if (dateRange?.from) {
      return (
        <>
          <span>{formatDate(dateRange.from)}</span> <span>-</span> <span>{toLabel}</span>
        </>
      );
    }
    return (
      <>
        <span>{fromLabel}</span> <span>-</span> <span>{toLabel}</span>
      </>
    );
  };

  return (
    <Popover onOpenChange={handleToggle}>
      <PopoverTrigger asChild>
        <Button
          // @ts-ignore: Unreachable code error
          variant="default"
          size="sm"
          className={cn(
            'w-[354px] justify-between font-normal pl-7 pr-5 py-4 text-label-lg',
            isActive && 'shadow-focus',
          )}>
          {getDateLabel()}
          <CalendarDots size={24} weight="light" className="text-assistive-default" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto px-6 py-6 z-50 bg-static-white" align="start">
        <Calendar mode="range" selectedRange={dateRange} setRangeDate={handleDateChange} />
        <footer className="flex px-6 py-4 justify-end">
          <Button variant="assistive" size="xs" onClick={handleReset} className="w-[115px]">
            초기화
          </Button>
        </footer>
      </PopoverContent>
    </Popover>
  );
};

export default RangeDatePicker;
