import { useFormContext, Controller } from 'react-hook-form';
import RangeDatePicker from './RangeDatePicker';
import { DateRange } from 'react-day-picker';

interface PropertyDateValidationProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  onButtonClick?: () => void;

  errorMessage?: string;
  numberOnly?: boolean;
  optional?: boolean;
}

const PropertyDateValidation = ({
  name,
  label,
  className,
  errorMessage,
  optional,
}: PropertyDateValidationProps) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const handleDateChange = (range: DateRange | undefined) => {
          if (range?.from) {
            setValue(`${name}.startDate`, range.from);
          }
          if (range?.to) {
            setValue(`${name}.endDate`, range.to);
          }
          field.onChange(range);
        };
        const initialDate = field.value;

        return (
          <div className={`relative mb-4 ${className}`}>
            {label && (
              <label className="block my-3 text-title-base font-bold text-static-default">{label}</label>
            )}
            <RangeDatePicker
              fromLabel="모집시작일"
              toLabel="모집마감일"
              onChange={handleDateChange}
              initialRange={initialDate}
            />
            {optional && <label className="text-accent-error text-detail-lg">선택</label>}

            <div className="flex">
              <div className="relative w-full"></div>
            </div>
            {(fieldState.error || errorMessage) && (
              <p className="absolute left-0 mt-1 text-sm text-accent-error">
                {fieldState.error?.message || errorMessage}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

PropertyDateValidation.displayName = 'PropertyDateValidation';

export default PropertyDateValidation;
