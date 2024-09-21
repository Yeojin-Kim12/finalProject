import * as React from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DropdownProps {
  items: Array<{ value: string; label: string }>;
  defaultLabel: string;
  onSelect: (value: string) => void;
  buttonWidth?: string;
}

export default function Dropdown({ items, defaultLabel, onSelect, buttonWidth }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const selectedItem = items.find((item) => item.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={`${open ? 'outline' : 'assistive'}`}
          size="lg"
          role="combobox"
          aria-expanded={open}
          className={`font-normal text-label-lg !text-static-default justify-between ${buttonWidth}`}>
          {selectedItem ? selectedItem.label : defaultLabel}
          {open ? (
            <CaretUp className="ml-4 h-7 w-7 shrink-0 opacity-50" />
          ) : (
            <CaretDown className="ml-4 h-7 w-7 shrink-0 opacity-50" />
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
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    onSelect(currentValue);
                  }}>
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
