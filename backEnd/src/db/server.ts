// app.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// MongoDB 연결
mongoose.connect(`${process.env.DB_URL}/BASE_DB`)
  .then(() => console.log('MongoDB가 연결되었습니다...!'))
  .catch((err: any) => console.error('MongoDB 연결 실패:', err));

// cors 허용
app.use(cors());

// 미들웨어 설정
app.use(express.json());

// 스키마 설정
const salaryDBSchema = new mongoose.Schema({
  employee_number: String,
  data: {
    year: Number,
    salary: {
      month: Number,
      salary: Number,
      overtime_pay: Number,
      bonus: Number,
      saturday_work_allowance: Number,
      night_work_allowance: Number,
      annual_leave_allowance: Number,
      meals: Number
    }
  }
});

const memberDBSchema = new mongoose.Schema({
  id: String,
  employee_number: String,
  kor_name: String,
  eng_name: String,
  sex: String,
  quarter: String,
  department: String,
  team: String,
  position: String,
  rank: String,
  date_of_joining: String
});

const memberSalaryDBSchema = new mongoose.Schema({
  employee_number: String,
  wage: Number
});

const organizationDBSchema = new mongoose.Schema({
  id: Number,
  quarter: String,
  depart: {
    id: Number,
    name: String,
    team: {
      id: Number,
      name: String
    }
  }
})

const businessDBSchema = new mongoose.Schema({
  id: Number,
  kor_desc: String,
  eng_desc: String,
  displayText: String
})

const Salary = mongoose.model('Salary', salaryDBSchema, 'salaryDB');
const Member = mongoose.model('Member', memberDBSchema, 'memberDB');
const MemberSalary = mongoose.model('MemberSalary', memberSalaryDBSchema, 'memberSalaryDB');
const Organization = mongoose.model('Organization', organizationDBSchema, 'organizationDB');
const Business = mongoose.model('Business', businessDBSchema, 'businessDB');

// 라우트 설정
require('../routes/salary')(app, Salary);
require('../routes/member')(app, Member);
require('../routes/memberSalary')(app, MemberSalary);
require('../routes/organization')(app, Organization);
require('../routes/business')(app, Business);

// 서버 시작
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
