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
const data = {
  today: {
    pending: 0,
    completed: 0,
    all: 0,
  },
  thisWeekProgress: {
    completed: 0,
    all: 0,
  },
  lastWeekProgress: {
    completed: 0,
    all: 0,
  },
  totalNumberByWeek: [0, 0, 0, 0, 7],
  highestConsultation: {
    propertyName: '건물 1',
    all: 5,
  },
  lowestConsultation: {
    propertyName: '건물 2',
    all: 2,
  },
};
const dashboard2Data = {
  totalPages: 1,
  pageSize: 5,
  currentPage: 0,
  totalCount: 15,
  contents: [
    {
      propertyName: '반포 더 숲자이 ',
      pending: 23,
      all: 20,
    },
    {
      propertyName: '양평 리버사이드',
      pending: 21,
      all: 35,
    },
    {
      propertyName: '계양 학마을서원',
      pending: 24,
      all: 52,
    },
    {
      propertyName: '청계 힐스테이트',
      pending: 42,
      all: 80,
    },
    {
      propertyName: '김포 북변 우미린 파크리뷰',
      pending: 7,
      all: 43,
    },
  ],
};
export { data, KeywordData, dashboard2Data };
