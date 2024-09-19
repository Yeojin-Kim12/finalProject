import RadioButton from '../ui/radiobutton';
import { Textarea } from '../ui/textarea';

interface TextAreaProps {
  id: string;
  label: string;
  errorMessage?: string;
  text: string;
  value: string;
  onChange: (value: any) => void;
  trigger: (name?: string | string[]) => void; // trigger 함수 추가
}

const TextAreaWithRadio = ({ id, label, text, errorMessage, value, onChange, trigger }: TextAreaProps) => {
  const handleRadioChange = (newValue: string) => {
    onChange(newValue); // 상태 변경
    trigger(id); // 유효성 검사 다시 실행
  };

  return (
    <div className="flex flex-col">
      <label className="my-5 text-title-base font-bold mobile:text-title-base-m">{label}</label>
      <div className="flex flex-col gap-3">
        <Textarea disabled text={text} className={`${errorMessage && 'shadow-error'}`} />
        <div className="flex items-center gap-3 text-label-lg mobile:text-label-lg-m">
          <RadioButton id={id} value={value} onChange={handleRadioChange} />
          <p>동의합니다</p>
          <p className="text-primary-default">[필수]</p>
          {errorMessage && <p className="text-detail-lg text-accent-error">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default TextAreaWithRadio;
