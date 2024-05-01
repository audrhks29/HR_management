import mongoose from "mongoose";

const memberSalaryDBSchema = new mongoose.Schema({
  employee_number: String,
  data: [
    {
      year: String,
      month: String,
      wage: Number,
      salary: Number,
    },
  ],
});

const MemberSalary = mongoose.model(
  "MemberSalary",
  memberSalaryDBSchema,
  "memberSalaryDB"
);

export default MemberSalary;
