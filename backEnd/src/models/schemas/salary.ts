import mongoose from "mongoose";

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
      meals: Number,
    },
  },
});

const Salary = mongoose.model("Salary", salaryDBSchema, "salaryDB");

export default Salary;
