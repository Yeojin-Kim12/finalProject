import { z } from 'zod';

export const propertyAddSchema = z.object({
  propertyName: z.string().min(1, '매물명을 입력해주세요').max(20, '최대 20자까지 입력 가능합니다'),
  propertyConstructor: z.string().min(1, '시공사를 입력해주세요').max(20, '최대 20자까지 입력 가능합니다'),
  propertyCompanyName: z.string().min(1, '시행사를 입력해주세요').max(20, '최대 20자까지 입력 가능합니다'),
  propertyTotalNumber: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(1, '세대수를 입력해주세요').max(10000, '세대수는 10000이하이어야 합니다'),
  ),
  propertyRecruitmentDate: z.string().min(1, '모집기간을 입력해주세요'),
  propertyAreaAddr: z.string().min(1, '대지위치를 입력해주세요'),
  propertyModelhouseAddr: z.string().min(1, '모델하우스 주소를 입력해주세요'),
  areas: z
    .array(
      z
        .object({
          squareMeter: z.preprocess((val) => parseFloat(val as string), z.number().min(0).optional()),
          price: z.preprocess(
            (val) => (val === '' ? 0 : parseFloat(val as string)),
            z.number().min(1, '가격은 0 이상이어야 합니다'),
          ),
          discountPercent: z.preprocess(
            (val) => (val === '' ? 0 : parseFloat(val as string)),
            z.number().min(0).max(100, '100% 이하이어야 합니다'),
          ),
          discountPrice: z.preprocess(
            (val) => (val === '' ? undefined : parseFloat(val as string)),
            z.number().min(0).optional(),
          ),
        })
        .refine(
          (area) => {
            // discountPrice가 빈 값이면 price 값 설정
            if (area.discountPrice === undefined || isNaN(area.discountPrice)) {
              area.discountPrice = area.price;
              return true;
            }
            // 가격 유효성 검사
            return area.discountPrice <= area.price;
          },
          {
            message: '할인가는 평형별 가격보다 높을 수 없습니다',
            path: ['discountPrice'],
          },
        ),
    )
    .min(1, '세대면적을 입력해주세요'),
  addrDo: z.string().optional(),
  addrGu: z.string().optional(),
  addrDong: z.string().optional(),
  buildingName: z.string().optional(),
  propertyType: z.string().optional(),
  salesType: z.string().optional(),
  phoneNumber: z
    .string()
    .min(1, '분양 문의 번호를 입력해주세요')
    .regex(
      /^(\d{3}-\d{4}-\d{4}|\d{4}-\d{4})$/,
      '분양 문의 번호는 010-0000-0000 또는 0000-0000 형식이어야 합니다',
    ),
  homepage: z.string().optional(),
  contactChannel: z.string().optional(),
  keywords: z.array(
    z.object({
      searchEnabled: z.boolean(),
      name: z.string(),
      type: z.string(),
      input: z.union([
        z.string().nonempty('입력해주세요'),
        z.array(z.object({})).nonempty('입력추가해주세요.'),
      ]),
    }),
  ),
});
