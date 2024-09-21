import * as React from 'react';
import { CaretDown, CaretUp, ArrowClockwise } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DropdownProps {
  items: Array<{ value: string; label: string }>;
  defaultLabel: string;
  onSelect: (value: string) => void;
  buttonWidth?: string;
  value?: string;
}

export default function DropdownWithReset({
  items,
  defaultLabel,
  onSelect,
  buttonWidth,
  value,
}: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState('');

  const selectedItem = items.find((item) => item.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="assistive"
          size="lg"
          role="combobox"
          aria-expanded={open}
          className={`font-pretendard font-normal text-label-lg !text-static-default justify-center ${buttonWidth}`}>
          {selectedItem ? selectedItem.label : defaultLabel}
          {open ? (
            <CaretUp className="ml-4 h-7 w-7 shrink-0 text-static-default transition-transform duration-200" />
          ) : (
            <CaretDown className="ml-4 h-7 w-7 shrink-0 text-static-default transition-transform duration-200" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    if (currentValue === value) {
                      // If the current value is already selected, reset
                      onSelect('');
                    } else {
                      // Set the selected value
                      onSelect(currentValue);
                    }
                    setOpen(false);
                    onSelect(currentValue);
                  }}>
                  {item.label}
                </CommandItem>
              ))}
              <CommandItem
                className="flex items-center text-label-s gap-3 bg-assistive-base border-t-2"
                onSelect={() => {
                  onSelect(''); // Reset the value
                  setOpen(false);
                  onSelect(''); // Call onSelect with an empty string to indicate reset
                }}>
                <ArrowClockwise size={16} weight="light" />
                초기화
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
