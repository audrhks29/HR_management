import mongoose from "mongoose";

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

const Member = mongoose.model('Member', memberDBSchema, 'memberDB');

export default Member;