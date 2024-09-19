import { FieldValues, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { Textarea, TextareaProps } from '../ui/textarea';
import RadioButton from '../ui/radiobutton';

interface TextAreaProps extends TextareaProps {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errorMessage?: string;
  getValues: UseFormGetValues<FieldValues>;
  required?: boolean;
}

const TextAreaWithRadio = ({
  id,
  label,
  text,
  register,
  errorMessage,
  getValues,
  required,
}: TextAreaProps) => {
  return (
    <div className="flex flex-col">
      <label className="my-5 text-title-base font-bold mobile:text-title-base-m">{label}</label>
      <div className="flex flex-col gap-3">
        <Textarea disabled text={text} />
        <div className="flex items-center gap-3 text-label-lg mobile:text-label-lg-m">
          <RadioButton id={id} register={register} required={required} getValues={getValues} />
          <p>동의합니다</p>
          <p className="text-primary-default">[필수]</p>
          {errorMessage && <p className="text-detail-lg text-accent-error">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default TextAreaWithRadio;
