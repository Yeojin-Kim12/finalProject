export interface AreaMapProps {
  className?: string;
  selectedAreas: string[];
  toggleArea: (areaValue: string) => void;
}

const AreaMap = ({ selectedAreas, toggleArea }: AreaMapProps) => {
  const isSelected = (value: string) => selectedAreas.includes(value);

  const unSelectedClassName =
    'absolute text-static-white stroke-assistive-divider  pointer-events-none hover:text-primary-alternative';
  const selectedClassName =
    'absolute text-primary-strong stroke-primary-strong drop-shadow-shadow pointer-events-none';

  const areas = [
    {
      value: '서울',
      viewBox: '0 0 30 26',
      className: 'w-[29px] h-[26px] top-[83px] left-[43px]',
      pathD:
        'M10.9848 25.5198L0.938841 13.342L3.00243 6.86082L18.8578 0.774437L28.9386 15.2163V21.6501L10.9848 25.5198Z',
    },
    {
      value: '전북',
      viewBox: '0 0 104 62',
      className: 'w-[104px] h-[62px] top-[251px] left-[21px]',
      pathD:
        'M20.9187 52.359C20.8793 52.3533 20.8392 52.3549 20.8004 52.3636L0.87397 56.8317L30.3482 0.617982H88.3613L100.997 3.13642L103.002 14.1283L85.0873 61.5675L20.9187 52.359Z',
    },
    {
      value: '경기/인천',
      viewBox: '0 0 90 122',
      className: 'w-[90px] h-[122px] top-[35px] left-[23.5px]',
      pathD:
        'M0.207031 47.6062L36.3743 0.127441C47.4113 4.89234 69.9946 15.239 72.0322 18.5063C74.0698 21.7737 84.7672 70.2395 89.8612 94.064L60.8254 120.101L33.3179 121.632L0.207031 47.6062ZM14.3651 50.1928L10.9051 60.8117L27.3404 80.2798L56.7509 74.0854V63.4665L40.3156 40.4588L14.3651 50.1928Z',
    },
    {
      value: '대구/경북',
      viewBox: '0 0 131 150',
      className: 'w-[130px] h-[149px] top-[137px] left-[131px]',
      pathD:
        'M118.725 109.49C118.73 109.667 118.875 109.808 119.053 109.808H129.96L122.903 140.364L28.1023 149.021L1.04462 123.655V113.151L62.1493 12.1168L115.649 0.977431L118.725 109.49Z',
    },
    {
      value: '대전/충북',
      viewBox: '0 0 94 110',
      className: 'w-[94px] h-[109px] top-[135px] left-[89px]',
      pathD:
        'M23.146 106.591L0.643406 27.0363L30.6839 0.80343L93.2663 12.9023L34.0346 109.533L23.146 106.591Z',
    },
    {
      value: '부산/울산/경남',
      viewBox: '0 0 137 93',
      className: 'w-[136px] h-[92px] top-[271px] left-[113px]',
      pathD:
        'M79.2177 69.5C79.1157 69.5089 79.0238 69.5649 78.9692 69.6514L64.489 92.5596L15.4982 78.7985L1.00593 46.191L18.9108 1.06167L44.2533 25.886C44.3223 25.9535 44.4175 25.9872 44.5136 25.9781L136.266 17.2882L125.832 65.4118L79.2177 69.5Z',
    },
    {
      value: '세종/충남',
      viewBox: '0 0 104 89',
      className: 'w-[103px] h-[88px] top-[157px] left-0',
      pathD:
        'M16.2909 30.2422C16.2557 30.1309 16.1638 30.0467 16.0498 30.0212L0.439804 26.5344L10.0052 1.13575L56.1287 8.74009C56.1463 8.74299 56.1642 8.74445 56.182 8.74445H83.2463L102.662 83.5499H46.9043C46.8614 83.5499 46.819 83.5583 46.7793 83.5746L34.7388 88.5374L16.2909 30.2422Z',
    },
    {
      value: '강원',
      viewBox: '0 0 193 160',
      className: 'w-48 h-[159px] top-0 left-[59px]',
      pathD:
        'M26.937 24.6169L10.0781 31.2708L44.3067 47.6495L62.6982 128.52L128.09 141.828L182.243 131.079L110.72 2.60791L102.036 19.4985L81.0897 27.6879L26.937 24.6169Z',
    },
    {
      value: '광주/전남',
      viewBox: '0 0 115 113',
      className: 'w-[114px] h-28 top-[310px] left-1.5',
      pathD:
        'M19.3728 111.894L0.719338 72.0972L13.4092 7.68202L34.0556 1.14064L100.093 12.3076L113.685 43.4945L19.3728 111.894Z',
    },
    {
      value: '제주',
      viewBox: '0 0 61 31',
      className: 'w-[60px] h-[29px] top-[366px] left-[200px]',
      pathD:
        'M16.3915 2.56513L1 14.5645V23.9553L9.72184 29.6941L38.4526 28.129L55.8963 21.8685L60.5137 12.4776L51.2788 1L16.3915 2.56513Z',
    },
  ];

  return (
    <div className="relative w-[376px] h-[376px] bg-assistive-base rounded-10">
      <div className="relative w-[260px] h-[420px] -top-7 left-[57px]">
        <div className="relative h-[422px] -top-0.5">
          <div className="absolute w-[260px] h-[422px] top-0 left-0">
            {areas.map((area) => (
              <svg
                key={area.value}
                xmlns="http://www.w3.org/2000/svg"
                viewBox={area.viewBox}
                className={`${area.className} ${isSelected(area.value) ? selectedClassName : unSelectedClassName}
                transition  hover:-translate-y-2
                hover:drop-shadow-shadow`}
                onClick={() => toggleArea(area.value)}>
                <path
                  d={area.pathD}
                  fill="currentColor"
                  strokeWidth="1"
                  strokeLinejoin="round"
                  className="pointer-events-auto cursor-pointer"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaMap;
