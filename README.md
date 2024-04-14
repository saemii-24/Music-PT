# 💽 Music PT

#### **<a href="https://music-pt.vercel.app/" target="_blank">:point_right:<u>배포페이지 바로가기</u></a>**

Music-PT는 Music Please Translation의 약어로, 음악을 번역하고 공부할 수 있는 웹사이트 입니다.
취미로 일본어 공부를 시작해 제일 높은 단계인 JLPT N1을 취득했지만 추가로 학습해야 할 한자와 단어는 무궁무진 했습니다. 이러한 부분은 시험 공부보다는 하나의 취미생활로서 조금씩 채워나가고 있습니다.
그 중 제가 좋아하는 한 가지 방법은 **'음악'** 을 통해 공부하는 것 입니다. K-POP의 경우 한국어 버전과 일본어 버전을 동시에 발매하는 경우가 잦습니다. 음악에 맞추기 위해 전체적인 내용은 비슷하지만 세세한 의미가 다르다는 것을 느끼고, 새로운 곡이 발매 되면 늘 두 곡의 가사를 비교하며 듣곤 했습니다.
가끔은 직접 번역해보기도 하면서 두 곡이 주는 가사의 미묘한 차이를 찾아내는 것이 재미있기도 했고, 이를 아카이빙 할면 좋겠다는 생각에 Music-PT 개발을 시작하게 되었습니다.

## :link:목차

