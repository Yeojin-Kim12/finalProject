export interface StepperSvgProps {
  className: string;
}

const StepperIconMobile1 = ({ className }: StepperSvgProps) => {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}>
        <g clipPath="url(#clip0_1630_17774)">
          <path
            d="M12.5 21C17.4706 21 21.5 16.9706 21.5 12C21.5 7.02944 17.4706 3 12.5 3C7.52944 3 3.5 7.02944 3.5 12C3.5 16.9706 7.52944 21 12.5 21Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.875 16.5V7.5L10.625 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1630_17774">
            <rect width="24" height="24" fill="white" transform="translate(0.5)" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default StepperIconMobile1;
