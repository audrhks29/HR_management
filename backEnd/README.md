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

     // 토큰발급 code 생략
        return res.status(200).json({ message: "로그인 성공!", user });
      } else {
        return res
          .status(401)
          .json({ message: "비밀번호가 일치하지 않습니다." });
      }
    } catch (err) {
      res.status(500).json({ message: "에러!", error: err });
    });
  ```

  1. 클라이언트의 form에서 입력하여 전송한 user_id와 일치하는 id가 `user`에 있는지 확인, 없다면 status를 404로 return
  2. `bcrypt.compare` 메소드를 이용하여 form에서 입력한 비밀번호와 `Hashed Text`가 일치하는지 확인

### 2. JWT를 이용한 토큰발급

</div>
</details>
