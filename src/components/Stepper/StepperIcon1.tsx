export interface StepperSvgProps {
  className: string;
}

const StepperIcon1 = ({ className }: StepperSvgProps) => {
  return (
    <div>
      <svg
        width="48"
        height="48"
        viewBox="0 0 49 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}>
        <path
          d="M26.5 42V28L16.5 18L6.5 28V42H16.5M26.5 42H16.5M26.5 42H42.5V8C42.5 7.46957 42.2893 6.96086 41.9142 6.58579C41.5391 6.21071 41.0304 6 40.5 6H20.5C19.9696 6 19.4609 6.21071 19.0858 6.58579C18.7107 6.96086 18.5 7.46957 18.5 8V20M16.5 42V34"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.5 14V14.02"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34.5 14V14.02"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34.5 22V22.02"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34.5 30V30.02"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default StepperIcon1;
