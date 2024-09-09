const KeywordData = {
  infra: [
    {
      name: 'SUBWAY',
      type: 'infra',
      input: [
        {
          input1: '2호선 강남역',
          input2: '차량',
          input3: '15m',
        },
        {
          input1: '잠실역',
          input2: '도보',
          input3: '20m',
        },
      ],
      is_searchable: false,
    },
    {
      name: 'HOSPITAL',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'PARK',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'SHOPPING',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'SCHOOL',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'LIBRARY',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'PUBLIC_FACILITIES',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'GOVERNMENT',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
  ],
  benefit: [
    // 혜택 키워드들
    {
      name: 'DISCOUNT_SALE',
      type: 'benefit',
      input: [
        {
          input1: '20',
          input2: '30',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'BALANCE_DEFERRAL',
      type: 'benefit',
      input: [
        {
          input1: '60',
          input2: '6',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'CASH_PAYMENT',
      type: 'benefit',
      input: 100,
      is_searchable: false,
    },
    {
      name: 'GUARANTEED_PAYMENT',
      type: 'benefit',
      input: 100,
      is_searchable: true,
    },
    {
      name: 'SUPPORT_PAYMENT',
      type: 'benefit',
      input: [
        {
          input1: '무이자',
          input2: '60',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'OPTION_PAYMENT',
      type: 'benefit',
      input: [
        {
          input1: '무상제공',
          input2: '냉장고',
        },
        {
          input1: '사은품',
          input2: '냄비',
        },
      ],
      is_searchable: false,
    },
  ],
};
const DashBoardData = {
  today: {
    // 오늘의 상담진행률
    pending: 2000, // 상담 대기 개수
    completed: 400, // 상담 완료 개수
    all: 2400, // 상담 신청 총 개수
  },
  this_week: {
    // 이번 주 상담진행률
    completed: 3,
    all: 9,
  },
  last_week: {
    // 지난 주 상담 진행률
    completed: 1100,
    all: 2000,
  },
  last_five_weeks: [
    // 금주 기준 지난 다섯 주
    {
      period_label: '1st', // 첫 째 주
      all: 0, // 상담 신청 총 개수
    },
    {
      period_label: '2nd',
      all: 13,
    },
    {
      period_label: '3rd',
      all: 100,
    },
    {
      period_label: '4th',
      all: 200,
    },
    {
      period_label: '5th', // 이번주
      all: 180,
    },
  ],
  highest_consultation: {
    // 상담 신청 수가 가장 높은
    property_name: '청계 힐스테이트', // 매물 이름
    all: 2400,
  },
  lowest_consultation: {
    // 상담 신청 수가 가장 낮은
    property_name: '양평 리버사이드', // 매물 이름
    all: 3,
  },
  allProperties: 15, // 총 매물 개수
  properties: [
    // 현재 페이지의 프로젝트별 현황 (총 5개씩 리턴)
    {
      property_name: '반포 더 숲 자이',
      pending: 9,
      completed: 3,
    },
    {
      property_name: '반포 더 바다 자이',
      pending: 9,
      completed: 3,
    },
  ],
  status_properties: [
    // 현재 선택한 {모집 중|모집 완료}인 매물 목록
    '계양 학마을서원',
    '반포 더 숲 자이',
    '청계 힐스테이트',
    '양평 리버사이드',
  ],
  situation: {
    // 매물 현황
    property_name: '계양 학마을서원', // 이름
    status: 'PENDING', // 모집 중
    period: 'MONTHLY', // daily, weekly, monthly, yearly
    completed: 9, // 상담 완료 개수
    phone: 23, // 전화
    channel: 28, // 채널톡
    lms: 10, // lms
    each_period: [
      // 기간 별 상담 신청 현황
      {
        period_label: '2m', // 2시 기준
        pending: 13,
        completed: 2,
      },
      {
        period_label: '4m', // 4시 기준
        pending: 13,
        completed: 2,
      },
    ],
  },
};

export { DashBoardData, KeywordData };
