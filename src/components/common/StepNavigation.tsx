import { Button } from '../ui/button';

interface StepNavigationProps {
  next: () => void;
  back: () => void;
  isLastStep: boolean;
  lastLabel: string;
}

const StepNavigation = ({ next, back, isLastStep, lastLabel }: StepNavigationProps) => {
  return (
    <div className="flex mx-auto justify-stretch gap-6 w-[400px] mobile:w-full mobile:gap-5">
      <Button variant="assistive" onClick={back} className="w-full">
        이전
      </Button>
      {isLastStep ? (
        <Button type="button" onClick={next} className="w-full">
          {lastLabel}
        </Button>
      ) : (
        <Button type="button" onClick={next} className="w-full">
          다음
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;
