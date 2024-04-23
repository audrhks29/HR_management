import mongoose from "mongoose";

const salaryDBSchema = new mongoose.Schema({
  employee_number: String,
  data: [
    {
      year: String,
      salary: [
        {
          month: String,
          salary: Number,
          overtime_pay: Number,
          bonus: Number,
          saturday_work_allowance: Number,
          night_work_allowance: Number,
          annual_leave_allowance: Number,
          meals: Number,
          total_salary: Number,
          tax: {
            national_pension: Number,
            health_tax: Number,
            long_term_care_insurance: Number,
            employment_insurance: Number,
            income_tax: Number,
            resident_tax: Number,
            year_end_tax_settlement: Number,
            total_tax: Number,
          },
        },
      ],
    },
  ],
});

const Salary = mongoose.model("Salary", salaryDBSchema, "salaryDB");

export default Salary;
