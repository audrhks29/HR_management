// dbMiddleware.ts
const mongoose = require("mongoose");
const jwtoken = require("jsonwebtoken");

const db = async (
  req: { cookies: { accessToken: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string; error?: any }): void; new (): any };
    };
  },
  next: () => void
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
  }

  try {
    const decoded = jwtoken.verify(token, process.env.ACCESS_SECRET_KEY);
    const dbName = decoded.dbName;

    await mongoose
      .connect(`${process.env.DB_URL}/${dbName}`)
      .then(() => console.log("MongoDB가 연결되었습니다...!"))
      .catch((err: any) => console.error("MongoDB 연결 실패:", err));

    next();
  } catch (error) {
    res.status(500).json({ message: "토큰 인증 실패", error });
  }
};

const dbClose = async () => {
  try {
    await mongoose.connections
      .filter((con: any) => con.name !== "user")
      .forEach((con: any) => con.close());
  } catch (error) {
    console.log(error);
  }
};

module.exports = { db, dbClose };
