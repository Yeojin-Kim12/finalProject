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

  errorMessage?: { startDate?: string; endDate?: string };
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
          const adjustKST = (date: Date) => {
            const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            return offsetDate;
          };

          if (range?.from) {
            const startDate = adjustKST(new Date(range.from));
            setValue(`${name}.startDate`, startDate.toISOString().split('T')[0]);
          }
          if (range?.to) {
            const endDate = adjustKST(new Date(range.to));
            setValue(`${name}.endDate`, endDate.toISOString().split('T')[0]);
          }
          field.onChange({
            startDate: range?.from ? adjustKST(new Date(range.from)).toISOString().split('T')[0] : '',
            endDate: range?.to ? adjustKST(new Date(range.to)).toISOString().split('T')[0] : '',
          });
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
              fieldError={fieldState.error}
              errorMessage={errorMessage}
            />
            {optional && <label className="text-accent-error text-detail-lg">선택</label>}

            <div className="flex">
              <div className="relative w-full"></div>
            </div>
            {(fieldState.error || errorMessage) && (
              <p className="absolute left-0 mt-1 text-sm text-accent-error">
                {fieldState.error?.message || errorMessage?.startDate || errorMessage?.endDate}
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
