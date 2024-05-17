require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const app = express();
const port = 5000;

// MongoDB 연결
// mongoose
//   .connect(`${process.env.DB_URL}/BASE_DB`)
//   .then(() => console.log("MongoDB가 연결되었습니다...!"))
//   .catch((err: any) => console.error("MongoDB 연결 실패:", err));

export const userConnection = mongoose.createConnection(
  `${process.env.DB_URL}/user`
);

userConnection.on("connected", () => {
  console.log("MongoDB user 데이터베이스에 연결되었습니다...!");
});

userConnection.on("error", (err: any) => {
  console.error("user 연결 실패:", err);
});

app.use(express.json());
app.use(bodyParser.json());

// cors 허용
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

// 스키마 require
const Salary = require("../models/schemas/salary").default;
const Member = require("../models/schemas/member").default;
const MemberSalary = require("../models/schemas/memberSalary").default;
const Organization = require("../models/schemas/organization").default;
const Work = require("../models/schemas/work").default;

const User = require("../models/schemas/user").default;

const Setting = require("../models/schemas/setting").default;

// 라우트 설정
require("../routes/salary")(app, Salary);
require("../routes/member")(app, Member);
require("../routes/memberSalary")(app, MemberSalary);
require("../routes/organization")(app, Organization);
require("../routes/work")(app, Work);

// 로그인
require("../routes/user")(app, User);

//세팅
require("../routes/setting")(app, Setting);

// 서버 시작
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
