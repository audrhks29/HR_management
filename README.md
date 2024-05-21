# [Electron] 20240326 인사관리 데스크탑앱(Fullstack) 및 다운로드 페이지

## 📚 목차

- [프로젝트 정보](##🌐-프로젝트-정보)
- [UI](##🌐-👀-UI)
- [주요 기능](##-🛠-주요-기능)
- [Trouble Shooting](##-❌-trouble-shooting)

## 🌐 프로젝트 정보

|            | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 작업기간   | 2024.03.26 ~                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 작업인원   | 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 라이브러리 | <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcn/ui&logoColor=white"> <img src="https://img.shields.io/badge/Tanstack_Query-FF4154?style=flat-square&logo=ReactQuery&logoColor=black"> <img src="https://img.shields.io/badge/Mongoose-F04D35?style=flat-square&logo=mongoose&logoColor=white"> <img src="https://img.shields.io/badge/Emotion-C43BAD?style=flat-square"> <img src="https://img.shields.io/badge/Material UI-007FFF?style=flat-square&logo=mui&logoColor=white"> |
| 프레임워크 | <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=black"> <img src="https://img.shields.io/badge/Electron-47848F?style=flat-square&logo=Electron&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white">                                                                                                                                                                                                                                                                                           |
| 언어       | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| DB         | <img src="https://img.shields.io/badge/Mongodb-47A248?style=flat-square&logo=mongodb&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 런타임     | <img src="https://img.shields.io/badge/Nodejs-339933?style=flat-square&logo=nodedotjs&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 서버       | <img src="https://img.shields.io/badge/Amazon_EC2-FF9900?style=flat-square&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/Amazone_S3-569A31?style=flat-square&logo=amazons3&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                   |

## 👀 UI

### 1. Splash

![image](https://github.com/audrhks29/HR_management/assets/130128690/ead6a1a7-69b8-4a62-a961-2eea1189daa8)

### 2. Custom Frame

![image](https://github.com/audrhks29/HR_management/assets/130128690/a7d27d70-7dcc-4385-b2cd-0d87a3d7d940)

### 3. 로그인 화면

![image](https://github.com/audrhks29/HR_management/assets/130128690/91a5fa01-10d9-4cc7-a70e-8897b93d09a8)

### 4. 메인 화면

![image](https://github.com/audrhks29/HR_management/assets/130128690/16e58650-3d8f-4b8b-a632-ff6bb76024b3)

## 🛠 주요 기능

### 1. Custom Frame

- 기본값으로 설정되어있는 `Eletron`의 `Frame`을 제거하고 새로운 Custom Frame 구현

### 2. 라이트모드/다크모드

- https://ui.shadcn.com/docs/dark-mode/vite
- shadcn에서 제공하는 `ThemeProvider`와 `ModeToggle` 를 사용한 테마 제작

## ❌ Trouble Shooting

### 1. Custom Frame

> 문제
>
> `-webkit-app-region` 적용 이 후, event들이 적용이 되지 않아서 `minimize`와 `close` 가 작동하지 않음.

> 해결
>
> `-` 버튼과 `x` 버튼영역을 제외한 영역에 드래그 할 수 있도록 컴포넌트 및 스타일을 수정
