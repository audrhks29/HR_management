require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// MongoDB 연결
mongoose.connect(`${process.env.DB_URL}/BASE_DB`)
  .then(() => console.log('MongoDB가 연결되었습니다...!'))
  .catch((err: any) => console.error('MongoDB 연결 실패:', err));

// MongoDB에서 읽어오는 모델 정의
const memberDBSchema = new mongoose.Schema({
  // 스키마 정의
  // 예시: name: String, age: Number, ...
});

const Member = mongoose.model('Member', memberDBSchema, 'memberDB');

app.get('/', async (req: any, res: any) => {
  try {
    const data = await Member.find({});
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});