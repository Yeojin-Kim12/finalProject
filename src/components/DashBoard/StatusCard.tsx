interface StatusCardProps {
  label: string;
  value: number;
}
const StatusCard = ({ label, value }: StatusCardProps) => {
  let valueColor = '';
  switch (label) {
    case '상담신청':
      valueColor = 'text-information-strong';
      break;
    case '상담완료':
      valueColor = 'text-primary-default';
      break;
    case '상담대기':
      valueColor = 'text-accent-strong';
      break;
    default:
      valueColor = 'text-assistive-strong';
  }
  return (
    <div className="flex flex-col items-center">
      <span className="text-label-lg text-assistive-strong">{label}</span>
      <span className={`text-title-2xl font-bold ${valueColor}`}>{value}</span>
    </div>
  );
};

export default StatusCard;
