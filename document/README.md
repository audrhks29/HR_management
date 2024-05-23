# [React] 20240507 인사관리 데스크탑앱 다운로드 페이지

## 🌐프로젝트 정보

#### 프로젝트 소개 페이지

[프로젝트 주소](http://hr-management-three.vercel.app/)

|            | 설명                                                                                                                                                                                                                                                                                |
| :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 작업기간   | 2024.05.07 ~                                                                                                                                                                                                                                                                        |
| 작업인원   | 1                                                                                                                                                                                                                                                                                   |
| 라이브러리 | <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/Emotion-C43BAD?style=flat-square"> <img src="https://img.shields.io/badge/Material UI-007FFF?style=flat-square&logo=mui&logoColor=white"> |
| 언어       | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white">                                                                                                                                                                        |
| 서버       | <img src="https://img.shields.io/badge/Amazone_S3-569A31?style=flat-square&logo=amazons3&logoColor=white">                                                                                                                                                                          |

## 👀UI

### 1. Header

![header](https://github.com/audrhks29/HR_management/assets/130128690/4d444c70-a1e5-45a6-ba7d-1f07cf010d5c)

### 2. 메인

![main](https://github.com/audrhks29/HR_management/assets/130128690/40bb0989-1fb7-49eb-8c09-e6703b3c7dcd)

### 3. HRM 소개

![introduce](https://github.com/audrhks29/HR_management/assets/130128690/35453228-ffda-4e52-8630-8a802cd111e3)

### 4. 다운로드

![download](https://github.com/audrhks29/HR_management/assets/130128690/0989b9bb-cc13-44aa-b796-fa102b704e80)

## 🛠주요 기능

1. <img src="https://img.shields.io/badge/Amazone_S3-569A31?style=flat-square&logo=amazons3&logoColor=white">에 SETUP 파일 업로드하여 다운로드 기능 구현
2. <img src="https://img.shields.io/badge/Material UI-007FFF?style=flat-square&logo=mui&logoColor=white"> ThemeProvider를 이용하여 light/dark mode Theme 제공

## ❌Trouble Shooting

## 기능 개선

1. 초기 로딩 리소스 크기 개선

   1. 요약
      |name|before|after|desc|
      |--|--|--|--|
      |`resource`|3.8M|596KB|약 84% 감소|
      |`complete`|1.94s|299ms|약 84% 감소|
      |`DOMContentLoaded`|434ms|105ms|약 75%감소|

      1. https://ezgif.com/ 에서 크기가 큰 gif파일 resize및 확장자 avif로 변경
      2. 기존 browserRoute기능을 createRouter로 변경 및 컴포넌트에 대한 lazy loading 적용

   2. 개선 전
      ![gifsize_before](https://github.com/audrhks29/HR_management/assets/130128690/2cd14658-b6cf-40b9-b5eb-76efbcac8d6b)
   3. 개선 후
      ![gifsize_after](https://github.com/audrhks29/HR_management/assets/130128690/780c5aac-c73e-4c71-a29b-915bdefb4163)
