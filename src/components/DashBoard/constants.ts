export const recruitmentStatus = [
  {
    value: 'openList',
    label: '모집중',
  },
  {
    value: 'closedList',
    label: '모집완료',
  },
];
export const timePeriods = [
  { value: 'DAILY', label: '일간' },
  { value: 'WEEKLY', label: '주간' },
  { value: 'MONTHLY', label: '월간' },
];

export const initializeGraphRequirements = (graphInterval: string) => {
  let requirementsCount;

  switch (graphInterval) {
    case 'DAILY':
      requirementsCount = 12; // 12개 데이터
      break;
    case 'WEEKLY':
      requirementsCount = 7; // 7개 데이터
      break;
    case 'MONTHLY':
      requirementsCount = 6; // 6개 데이터
      break;
    default:
      requirementsCount = 0; // 기본값
  }
  return [
    {
      name: '상담신청',
      data: Array(requirementsCount).fill(0),
    },
    {
      name: '상담완료',
      data: Array(requirementsCount).fill(0),
    },
    {
      name: '상담대기',
      data: Array(requirementsCount).fill(0),
    },
  ];
};
