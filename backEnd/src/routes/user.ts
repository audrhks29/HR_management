const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  db: dbMiddleware,
  dbClose: closeDbConnection,
} = require("../middlewares/db");

module.exports = function (app: any, User: any) {
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

      // access token 발급
      if (passwordMatch) {
        const dbName = user_id === "sample" ? `BASE_DB` : user_id;
        const accessToken = jwt.sign(
          {
            id: user_id,
            dbName,
          },
          process.env.ACCESS_SECRET_KEY,
          { expiresIn: "5h", issuer: "Hr" }
        );

        // refresh token 발급
        const refreshToken = jwt.sign(
          {
            id: user_id,
            dbName,
          },
          process.env.REFRESH_SECRET_KEY,
          { expiresIn: "24h", issuer: "Hr" }
        );

        // access token 전송
        res.cookie("accessToken", accessToken, {
          secure: false,
          httpOnly: true,
        });

        // refresh token 전송
        res.cookie("refreshToken", refreshToken, {
          secure: false,
          httpOnly: true,
        });

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

  app.get("/accessToken", dbMiddleware, async (req: any, res: any) => {
    try {
      const token = req.cookies.accessToken;
      const data = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

      const user = await User.findOne({ user_id: data.id });
      const { password, ...others } = user;
      res.status(200).json(others);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/refreshToken", dbMiddleware, async (req: any, res: any) => {
    try {
      const token = req.cookies.refreshToken;
      const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

      const user = await User.findOne({ user_id: data.id });

      const accessToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "5h", issuer: "Hr" }
      );

      res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
      });

      res.status(200).json("AccessToken Recreated");
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/logout", async (req: any, res: any) => {
    try {
      await closeDbConnection();
      res.cookie("accessToken", "", { maxAge: 0 });
      res.cookie("refreshToken", "", { maxAge: 0 });

      res.status(200).json("Logout Success");
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
