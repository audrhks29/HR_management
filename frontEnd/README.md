# [Electron] 20240326 인사관리 데스크탑앱 (FrontEnd)

## 📚 목차

1. [프로젝트 정보](#프로젝트-정보)
2. [UI](#ui)
3. [주요 기능](#주요-기능)
4. [Trouble Shooting](#trouble-shooting)
5. [블로그 정리](#블로그-정리)

## 🌐프로젝트 정보

#### 프로젝트 실행파일 다운로드

[다운로드](https://hrmanagementexe-bucket.s3.ap-northeast-2.amazonaws.com/HR_Management-Windows-1.0.1-Setup.exe)
| | `설명 ` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `작업기간` | 2024.03.26 ~ 2024.05.27 |
| `작업인원` | 1 |
| `라이브러리` | <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcn/ui&logoColor=white"> <img src="https://img.shields.io/badge/Tanstack_Query-FF4154?style=flat-square&logo=ReactQuery&logoColor=black"> <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white"> |
| `프레임워크` | <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=black"> <img src="https://img.shields.io/badge/Electron-47848F?style=flat-square&logo=Electron&logoColor=white"> |
| `언어` | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"> |

## 👀UI

### 1. Splash

![image](https://github.com/audrhks29/HR_management/assets/130128690/ead6a1a7-69b8-4a62-a961-2eea1189daa8)

### 2. Custom Frame

![image](https://github.com/audrhks29/HR_management/assets/130128690/a7d27d70-7dcc-4385-b2cd-0d87a3d7d940)

### 3. 로그인 화면

![image](https://github.com/audrhks29/HR_management/assets/130128690/91a5fa01-10d9-4cc7-a70e-8897b93d09a8)

### 4. 메인 화면

![image](https://github.com/audrhks29/HR_management/assets/130128690/16e58650-3d8f-4b8b-a632-ff6bb76024b3)

## 🛠주요 기능

### 1. Custom Frame

- 기본값으로 설정되어있는 `Electron`의 `Frame`을 제거하고 새로운 Custom Frame 구현

### 2. 라이트모드/다크모드

- https://ui.shadcn.com/docs/dark-mode/vite
- shadcn에서 제공하는 `ThemeProvider`와 `ModeToggle` 를 사용한 테마 제작

### 3. Dashboard chart

- `chart.js`와 `react-chartjs-2`를 사용하여 메인화면 dashboard에 chart기능 제공

### 4. AWS S3 ci/cd 파이프라인 구축 및 Electron 자동 업데이트 구현

- `AWS CLI`를 사용하여 해당 컴퓨터에서만 업로드가 가능하게 설정
- `yarn package-s3` 명령으로 빌드된 애플리케이션을 자동으로 AWS S3 버킷에 업로드하도록 설정
- `electron-updater` 라이브러리를 이용하여 자동 업데이트 구현으로 새로운 버전 출시 시에 사용자는 자동으로 업데이트 버전을 다운로드 받고 설치할 수 있다.

## ❌Trouble Shooting

### 1. Custom Frame

> **문제**
>
> `-webkit-app-region` 적용 이 후, event들이 적용이 되지 않아서 `minimize`와 `close` 가 작동하지 않음.

> **해결**
>
> `-` 버튼과 `x` 버튼영역을 제외한 영역에 드래그 할 수 있도록 컴포넌트 및 스타일을 수정

[해당 이슈 블로그 정리](https://frontendmk.tistory.com/15)

### 2. Electron에서 alert, confirm 사용

> **문제**
>
> Electron에서 `alert`이나 `confirm` 사용 후 input이 읽기전용이 되어버리는 현상 발생

> **해결**
>
> Electron에는 `alert`, `confirm` 대신 `dialog` 라는 대체 API를 사용하도록 권장한다.
> `dialog`는 디자인적으로 커스텀이 불가능 하기 때문에 `shadcn/ui`의 `toast`를 사용
> [공식문서](https://www.electronjs.org/docs/latest/api/dialog)

[해당 이슈 블로그 정리](https://frontendmk.tistory.com/13)

## 📑블로그 정리

[[Electron] Custom Frame 만들기](https://frontendmk.tistory.com/15)
[[Electron] alert, confirm 후 input 클릭이 안되는 문제](https://frontendmk.tistory.com/13)
[[Electron] HashRouter에서 loadfile문제](https://frontendmk.tistory.com/14)
[[AWS] AWS S3 CI/CD 파이프라인 구축](https://frontendmk.tistory.com/19)
