import mongoose from "mongoose";

const memberDBSchema = new mongoose.Schema({
  employee_number: String,
  kor_name: String,
  eng_name: String,
  phone_number: String,
  address: {
    address: String,
    jibun_address: String,
    zone_code: String,
    detail_address: String,
  },
  rrn_front: String,
  rrn_back: String,
  sex: String,
  military: {
    division: String,
    army: String,
    rank: String,
  },
  quarter: String,
  department: String,
  team: String,
  position: String,
  rank: String,
  date_of_joining: String,
  career: [{
    company_name: String,
    join_date: String,
    leave_date: String,
    job: String,
    depart: String,
    rank: String,
  }],
  edu: [{
    school_classification: String,
    school_name: String,
    collage: String,
    graduation_status: String,
    admission_date: String,
    graduation_date: String,
  }]
});

const Member = mongoose.model('Member', memberDBSchema, 'memberDB');

export default Member;