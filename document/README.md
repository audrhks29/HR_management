# [React] 20240507 인사관리 데스크탑앱 다운로드 페이지

## 📚 목차

1. [프로젝트 정보](#프로젝트-정보)
2. [UI](#ui)
3. [주요 기능](#주요-기능)
4. [Trouble Shooting](#trouble-shooting)
5. [기능 개선](#기능-개선)
6. [블로그 정리](#블로그-정리)

## 🌐프로젝트 정보

#### 다운로드 페이지

[프로젝트 주소](http://hr-management-three.vercel.app/)

|              | 설명                                                                                                                                                                                                                                                                                |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `작업기간`   | 2024.05.07 ~                                                                                                                                                                                                                                                                        |
| `작업인원`   | 1                                                                                                                                                                                                                                                                                   |
| `라이브러리` | <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/Emotion-C43BAD?style=flat-square"> <img src="https://img.shields.io/badge/Material UI-007FFF?style=flat-square&logo=mui&logoColor=white"> |
| `언어`       | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white">                                                                                                                                                                        |
| `서버`       | <img src="https://img.shields.io/badge/Amazone_S3-569A31?style=flat-square&logo=amazons3&logoColor=white">                                                                                                                                                                          |
| `배포`       | <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Netlify&logoColor=white">                                                                                                                                                                               |

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

### 1. vercel배포 후 404: NOT_FOUND 에러 발생

![image](https://github.com/audrhks29/audrhks29/assets/130128690/326672e1-e1a2-4859-963d-128fbef4412b)

> **문제**
>
> pathName이 `/`인 곳에서 새로고침시에는 문제가 없지만 pathName이 있는곳에서 새로고침시 해당 오류 반환

> **원인**
>
> `vercel`은 요청된 경로에 맞는 파일을 찾으려고 한다. 예를 들어 `/about` 페이지로 접근 시 `about.html`을 찾으려고 하지만 파일이 없어서 에러를 반환한다.

> **해결**
>
> 모든 경로에 대해 정규 표현식 `/.*`을 사용하여 매칭되는 모든 요청을 `index.html`로 리디렉션한다.
> 따라서 SPA에서 어떤 경로로 접근하더라도 항상 `index.html`이 반환되며 클라이언트 측 라우터가 요청을 처리하도록 한다.

## 기능 개선

### 1. 초기 로딩 리소스 크기 개선

1.  요약
    |name|before|after|desc|
    |--|--|--|--|
    |`resource`|3.8M|596KB|약 84% 감소|
    |`complete`|1.94s|299ms|약 84% 감소|
    |`DOMContentLoaded`|434ms|105ms|약 75%감소|

    1. https://ezgif.com/ 에서 크기가 큰 `.gif`파일 resize및 확장자 `.avif`로 변경
    2. https://cloudconvert.com/png-to-webp 에서 `.png`확장자를 `.webp`로 변경
    3. 기존 `browserRoute`기능을 `createBrowserRouter`로 변경 및 컴포넌트에 대한 `lazy loading` 적용

2.  개선 전
    ![gifsize_before](https://github.com/audrhks29/HR_management/assets/130128690/2cd14658-b6cf-40b9-b5eb-76efbcac8d6b)
3.  개선 후
    ![gifsize_after](https://github.com/audrhks29/HR_management/assets/130128690/780c5aac-c73e-4c71-a29b-915bdefb4163)

### 2. LightHouse 점수 개선

1. 접근성

   1. image에 `alt`속성 지정
   2. image에 `width`, `height` 지정

2. SEO 최적화

   1. `react-helmet-async` 라이브러리를 사용하여 각 페이지에 대한 메타태그 설정
   2. 크롤링을 위한 `robots.txt` 생성

3. 개선 전
   1. 메인
      ![lighthouse_main](https://github.com/audrhks29/HR_management/assets/130128690/e889b915-6d89-4ecf-8c21-4e260a173d3f)
   2. HRM 소개
      ![lighthouse_introduce](https://github.com/audrhks29/HR_management/assets/130128690/ff854b69-7ca9-403e-8173-1f8b476822a9)
   3. 다운로드
      ![lighthouse_download](https://github.com/audrhks29/HR_management/assets/130128690/27263354-75cc-4136-a870-80a48e884ee1)
4. 개선 후
   1. 메인
      ![lighthouse_main_after](https://github.com/audrhks29/HR_management/assets/130128690/c86ac4d3-6927-4005-a692-918fa1715de1)
   2. HRM 소개
      ![lighthouse_introduce_after](https://github.com/audrhks29/HR_management/assets/130128690/351c100e-651b-4fb5-9ab3-3e913853ec59)
   3. 다운로드
      ![lighthouse_download_after](https://github.com/audrhks29/HR_management/assets/130128690/4675470c-6c2f-4b76-9c42-c7bcb8e250aa)

## 📑블로그 정리

[[React-Helmet] React에서 SEO 최적화](https://frontendmk.tistory.com/18)
