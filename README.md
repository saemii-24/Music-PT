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
- [작성한 Next.js API](#작성한-next.js-api)
- [프로젝트 규칙](#%EF%B8%8F프로젝트-규칙)
- [후기](#후기)

## 📂개요

- 프로젝트: Music PT 💽
- 제작기간: 24.02.19 - 24.04.16
- 기여도: 개인작업 / 100%

## ⚙️사용된 기술

📌**라이브러리/언어**
<br/>
- <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
- SSR, SSG 생성을 통한 SEO 향상과 13버전에서 도입된 app router를 이용한 간단한 라우팅 처리를 위해 Next.js를 사용했습니다.
- 코드 작성 중 의도치 않은 오류를 예방하기 위해 정적타입언어인 Typescript를 도입했습니다.

📌**상태관리**
<br/>
- <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white">
- React Hook과 비슷한 간결한 코드를 통해 상태관리를 할 수 있어, Recoil을 선택하였고, Recoil을 활용해 다국어 처리를 위한 상태 관리를 구현하였습니다.

📌**폼 이벤트 처리**
<br/>
- <img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">
- 폼 데이터를 관리, 유효성 검사와 에러처리를 간편하게 처리하기 위해 사용했습니다.
  
📌**비동기처리**
<br/>
- <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
- 다양한 API를 통해 데이터베이스와 비동기 통신을 효율적으로 처리하고, 무한 스크롤을 구현하기 위해 React Query(Tanstack Query)를 도입했습니다.

📌**스타일링**
<br/>
- <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" >
- Next.js에서 추천하는 스타일링 작성 방식으로,클래스 기반의 스타일링을 통해 속도와 생산성을 향상시키고, 반응형 웹을 구현과 함께 라이트/다크 모드를 적용하기 위해 Tailwind CSS를 선택했습니다.

📌**백엔드(DB)**
<br/>
- <img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"> <img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
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
    <td><img src="https://github.com/saemii-24/Music-PT/assets/139088277/d9a8d33d-bb11-4a39-94f8-422a7af0a5bd" alt="음악 좋아요" width="300px"></td>
    <td><img src="https://github.com/saemii-24/Music-PT/assets/139088277/3abadd65-c283-48c1-89ab-eb3458794517" alt="음악 추가" width="300px"></td>
    <td><img src="https://github.com/saemii-24/Music-PT/assets/139088277/8c28f260-8817-47ec-afc7-4a96fa0948c7" alt="음악 목록(검색)" width="300px"></td>
    <td><img src="https://github.com/saemii-24/Music-PT/assets/139088277/391b6c1d-34ad-4674-bf58-78fe373b3ff2c" alt="음악 수정" width="300px"></td>
  </tr>
</table>

<table style="width:100%">
  <tr>
    <th style="width:300px">반응형 웹</th>
    <th style="width:300px">OAuth</th>
    <th style="width:300px">라이트/다크 모드</th>
    <th style="width:300px">한국어/일본어 선택</th>
  </tr>
  <tr>
    <td><img src="https://github.com/saemii-24/Music-PT/assets/139088277/c0660cfb-c969-4d46-9a32-c37bf039ae0d" alt="반응형 웹" width="300px"></td>
    <td><img src="https://github.com/saemii-24/Music-PT/assets/139088277/187e241f-7559-41ac-b5eb-2888118830f1" alt="OAuth" width="300px"></td>
    <td><img src="https://github.com/saemii-24/Music-PT/assets/139088277/c97c004f-4b2d-4792-97d4-9cca6e8455ac" alt="라이트/다크 모드" width="300px"></td>
    <td><img src="https://github.com/saemii-24/Music-PT/assets/139088277/2509365f-fba6-41d5-8e02-bf6f7998feda" alt="한국어/일본어 선택택" width="300px"></td>
  </tr>
</table>

## 📫작성한 Next.js API

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
    <td>Update</td>
    <td>README.md 업데이트</td>
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
이번 프로젝트의 주요 목표는 Next.js를 이용해 새로 학습한 다양한 라이브러리를 도입한 풀스택 웹을 제작하는 것이었습니다. 

프로젝트 시작 전, Next.js를 학습하며, Next.js를 도입하는 이유와 배경을 이해하고 SEO, SSR, SSG와 같이 Next.js와 연관된 주요 개념과 장점을 학습하였습니다. 12버전을 제작하고 13버전으로 migration 해보며, 어떠한 점이 달라졌는지 확인할 수 있었고, 이번 프로젝트에서는 13 버전에서 제공되는 app router를 활용하여 React로 진행한 프로젝트보다 간편하게 폴더 방식의 라우팅을 구현할 수 있었습니다. 

또한 그동안 새롭게 학습했던 recoil과 tanstack query와 같은 상태관리 및 비동기 상태 처리 라이브러리를 도입하여 개발 효율을 높일 수 있었습니다. 특히, DB와 상호작용이 필요할 경우에는 Next.js를 통해 RESTful API를 작성하고 axios와 tanstack query를 활용하여, 데이터가 로딩 중일 때는 skeleton UI를 보여주는 등 사용자 경험을 향상시킬 수 있었습니다. 그리고 recoil을 통한 상태관리는 redux보다 훨씬 간결하고 직관적이어 전역상태관리 코드 작성에 대한 부담감을 낮출 수 있었습니다.

이번 프로젝트에서는 SNS 로그인 기능을 구현하기 위해 next-auth를 도입하였고, 구글, 카카오, 네이버와 같은 다양한 제공자의 로그인 기능을 구현하는 한편 각 provider의 디자인 가이드를 준수하고, OAuth를 통한 로그인 프로세스를 습득하는 데에 도움이 되었습니다. 

마지막으로, react-hook-form, tailwind등과 같이 편리하게 웹 제작을 할 수 있도록 도와주는 라이브러리를 활용하기위해 공식 문서를 읽고, 연습해보고, 블로그에 정리하는 과정을 거치면서, 학습의 효율성을 높일 수 있었던 프로젝트가 되었습니다.
