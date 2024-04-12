import mongoose from "mongoose";

const memberSalaryDBSchema = new mongoose.Schema({
  employee_number: String,
  wage: Number,
});

const MemberSalary = mongoose.model(
  "MemberSalary",
  memberSalaryDBSchema,
  "memberSalaryDB"
);

export default MemberSalary;
