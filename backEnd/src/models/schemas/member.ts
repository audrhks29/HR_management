import mongoose from "mongoose";

const memberDBSchema = new mongoose.Schema({
  employee_number: String,
  kor_name: String,
  eng_name: String,
  sex: String,
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