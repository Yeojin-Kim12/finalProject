import useResponsive from '@/hooks/useResponsive';
import StepperIcon1 from './StepperIcon1';
import StepperIcon2 from './StepperIcon2';
import StepperIcon3 from './StepperIcon3';
import StepperIcon4 from './StepperIcon4';
import StepperIconMobile1 from './StepperIconMobile1';
import StepperIconMobile2 from './StepperIconMobile2';
import StepperIconMobile3 from './StepperIconMobile3';
import StepperIconMobile4 from './StepperIconMobile4';

interface StepperProps {
  currentStep: number;
  stepLabel: string[];
}

const Stepper = ({ currentStep, stepLabel }: StepperProps) => {
  const { isMobile } = useResponsive();
  const mobileIcons = [StepperIconMobile1, StepperIconMobile2, StepperIconMobile3, StepperIconMobile4];
  const desktopIcons = [StepperIcon1, StepperIcon2, StepperIcon3, StepperIcon4];
  const adjustedDesktopIcons =
    stepLabel.length < 4 ? [StepperIcon1, StepperIcon2, StepperIcon4] : desktopIcons;

  const stepComponents = isMobile ? mobileIcons.slice(0, stepLabel.length) : adjustedDesktopIcons;
  return (
    <div className="flex items-center">
      {stepComponents.map((StepComponent, index) => {
        const isActive = currentStep === index + 1;
        const labelIndex = isMobile ? index : stepLabel.length === 4 ? index : Math.min(index, 2);

        return (
          <div key={labelIndex} className="flex items-center">
            <div className="flex flex-col items-center w-[100px] mobile:w-[56px] gap-4 mobile:gap-2">
              <StepComponent className={isActive ? 'text-primary-strong' : 'text-assistive-divider'} />
              <p
                className={`${
                  isActive ? 'text-assistive-strong' : 'text-assistive-divider'
                } font-bold text-title-xs mobile:text-label-sm-m`}>
                {stepLabel[index]}
              </p>
            </div>
            {stepLabel.length !== index + 1 && (
              <div className="w-8 mobile:w-4 h-[1px] m-[10px] mobile:m-2  bg-assistive-divider"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