- [개요](#개요)
- [사용된 기술](#%EF%B8%8F사용된-기술)
- [주요 기능](#주요-기능)
- [프로젝트 규칙](#%EF%B8%8F프로젝트-규칙)
- [후기](#후기)

## 📂개요

- 프로젝트: Music PT 💽
- 제작기간: 24.02.19 - (진행중)
- 기여도: 개인작업 / 100%

## ⚙️사용된 기술

📌**라이브러리/언어**<br/>
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">

- SSR, SSG 생성을 통한 SEO 향상과 13버전에서 도입된 app router를 이용한 간단한 라우팅 처리를 위해 Next.js를 사용했습니다.
- 코드 작성 중 의도치 않은 오류를 예방하기 위해 정적타입언어인 Typescript를 도입했습니다.

📌**상태관리**<br/>
<img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white">
-React Hook과 비슷한 간결한 코드를 통해 상태관리를 할 수 있어, Recoil을 선택하였고, Recoil을 활용해 다국어 처리를 위한 상태 관리를 구현하였습니다.

📌**비동기처리**<br/>
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">

- 다양한 API를 통해 데이터베이스와 비동기 통신을 효율적으로 처리하고, 무한 스크롤을 구현하기 위해 React Query(Tanstack Query)를 도입했습니다.

📌**스타일링**<br/>
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" >

- Next.js에서 추천하는 스타일링 작성 방식으로,클래스 기반의 스타일링을 통해 속도와 생산성을 향상시키고, 반응형 웹을 구현과 함께 라이트/다크 모드를 적용하기 위해 Tailwind CSS를 선택했습니다.

📌**백엔드(DB)**<br/>
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"> <img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">

- 프론트엔드단에서 간단하게 DB를 사용하기 위해 Supabase를 선택하였습니다.
- Prisma ORM기능을 통해 SQL 쿼리가 아닌, JavaScript 작성방식으로, DB와 상호작용하였습니다.

## 💻주요 기능

<table style="width:100%">
  <tr>
    <th style="width:300px">음악 좋아요</th>
    <th style="width:300px">음악 추가</th>
    <th style="width:300px">음악 목록(검색)</th>
    <th style="width:300px">음악 수정</th>
  </tr>
  <tr>
    <td><img src="https://github.com/saemii-24/BeHealth/assets/139088277/d7a980c7-4eee-4898-bf49-6ecb256e75f1" alt="회원가입, 로그인" width="300px"></td>
    <td><img src="https://github.com/saemii-24/BeHealth/assets/139088277/8ac0d973-1a06-4d01-90ca-830039d52af8" alt="근처 병원 찾기" width="300px"></td>
    <td><img src="https://github.com/saemii-24/BeHealth/assets/139088277/ffb61534-9332-44dd-8449-f83403037d61" alt="약 부작용 검색" width="300px"></td>
    <td><img src="https://github.com/saemii-24/BeHealth/assets/139088277/1d2ecbef-09d0-4e80-99ab-9df786a0d4dc" alt="관련 건강 정보" width="300px"></td>
  </tr>
</table>

<table style="width:100%">
  <tr>
        <th style="width:300px">음악 수정</th>
    <th style="width:300px">OAuth</th>
    <th style="width:300px">라이트/다크 모드</th>
    <th style="width:300px">한국어/일본어 선택</th>
  </tr>
  <tr>
    <td><img src="https://github.com/saemii-24/BeHealth/assets/139088277/856ba8ee-6411-4642-af5c-5fae795b6de0" alt="일정 추가" width="300px"></td>
    <td><img src="https://github.com/saemii-24/BeHealth/assets/139088277/6b17ef20-253d-4b7c-9d04-f411d731a984" alt="해당 날짜의 일정 표시" width="300px"></td>
    <td><img src="https://github.com/saemii-24/BeHealth/assets/139088277/0da2d331-7b1a-430d-9f46-818cac1b27b5" alt="프로필 추가" width="300px"></td>
    <td><img src="https://github.com/saemii-24/BeHealth/assets/139088277/eb87b29a-c528-4a56-9a23-d0100d32a871" alt="BMI 계산" width="300px"></td>
  </tr>
</table>

## 🗂️작성한 next.js API

<table>
  <tr>
    <th>End Point</th>
    <th>HTTP Method</th>
    <th>역할</th>
  </tr>
  <tr>
    <td>Addtranslate</td>
    <td>PUT</td>
    <td>각 음악의 번역 내용을 추가합니다. <br/>* 음악 '추가'지만 실질적으로 음악 생성시에는 translate 부분이 null 값으로 등록되고, 해당 값을 ‘수정’하는 형식이므로 PUT method를 사용했습니다.</td>
  </tr>
  <tr>
    <td>Editlyrics</td>
    <td>PUT</td>
    <td>음악에 등록된 가사를 수정합니다. </td>
  </tr>
  <tr>
    <td>Like</td>
    <td>GET</td>
    <td>사용자가 보고 있는 음악에 좋아요를 기존에 표시했는지 확인합니다. 이 데이터로 사용자가 페이지에 접속시 각 음악에 좋아요가 눌렀거나, 눌리지 않았음을 표시합니다.</td>
  </tr>
  <tr>
    <td>Like</td>
    <td>POST</td>
    <td>사용자가 좋아요 버튼을 누를시 트리거 됩니다.</td>
  </tr>
  <tr>
    <td>Likecount</td>
    <td>POST</td>
    <td>해당 음악에 총 좋아요 개수를 불러옵니다.</td>
  </tr>
  <tr>
    <td>Likecount</td>
    <td>GET</td>
    <td>사용자가 좋아요한 모든 음악 목록을 받아옵니다.</td>
  </tr>
  <tr>
    <td>music</td>
    <td>POST</td>
    <td>새로운 음악을 등록합니다.</td>
  </tr>
  <tr>
    <td>Music/[id]</td>
    <td>DELETE</td>
    <td>해당 ID의 음악을 삭제합니다.</td>
  </tr>
  <tr>
    <td>Music/[id]</td>
    <td>PUT</td>
    <td>해당 ID의 데이터를 수정합니다. <br/>*edit lyrics와 다르게 translate를 제외한 모든 부분을 수정합니다.</td>
  </tr>
  <tr>
    <td>searchmusic</td>
    <td>GET</td>
    <td>사용자의 입력값과 일치하는 데이터를 요청합니다. </td>
  </tr>
</table>

## 🗂️프로젝트 규칙

### 📌Commit Convention

#### ✅Header

<table>
  <tr>
    <th>Type</th>
    <th>설명</th>
  </tr>
  <tr>
    <td>Init</td>
    <td>프로젝트 초기 생성</td>
  </tr>
  <tr>
    <td>Feat</td>
    <td>새로운 기능 추가</td>
  </tr>
  <tr>
    <td>Fix</td>
    <td>오류 수정</td>
  </tr>
  <tr>
    <td>Design</td>
    <td>CSS 수정</td>
  </tr>
  <tr>
    <td>Style</td>
    <td>기능이 아닌 코드 포맷팅, 세미콜론 수정 등</td>
  </tr>
    <td>Rename</td>
    <td>파일·폴더 이름 수정, 위치 변경</td>
  </tr>
  <tr>
    <td>Remove</td>
    <td>파일 삭제</td>
  </tr>
  <tr>
    <td>Chore</td>
    <td>그 외의 변경사항</td>
  </tr>
</table>

### 📌Git Flow

<table>
  <tr>
    <th>branch name</th>
    <th>설명</th>
  </tr>
  <tr>
    <td>main</td>
    <td>출시 단계의 최종 브랜치</td>
  </tr>
  <tr>
    <td>dev</td>
    <td>버전 개발 브랜치</td>
  </tr>
  <tr>
    <td>feature</td>
    <td>기능별 브랜치</td>
  </tr>
</table>

## 📝후기

이번 프로젝트는 크게, <u>**Firebase, openAPI활용, git Flow와 github의 협업 기능**</u>을 공부할 수 있는 프로젝트 였습니다.

1. **Firebase**
   사용자의 이메일 주소를 이용해 간단히 회원가입 기능을 구현할 수 있었습니다. Firestore에서 제공하는 DB를 통해, 개별 uid로 구별되는 사용자의 정보를 개인화 하고, 사용자가 업데이트 한 정보를 실시간으로 받아와 렌더링 할 수 있었습니다.
2. **Open API**
   공공데이터 포털의 Open API와 Axios를 통해 데이터를 요청하고 응답받을 수 있었습니다. 응답받은 데이터를 렌더링 하는 과정에서 발생할 수 있는 다양한 예외사항을 고려하고, 각 상황에서 사용자에게 '정보가 없음', 또는 '로딩 중' 등 적절한 내용을 표시할 수 있었습니다.
3. **협업**
   정해진 규칙을 준수하며 협업하자 서로 어떤 작업을 했었는지 쉽게 파악할 수 있었고, 충돌이 발생하는 일이 줄었으며, 원활하게 하나의 프로젝트를 완성할 수 있었습니다.
