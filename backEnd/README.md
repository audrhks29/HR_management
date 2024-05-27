# [Electron] 20240326 인사관리 데스크탑앱 (backEnd)

## 📚목차

1. [프로젝트 정보](#프로젝트-정보)
2. [API Endpoints](#api-endpoints)
3. [주요 기능](#주요-기능)
4. [Trouble Shooting](#trouble-shooting)
5. [블로그 정리](#블로그-정리)

## 🌐프로젝트 정보

|              | `설명`                                                                                                                                                                                                          |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `작업기간`   | 2024.03.26 ~ 2024.05.27                                                                                                                                                                                         |
| `작업인원`   | 1                                                                                                                                                                                                               |
| `라이브러리` | <img src="https://img.shields.io/badge/Mongoose-F04D35?style=flat-square&logo=mongoose&logoColor=white">                                                                                                        |
| `프레임워크` | <img src="https://img.shields.io/badge/Electron-47848F?style=flat-square&logo=Electron&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"> |
| `언어`       | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white">                                                                                                    |
| `DB`         | <img src="https://img.shields.io/badge/Mongodb-47A248?style=flat-square&logo=mongodb&logoColor=white">                                                                                                          |
| `런타임`     | <img src="https://img.shields.io/badge/Nodejs-339933?style=flat-square&logo=nodedotjs&logoColor=white">                                                                                                         |
| `AWS`        | <img src="https://img.shields.io/badge/Amazon_EC2-FF9900?style=flat-square&logo=nodedotjs&logoColor=white">                                                                                                     |

## 📖API Endpoints

| Method   | URL                              | Description                                       |
| -------- | -------------------------------- | ------------------------------------------------- |
| `GET`    | `/member`                        | 구성원 기본 정보 가져오기                         |
| `GET`    | `/member/:id`                    | 선택한 구성원 기본 정보 가져오기                  |
| `GET`    | `/memberSalary`                  | 구성원 전체 급여 정보 가져오기                    |
| `GET`    | `/memberSalary/:id`              | 선택한 구성원 급여 정보 가져오기                  |
| `GET`    | `/organization`                  | 조직도 정보 가져오기                              |
| `GET`    | `/salary`                        | 구성원 전체 급여 지급 내역 가져오기               |
| `GET`    | `/salary/:id`                    | 선택한 구성원 급여 지급 내역 가져오기             |
| `GET`    | `/salary/:id/:year/:month`       | 선택한 구성원의 해당 년월 급여 지급 내역 가져오기 |
| `GET`    | `/setting`                       | 설정 가져오기                                     |
| `GET`    | `/setting/rank`                  | 직급 설정 가져오기                                |
| `GET`    | `/setting/business`              | 회사 정보 가져오기                                |
| `GET`    | `/setting/position`              | 직책 설정 가져오기                                |
| `GET`    | `/currentUser`                   | 로그인한 사용자 정보 가져오기                     |
| `GET`    | `/accessToken`                   | access token 발급                                 |
| `GET`    | `/refreshToken`                  | refresh token 발급                                |
| `GET`    | `/logout`                        | 로그아웃 요청                                     |
| `GET`    | `/work`                          | 구성원 전체 근태, 출근 기록 가져오기              |
| `GET`    | `/work/attitude`                 | 구성원 전체 근태 기록 가져오기                    |
| `GET`    | `/work/attitude/:id`             | 선택한 구성원의 근태 기록 가져오기                |
| `GET`    | `/work/commute`                  | 구성원 전체 출근 내역 가져오기                    |
| `POST`   | `/member`                        | 구성원 수정                                       |
| `POST`   | `/memberSalary/:id`              | 선택한 구성원 급여 정보 수정                      |
| `POST`   | `/salary/:id/:year/:month`       | 선택한 구성원의 해당 년월 급여 지급 내역 수정     |
| `POST`   | `/setting/business`              | 회사 정보 수정                                    |
| `POST`   | `/login`                         | 로그인                                            |
| `POST`   | `/signup`                        | 회원가입                                          |
| `POST`   | `/work/commute/:id`              | 선택한 구성원 근태 기록 수정                      |
| `POST`   | `/work/attitude/:id`             | 선택한 구성원 급여 정보 수정                      |
| `PUT`    | `/member/:id`                    | 구성원 추가                                       |
| `PUT`    | `/organization`                  | 조직도 추가                                       |
| `PUT`    | `/salary/:id/:year/:month"`      | 구성원의 해당 년월 급여 지급 내역 추가            |
| `PUT`    | `/setting/business`              | 회사 정보 추가                                    |
| `PUT`    | `/setting/rank`                  | 직급 추가                                         |
| `PUT`    | `/setting/position`              | 직책 추가                                         |
| `DELETE` | `/member/:id`                    | 선택한 구성원 삭제                                |
| `DELETE` | `/memberSalary/:id`              | 선택한 구성원 급여 정보 삭제                      |
| `DELETE` | `/memberSalary/:id/:year/:month` | 선택한 구성원의 해당 년월 급여 정보 삭제          |
| `DELETE` | `/salary/:id`                    | 선택한 구성원의 급여 지급 내역 삭제               |
| `DELETE` | `/salary/:id/:year/:month`       | 선택한 구성원의 해당 년월 급여 지급 내역 삭제     |
| `DELETE` | `/work/:id`                      | 선택한 구성원 근태, 출근 기록 삭제                |

## 🛠주요 기능

### 1. API Endpoints 제공

### 2. 비밀번호 암호화

- `bcrypt` 라이브러리를 이용하여 회원가입 시 비밀번호 암호화

### 3. JWT를 이용한 토큰 발급

- 토큰 발급 및 dbName 추출
- 로그인 유지
- [Trouble Shooting](#1-jwt-관련)으로 인하여 sessionStorage사용으로 수정

### 4. AWS EC2 서버 업로드

## ❌Trouble Shooting

### 1. jwt cookie 공유 불가

> **문제**
>
> 1. `jwt`를 이용하여 user 정보를 담은 토큰 발급 후 `decode`하여 dbName을 추출하여 연결하는 코드 작성
> 2. aws ec2에 server 가동시, client와 server의 도메인이 다른 이유로 쿠키 공유에 실패로 DB연결이 실패함.

> **해결방안**
>
> 1. 서로 같은 도메인으로 연결
>    > `electron`은 `local`환경에서 구동되기 때문에 `server`와 같은 도메인을 사용할 수 없다.
> 2. `http` 프로토콜을 `https` 프로토콜로 변경한 후 `cookie` 옵션을 변경하여 `cookie` 를 공유한다.
>    > `localhost` 프로토콜을 `https`로 변경하는데 상당히 복잡하며, `server`의 경우 도메인을 구매하여야 한다.

> **해결**
>
> `sessionStorage`에 `user_id`를 저장하여 DB에 연결하는 방식을 사용(`user_id`와 DB이름이 같다.)

## 📑블로그 정리

- [[bcrypt] 회원가입 시 비밀번호 암호화](https://frontendmk.tistory.com/17)
- [[JWT] jwt를 이용한 로그인 쿠키 설정](https://frontendmk.tistory.com/16)
