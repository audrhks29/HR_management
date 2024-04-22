import mongoose from "mongoose";

const WorkDBSchema = new mongoose.Schema({
  employee_number: String,
  commuteTime: [
    {
      date: String,
      working_time: String,
      working_division: String,
      quitting_time: String,
      quitting_division: String,
      total_time: Number,
    },
  ],
  attitude: [
    {
      month: String,
      working_count: Number,
      annual_leave_count: Number,
      truancy_count: Number,
      overtime_count: Number,
      night_work_count: Number,
    },
  ],
});

const Work = mongoose.model("Work", WorkDBSchema, "workDB");

export default Work;
