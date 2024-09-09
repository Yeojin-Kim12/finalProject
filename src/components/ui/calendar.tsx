import * as React from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Select, SelectContent, SelectItem, SelectTrigger } from './select';
import { SelectValue } from '@radix-ui/react-select';

type CalendarProps = {
  mode: 'single' | 'range';
  selectedDate?: Date;
  selectedRange?: DateRange;
  setDate?: (date: Date | undefined) => void;
  setRangeDate?: (range: DateRange | undefined) => void;
  className?: string;
  classNames?: Partial<Record<string, string>>;
};

function Calendar({
  mode,
  selectedDate,
  selectedRange,
  setDate,
  setRangeDate,
  className,
  classNames,
  ...props
}: CalendarProps) {
  const todayDot =
    'after:absolute after:size-[10px] after:bg-primary-strong after:rounded-10 after:top-0 after:inset-x-0 after:mx-auto';
  const firstCellSideExtra =
    'first:after:absolute first:after:w-[20px] first:after:[&:has(>.day-range-middle)]:bg-primary-base first:after:[&:has(>.day-range-end)]:bg-primary-base first:after:-left-[20px] first:after:h-full';
  const lastCellSideExtra =
    'last:after:absolute last:after:w-[20px] last:after:[&:has(>.day-range-middle)]:bg-primary-base last:after:[&:has(>.day-range-start)]:bg-primary-base last:after:-right-[20px] last:after:h-full';
  const [selectedMonth, setSelectedMonth] = React.useState(new Date());

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 1 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleYearChange = (value: string) => {
    const newYear = parseInt(value, 10);
    const newDate = new Date(selectedMonth);
    newDate.setFullYear(newYear);
    setSelectedMonth(newDate);
  };

  const handleMonthChange = (value: string) => {
    const newMonth = parseInt(value, 10);
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newMonth - 1);
    setSelectedMonth(newDate);
  };

  const handlePreviousYear = () => {
    const newDate = new Date(selectedMonth);
    newDate.setFullYear(selectedMonth.getFullYear() - 1);
    setSelectedMonth(newDate);
  };

  const handleNextYear = () => {
    const newDate = new Date(selectedMonth);
    newDate.setFullYear(selectedMonth.getFullYear() + 1);
    setSelectedMonth(newDate);
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(selectedMonth.getMonth() - 1);
    setSelectedMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(selectedMonth.getMonth() + 1);
    setSelectedMonth(newDate);
  };

  const handleSelectSingle = (date: Date | undefined) => {
    setDate?.(date);
  };

  const handleSelectRange = (range: DateRange | undefined) => {
    setRangeDate?.(range);
  };

  const sharedProps = {
    month: selectedMonth,
    onMonthChange: setSelectedMonth,
    showOutsideDays: false,
    locale: ko,
    className: cn('w-[316px] !text-static-default bg-static-white rounded-5', className),
    classNames: {
      caption: 'flex justify-center pt-1 relative items-center',
      caption_label: 'text-sm font-medium',
      table: 'w-full space-y-1',
      head_row: 'flex',
      head_cell: 'size-[45px] p-0 flex items-center justify-center text-detail-base font-normal ',
      row: 'cell_row flex w-full mt-2 [&:has(.>[aria-selected]]:bg-static-default',
      cell: ` size-[45px] text-center p-0 relative [&:has([aria-selected].day-range-start)]:bg-primary-base [&:has([aria-selected].day-range-start)]:rounded-l-10 [&:has([aria-selected].day-range-end)]:bg-primary-base [&:has([aria-selected].day-range-end)]:rounded-r-10 focus-within:relative focus-within:z-20 ${firstCellSideExtra} ${lastCellSideExtra}`,

      day: 'size-[45px] p-0 text-detail-base hover:text-assistive-default',
      day_range_start:
        'day-range-start bg-static-white border-2 border-primary-default !text-primary-default rounded-10 z-10',
      day_range_middle: 'day-range-middle !bg-primary-base !text-static-default !rounded-0',
      day_range_end: 'day-range-end text-static-white',
      day_selected: 'bg-primary-default text-static-white rounded-10 hover:text-static-white',
      day_today: `relative ${todayDot} [&[aria-selected]]:after:content-none`,
      day_outside:
        'day-outside text-assistive-default opacity-50 aria-selected:bg-accent-default aria-selected:text-muted-foreground aria-selected:opacity-30',
      day_disabled: 'text-assistive-default opacity-50',

      day_hidden: 'invisible',
      ...classNames,
    },
    modifiers: { sunday: (date: Date) => date.getDay() === 0 },
    modifiersClassNames: {
      sunday: 'text-accent-strong',
    },
    components: {
      Caption: () => (
        <div className="z-20 relative h-[56px] py-4 border-b border-assistive-default flex items-center gap-6">
          <div className="w-1/2 flex items-center justify-between">
            <button onClick={handlePreviousYear}>
              <CaretLeft size={24} />
            </button>
            <Select
              defaultValue={`${selectedMonth.getFullYear().toString()}`}
              onValueChange={handleYearChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-static-white -left-[30px] z-50">
                {years.map((year) => (
                  <SelectItem key={year} value={`${year.toString()}`}>
                    {year}년
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button onClick={handleNextYear}>
              <CaretRight size={24} />
            </button>
          </div>
          <div className="w-1/2 flex items-center justify-between">
            <button onClick={handlePreviousMonth}>
              <CaretLeft size={24} />
            </button>
            <Select
              defaultValue={(selectedMonth.getMonth() + 1).toString()}
              onValueChange={handleMonthChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-static-white -right-[105px] z-50">
                {months.map((month) => (
                  <SelectItem key={month} value={month.toString()}>
                    {month}월
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button onClick={handleNextMonth}>
              <CaretRight size={24} />
            </button>
          </div>
        </div>
      ),
    },
  };

  return mode === 'single' ? (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={handleSelectSingle}
      {...sharedProps}
      {...props}
    />
  ) : (
    <DayPicker
      mode="range"
      selected={selectedRange}
      onSelect={handleSelectRange}
      {...sharedProps}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
