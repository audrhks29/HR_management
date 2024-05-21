# [Electron] 20240326 인사관리 데스크탑앱 (backEnd)

## 🌐 프로젝트 정보

|            | 설명                                                                                                                                                                                                            |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 작업기간   | 2024.03.26 ~                                                                                                                                                                                                    |
| 작업인원   | 1                                                                                                                                                                                                               |
| 라이브러리 | <img src="https://img.shields.io/badge/Mongoose-F04D35?style=flat-square&logo=mongoose&logoColor=white">                                                                                                        |
| 프레임워크 | <img src="https://img.shields.io/badge/Electron-47848F?style=flat-square&logo=Electron&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"> |
| 언어       | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white">                                                                                                    |
| DB         | <img src="https://img.shields.io/badge/Mongodb-47A248?style=flat-square&logo=mongodb&logoColor=white">                                                                                                          |
| 런타임     | <img src="https://img.shields.io/badge/Nodejs-339933?style=flat-square&logo=nodedotjs&logoColor=white">                                                                                                         |
| 서버       | <img src="https://img.shields.io/badge/Amazon_EC2-FF9900?style=flat-square&logo=nodedotjs&logoColor=white">                                                                                                     |

## 📖 API Endpoints

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

## 🛠 주요 기능

### 1. 비밀번호 암호화

- 회원가입 시 비밀번호 암호화

  `bcrypt` 라이브러리 사용하여 진행

  ```
  $ yarn add bcrypt
  ```

  ```js
  app.post("/signup", async (req: any, res: any) => {
    try {
      const { user } = req.body;
      const hashedPassword = await bcrypt.hash(user.user_password, 10);

      const newUser = new User({
        user_id: user.user_id,
        user_password: hashedPassword,
      });

      const result = await newUser.save();
      res.status(200).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
  ```

  1. 비밀번호 해싱

     > ✨ 해싱(Hashing)이란 ?
     >
     > 작은 조각으로 잘게 다진다는 뜻.
     >
     > 해싱은 단방향의 특징을 가지고 있다. 그렇기 때문에 `Plain Text`를 `Hashed Text`로 변형시키는 것은 가능하지만 `Hashed Text`를 `Plain Text`로 변형시키는 것은 불가능하다.

     > ✨ 솔트(salt)란 ?
     >
     > hashing의 취약점을 보완하기 위해 추가되는 값.
     >
     > salt에 따라 `Hashed Text`가 전혀 다른 값을 가지게 되면서 `Plain Text`를 추적하기 어려워진다.

     `const hashedPassword = await bcrypt.hash(해싱 할 값, salt 값(정수));`

- 로그인 시 비밀번호 검증

  ```js
  app.post("/login", async (req: any, res: any) => {
    const { user_id, user_password } = req.body;
    try {
      const user = await User.findOne({ user_id });

      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }

      const passwordMatch = await bcrypt.compare(
        user_password,
        user.user_password
      );

      if (passwordMatch) {
        // 토큰발급 code 생략
        return res.status(200).json({ message: "로그인 성공!", user });
      } else {
        return res
          .status(401)
          .json({ message: "비밀번호가 일치하지 않습니다." });
      }
    } catch (err) {
      res.status(500).json({ message: "에러!", error: err });
    }
  });
  ```

  1. 클라이언트의 form에서 입력하여 전송한 user_id와 일치하는 id가 `user`에 있는지 확인하여, 없다면 status를 404로 return 한다.
  2. `bcrypt.compare` 메소드를 이용하여 form에서 입력한 비밀번호와 `Hashed Text`가 일치하는지 확인한다.

### 2. JWT를 이용한 토큰 발급

- 토큰 발급 및 dbName 추출
- 로그인 유지
- [Trouble Shooting](#1-jwt-관련)으로 인하여 sessionStorage사용으로 수정
- [개발블로그에 JWT 정리](https://frontendmk.tistory.com/16)

## ❌ Trouble Shooting

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
