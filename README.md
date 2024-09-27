# 🏠 파이널 프로젝트 미분양 매물 해결 플랫폼

- [클리어분양 (배포 사이트)](https://final-project-eta-silk.vercel.app/)
- [GitHub 레포지토리](https://github.com/final-subscribers/frontend)

## 프로젝트 소개

<img alt='logo' src="https://github.com/user-attachments/assets/a4c3955a-4fcf-4276-a682-52163b1ec58d">

### 각 종 아파트, 오피스텔, 상가 등 미분양 정보를 빠르게 업로드하여 고객이 볼 수 있고 계약까지 이어지도록 하여 미분양 문제를 해소할 수 있는 플랫폼

## 프로젝트 기간
| 구분 | 기간 |
|-----------------| ----------------------------- |
| **전체 기간**     | 2024. 07. 18. ~ 2024. 09. 20. |
|  **기획 기간**    | 2024. 07. 18. ~ 2024. 08. 09. |
|  **개발 기간**    | 2024. 08. 09. ~ 2024. 09. 20. |
|  **리펙토링 기간** | 2024. 09. 20. ~ 2024. 09. 27. |

## 팀원 구성
| **김민수**|**김여진**|**김희용**|
| --- | --- | --- | 
| <img width="250"  alt="김민수img" src="https://avatars.githubusercontent.com/u/153588816?v=4"> | <img width="250" alt="김여진img" src="https://avatars.githubusercontent.com/u/79198245?s=400&v=4"> | <img width="250" alt="김희용img" src="https://avatars.githubusercontent.com/u/154511463?v=4"> |
|  [@SSUDNG](https://github.com/SSUDNG) | [@Yeojin-Kim12](https://github.com/Yeojin-Kim12)|[@scripto1](https://github.com/scripto1) |
|  팀장 | 팀원 | 팀원 |
|  회원가입(고객, 어드민), 대시보드<br/>개별상품조회 | GNB, 메인화면, 검색<br/> 상세페이지, 세부조건, 상담신청 현황<br/> 관심 매물, 매물등록, UI 컴포넌트 제작 | 개발 환경 설정, , 로그인<br/> 고객관리, 매물관리, UI 컴포넌트 제작 |

## 기술 스택

### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)             

### Config
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)        

### Development
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![typescript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![tailwind](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![zod](https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![reactquery](https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![reacthookform](https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![shadcnui](https://img.shields.io/badge/shadcnui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![swiper](https://img.shields.io/badge/swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white)
![axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![eslint](https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)


### Communication
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)
![discord](https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)


## 팀원 역할 설명
### 😀 공통
- UI 컴포넌트 제작
![image](https://github.com/user-attachments/assets/540b308d-3d6e-465d-b5eb-151f16f77e2a)
![image](https://github.com/user-attachments/assets/26e886f7-d2b7-4fb3-8a1d-c22c5cc00830)
---

### 😀 김민수
> ### 스타일 설정, 회원가입(고객, 어드민), 메인화면, 대시보드, 매물 상세페이지, 매물등록, 초기 랜더링 개선 작업, UI 컴포넌트 제작

### ✨ 구현 내용

#### 1. 스타일설정
```
// tailwind.config.ts

extend: {
      colors: {
        static: {
          white: 'var(--neutral-0)',
          default: 'var(--neutral-90)',
        },
        assistive: {
          base: 'var(--neutral-5)',
          alternative: 'var(--neutral-10)',
          divider: 'var(--neutral-20)',
          default: 'var(--neutral-30)',
          strong: 'var(--neutral-50)',
          detail: 'var(--neutral-70)',
        },
        primary: {
          base: 'var(--blue-5)',
          alternative: 'var(--blue-20)',
          normal: 'var(--blue-30)',
          strong: 'var(--blue-40)',
          default: 'var(--blue-50)',
        },
        secondary: {
          base: 'var(--green-5)',
          strong: 'var(--green-50)',
          default: 'var(--green-60)',
        },
        ...}
      ...}
```
- UXUI 디자인팀에서 정의한 variables를 tailwind.config에 초기 스타일 설정을 함으로써 스타일 코드 사용 편의성을 증진함.

#### 2. 회원가입(고객,어드민)
| **고객** | **어드민** |
| :---: | :---: |
|![image](https://github.com/user-attachments/assets/3ef6fbd4-b148-4823-a4b2-5a7bc71dc9b9)|![image](https://github.com/user-attachments/assets/154887eb-a5b9-48c8-b768-4e21ed259a16)|
|![image](https://github.com/user-attachments/assets/7103c2b8-9af9-4f69-a7cc-68c245857279)|![image](https://github.com/user-attachments/assets/995019e2-ef55-42f1-8d4d-2b02f405b2e9)|
||![image](https://github.com/user-attachments/assets/ac4e2415-08c5-453d-9276-c224b3ffab5a)|

- 고객과 어드민으로 구분된 회원가입 구현
- `react-hook-form`과 `zod`를 이용한 유효성 검사
- 이메일 인증 or 휴대폰번호 인증의 경우 인증 번호가 전송된 후 인증번호 입력창이 나오도록 구현하여 사용자에게 인증과정을 보다 쉽게 이해하고 빠르게 진행할 수 있도록 도움으로써 사용자에게 직관적인 흐름을 제공하여 혼란을 줄여주도록 기여

#### 3. 메인화면(캐러셀 배너)
| **desktop & tablet** | **mobile** |
| :---: | :---: |
|![image](https://github.com/user-attachments/assets/4eb60c15-3b55-4954-ad4e-6995249451fa)|![image](https://github.com/user-attachments/assets/44ce115f-3aff-41b4-97b5-0713b9f0d508)|

- 스와이프로 넘길 수 있고 일정 시간 자동으로 넘어가는 두가지 버전의 반응형 캐러셀 구현 `swiper`

#### 4. 대시보드
![image](https://github.com/user-attachments/assets/211a956a-a7d0-4b8f-8d54-71acfca49407)

- 첫번째 대시보드 - radius가 적용가능한 donuts 그래프 라이브러리가 없어서 vanilla로 구현
- 두번째 대시보드 - `apexchart`를 사용해서 프로젝트별 현황 그래프 구현, 페이지네이션으로 데이터 fetch, grab 후 전 후 스와이프로 fetch 구현
- 세번째 대시보드 - 모집 구분에 따른 매물에 대한 상담 현황에 대해서 일간, 주간, 월간으로 확인 가능하도록 구현

#### 5. 매물등록(키워드 선택)
![image](https://github.com/user-attachments/assets/71f96b87-08d0-4ee3-9d8d-5fa639be291b)

- 키워드 토글 버튼으로 키워드를 선택하면 하단에 inputField가 추가되도록 구현
- 키워드 별 다양한 inputField 제작

#### 6. 초기 랜더링 개선 작업
![image](https://github.com/user-attachments/assets/60b4424a-eaff-4323-a978-1ccc1bf66195)

- `React.lazy`를 적용하여 비동기적으로 컴포넌트를 로드할 수 있도록 구현
- 이는 초기 페이지 로드 시 사용자가 해당 컴포넌트를 필요로 할 때 로드하기 때문에 초기 렌더링 속도가 빨라지고 리소스를 절약하여 더 나은 성능을 발휘하고 사용자 경험을 크게 개선함

#### 7. 사용자 경험 최적화 작업
1. skeleton 적용
![image](https://github.com/user-attachments/assets/02bbe7dd-8f3d-4b42-a1eb-d3eeebf1dd05)
  - UXUI 기초 설계에는 없었지만 사용자 경험을 위하여 개인적인 판단으로 도입함
  - 페이지 로딩 중 skeleton을 적용함으로써 사용자에게 즉각적으로 로딩중임을 인지시켜 사용자 경험을 매끄럽고 직관적으로 만듦
  - 레이아웃이 일관적으로 유지하고 로딩 중에도 콘텐츠의 레이아웃을 미리 보여줌으로써, 사용자가 최종적으로 어떤 정보를 받을지 예측가능하게 해줌
  - 이를 통하여 사용자 경험을 개선함
2. reactquery - keepPreviousData 적용
  - reactquery에서 `placeholderData: keepPreviousData`를 적용함.
  - `keepPreviousData`는 새로운 쿼리를 요청할 때 이전 데이터를 유지하도록 설정하는 옵션
  - 데이터가 로드되는 동안 이전 데이터를 보여줌으로써 레이아웃을 유지시키고 사용자가 로딩 시간을 느끼지 않거나 적어도 데이터를 기다리고 있다는 인식을 덜 느끼게 하여 사용자에게 더 자연스러운 전환 경험을 제공함

### ✨ 배운 점 및 느낀 점
- 이전 미니 프로젝트에서 BE와의 협업은 해봤지만 PM, UXUI, FE, BE 모두가 참여하는 프로젝트를 해보는건 처음이었습니다. 2달간 프로젝트를 진행하면서 여러 조율들을 해나가는 과정에서 서로의 역할을 이해하고 의견을 조율하는 방법을 배웠고, 소통의 중요성에 대해서도 배울 수 있는 좋은 기회였던 것 같습니다. 또한 FE에 대한 지식뿐만아니라 타 직무에 대한 지식도 어느 정도는 필요하다는 것을 배울 수 있었습니다.
- 데이터 예외에 대한 디자인이 안되어있어서 인지하지 못하다가 나중에 알고 코드를 수정해야 됐던 상황이 있었습니다. 예외처리는 코드 로직에서 가장 중요한 부분을 차지하고 그 상황들을 예측하는 힘을 기르는 것이 중요하다는 것을 느꼈습니다.
- form을 만들면서 유효성검사와 form을 다루는건 참 어렵고 그만큼 중요하다고 느꼈습니다. 웹의 첫 관문인만큼 능수능란하게 다룰 수 있도록 노력해야겠습니다.
- 2달 동안 같이 프로젝트를 함께 한 팀원분들 너무 고생하셨고, 덕분에 잘 마무리 할 수 있었던 것 같습니다. 다들 감사했습니다.


---
### 😀 김여진
> ### GNB, 메인화면, 검색, 상세페이지, 세부조건, 상담신청 현황, 관심 매물, 매물등록, Footer, UI 컴포넌트 제작

### ✨ 구현 내용

#### 1. GNB

![image](https://github.com/user-attachments/assets/77a5afa3-4f45-4221-b6ac-e9492d997289)
![image](https://github.com/user-attachments/assets/1bc9350c-6a9d-47aa-aabc-a319709adfd5)
![image](https://github.com/user-attachments/assets/87f8f45b-6552-4043-b5e9-46b6f87aa175)

- 로그인 시 role에 따른 GNB 내용 변경
- ProtectedRouter를 이용해 role에 알맞는 이동
- 로그아웃

#### 2. 메인화면

![image](https://github.com/user-attachments/assets/422dd08f-091a-4c7d-a38f-06d597add356)
- TOP20의 매물
- 멤버 로그인 시 좋아요 토글 가능

#### 3. 검색

![image](https://github.com/user-attachments/assets/66ea1faf-84ef-41fb-a439-94365a14f3f9)

- 지역, 매물명에 따른 검색 화면
- 멤버 로그인 시 좋아요 토글 가능

#### 4. 상세페이지

![image](https://github.com/user-attachments/assets/908336db-a617-40a8-a4cd-65a5da11f8b3)

- 매물에 대한 상세페이지
- 멤버 로그인 시 좋아요 토글 가능
- 상담신청 시 매물에 대한 상담을 신청할 수 있음

#### 5. 세부조건

![image](https://github.com/user-attachments/assets/31e7a4b3-5048-42be-aa6b-371aecd39358)

- 미분양정보에서 매물에 대한 세부조건을 필터로 검색가능
- 분양가, 면적, 세대수
- 최소값만 입력하여 사용도 가능

#### 6. 상담신청 현황

![image](https://github.com/user-attachments/assets/b438d23c-9da9-4351-91d9-8d7b6f0939af)

- 상담 대기 or 상담 완료의 신청 현황 조회
- 아파트명 or 지역명을 이용해 검색할 수 있음

#### 7. 관심 매물

![image](https://github.com/user-attachments/assets/df5ebef8-2fb8-491f-ab54-d5456427db79)

- 모집중 or 모집 완료의 관심 매물 조회
- 좋아요 토글 기능

#### 8. 매물등록

![image](https://github.com/user-attachments/assets/46834b15-274d-405e-b802-8e124e4a09e0)

- 매물을 등록할 수 있는 페이지
- useFunnel hook을 만들어 여러 컴포넌트를 하나의 페이지에서 보여줌
- Presigned URL을 이용하여 url을 받고 다시 put 보내서 파일을 업로드

### ✨ 배운 점

- 하나의 페이지에서 여러 컴포넌트를 조작하여 보내는 useFunnel에 대해 배울 수 있었고 저번 프로젝트 때는 zod와 react hook form을 이용하지 못했었는데 이번 프로젝트를 통해 사용하면서 공부해볼 수 있어 좋았습니다.
- 로그인 담당은 아니였으나 초기 조사때 OAuth를 공부하고 쿠키에 트러블 슈팅이 꽤 있었던 만큼 옆에서 많이 공부할 수 있었습니다.
- TanStack Query를 이전 프로젝트에서도 사용했어서 이번 프로젝트에선 잘 사용할 수 있을 거라 생각했으나 꽤 많은 것이 제 생각과는 다르게 작동이 되는 등의 문제가 발생했습니다. 다음에 TanStack Query를 중심으로 다시 공부해봐야 할 것 같습니다.
- 작업량이 꽤 많았던 만큼 새로 시도해보는 작업도 많았었고 다른 팀원들의 코드를 보면서 저와는 다른 방식을 사용할 때마다 배울 수 있는 점이 많았습니다.

### ✨ 느낀 점

- 많은 인원과 여러 팀들이 함께 진행하는 협업을 해볼 수 있어서 정말 뜻깊었습니다.
- 사람이 많은 만큼 팀플에서 의사소통이 얼마나 중요한지 다시 깨닫게 되었습니다.
- 이전 프로젝트와 다른 점은 UX/UI팀이 있어서 저희가 컴포넌트부터 작업하는 방식을 시도해봤고 이 작업 방식이 꽤 편했습니다.
- 이번 프로젝트는 작업량이 많아서 힘들었지만 그만큼 보람도 있었고 저희 팀원들이 옆에서 도와주시면서 잘 이끌어주신 것 같아서 재미있었습니당 :)

---
### 😀 김희용

> ### 개발 환경 설정, ui 컴포넌트, 로그인, 고객관리, 매물관리

### 구현 내용

#### 1. 개발 환경 설정 

- vite로 react 개발 환경을 설정하고 프로젝트에 필요한 라이브러리 패키지를 개발용과 배포용으로 구분해서 설치했습니다. esbuild로 사전 번들링이 가능해 build 시간을 단축할 수 있기 때문에 vite를 사용했습니다.

#### 2. ui 컴포넌트 만들기

- 반복하는 컴포넌트를 재사용하고 팀원 간 중복 작업을 피하고자 프로젝트 초기에 shadcn/ui를 활용해서 ui 컴포넌트를 만들었습니다. UI 팀에서 컴포넌트 단위로 디자인한 피그마 내용을 기반으로 dropdown, sidebar, tab, table, progress indicator, modal, popup window 컴포넌트를 만들었습니다.

#### 3. 로그인

![로그인](https://github.com/user-attachments/assets/bc4365e5-1dc2-4deb-b29c-bfcea37f4586)

- React Hook Form과 zod를 활용해서 로그인 기능을 구현했습니다. 라이브러리를 활용하면서 작업 시간을 단축할 수 있었고, 이전 프로젝트에서 소홀히 했던 유효성 검사 적용 방법을 공부할 수 있었습니다.
- access token을 쿠키에 넣어서 사용자를 인증했는데, 백엔드에서 해당 token을 인식하지 못하는 문제가 발생했습니다. 추후 백엔드에서 쿠키 도메인을 다시 설정하면서 문제를 해결했고, 이 과정에서 HttpOnly, SameSite, Secure 등 쿠키 설정과 사용자 인증에 관해서 알게 되었습니다.

![cookie서버인식문제](https://github.com/user-attachments/assets/2335df7b-2c80-4865-98e0-6840b49ec7f5)

- 프론트엔드와 백엔드의 도메인이 상이해서 서드파티 쿠키를 사용했는데, 서드파티를 설정하지 않은 휴대폰이나 태블릿에서 로그인되지 않는 문제가 발생했습니다. 리팩토링하면서 쿠키 전달 방식에서 세션스토리지 방식으로 전환해서 문제를 해결했습니다.

#### 4. 고객관리 페이지

![고객관리1](https://github.com/user-attachments/assets/6a7c38fd-e242-46f5-9721-02d9831015f3)

- 고객이 등록하거나 상담원이 등록한 상담 내역을 관리하는 페이지를 구현했습니다. 사이드바는 모집 중과 모집 완료로 구분하고, 해당 매물 이름을 선택하면 매물의 상담 내역을 확인할 수 있습니다. 

![고객관리고객등록](https://github.com/user-attachments/assets/45d07b51-97c4-4f2f-a4ac-67f07208c66e)

- 고객추가 버튼으로 상담사가 신규 고객을 등록할 수 있고, 고객이 추가 상담을 원할 경우 희망 상담 날짜를 지정할 수 있습니다. 상담이 완료된 고객은 고객 등급을 지정할 수 있고, 상담 완료 탭, 리스트에 표시됩니다.

![고객관리필터링](https://github.com/user-attachments/assets/3ae95e72-05ab-48b8-b58f-060d132c6b95)

- 상담 대기 테이블을 만들고 각 항목을 이름, 전화번호, 상담 날짜 및 상담사 ID로 검색할 수 있는 필터링을 구현했습니다.

![고객관리상담하기](https://github.com/user-attachments/assets/8f85664b-7d5c-4fe3-801f-f05b3dd484ee)

- 문의 내역을 클릭하면 해당 고객의 문의 사항을 확인할 수 있고, 상담사가 추가로 상담을 진행할 수 있습니다. 
- 상담을 완료하면 상담 완료 탭 리스트에 고객이 추가됩니다.
- UI 팀의 요청으로 고정된 모달이 아닌 이동 가능한 팝업 윈도우로 상담하기 창을 만들었는데, 마지막에 배포되면서 스타일이 적용되지 않는 문제가 발생했습니다. 개발 환경에서는 문제없이 적용된 스타일이 배포 환경에서 적용되지 않아 당황스러웠습니다. 팝업 윈도우를 구현하기 위해 컴포넌트 내부에 또 다른 html 구조를 만들었는데, Tailwind가 빌드되면서 이 부분이 적용되지 않은 것으로 추측합니다. 

![고객관리상담완료필터링](https://github.com/user-attachments/assets/bb262933-b5df-4558-98c0-483a0685a759)

- 상담이 완료된 고객의 리스트를 확인할 수 있고, 이름, 전화번호, 상담 날짜, 고객 등급, 상담사 ID로 검색할 수 있는 필터링을 구현했습니다.
- 문의 내역을 클릭하면 상담 내역을 확인 할 수 있습니다. 


#### 5. 매물관리 페이지

![매물관리1](https://github.com/user-attachments/assets/97c50858-c718-48fb-945d-ef33e5577d0e)

- 매물 관리 테이블에서 모집 중인 매물과 모집 완료인 매물을 확인할 수 있습니다. 수정하기 버튼을 클릭하면 해당 매물을 수정할 수 있는 기능이 있지만, 구현하지 못해서 아쉽습니다. 쓰레기통 버튼을 클릭해서 해당 매물 내용을 삭제할 수 있습니다. 
- 매물 등록 버튼으로 새로운 매물을 등록할 수 있는 페이지로 연결됩니다.

### ✨ 문제 해결 및 느낀 점

#### 1. Tailwind

- 이전 프로젝트에서는 styled component와 scss를 사용했는데, Tailwind를 사용해 보니 훨씬 사용하기 편리했습니다. styled component는 한 파일의 내용이 길어지는 단점이 있고, scss는 여러 파일을 찾아봐야 하는 불편함이 있었습니다. Tailwind는 미리 config 설정을 잘 맞추면 원하는 스타일을 직관적으로 적용할 수 있고, 수정도 편리했습니다.   

#### 2. shadcn/ui

- Tailwind와 마찬가지로 이번 프로젝트에 처음 적용해 보았습니다. 프로젝트에 필요한 컴포넌트만 설치해서 수정 후 사용할 수 있다는 점이 편리했습니다. 처음에는 내부 구조를 파악하는 데 힘들었지만, 조금씩 익숙해졌습니다. 모든 상황을 만족할 수 있는 ui 컴포넌트를 만들기는 쉽지 않지만, ui 라이브러리를 변경해서 프로젝트 성격에 맞추는 과정을 통해서 코드 구조를 파악하고 적용해 볼 수 있어서 많은 공부가 되었습니다. 

#### 3. 프로젝트를 하면서 느낀 점 

- 개인적으로 미니 프로젝트와 파이널 프로젝트의 난이도 차이가 컸습니다. 미니 프로젝트는 구현 사항에 비해 시간이 많았고, 데이터 구조도 비교적 단순해서 기간 내에 구현할 수 있었지만, 파이널 프로젝트는 구현 사항이 복잡해서 어려움을 겪었습니다. 특히 기능 구현 초기에 API 명세서를 더 꼼꼼히 확인하고 실제 데이터 구조와 동일한 mock 데이터를 적용하지 못해서 아쉬웠습니다. 화면에 구현되는 내용과 실제 데이터를 받았을 때 적용되는 구조의 차이를  사전에 파악하지 못해서 작업 기간이 지연된 것 같습니다. 제가 미처 구현하지 못한 부분을 팀원들이 리팩토링하면서 도움을 많이 받았습니다. 다시 한번 팀원분들께 감사드립니다.
- PM, UX/UI, FE, BE 대규모 인원이 협업하는 과정을 통해 실무에서 어떻게 프로젝트가 진행되는지 간접 경험할 수 있는 좋은 기회였습니다. 서로 미처 생각하지 못한 부분을, 회의를 통해 보완하고 의견을 나누면서 완성되는 결과물을 보면서 뿌듯했고, 아직 실력이 부족하지만, 훌륭한 프로젝트에 조금이나마 일조했다는 자부심도 느꼈습니다. 프론트엔드 개발이 전체 과정에서 어떤 역할과 위치인지 알 수 있었고, 내가 어떤 부분이 부족한지 깨닫게 되는 값진 시간이었습니다.