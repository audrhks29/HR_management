import mongoose from "mongoose";

const AttitudeDBSchema = new mongoose.Schema({
  date: String,
  data: [
    {
      employee_number: String,
      working_time: String,
      working_division: String,
      quitting_time: String,
      quitting_division: String,
    },
  ],
});

const Attitude = mongoose.model("Attitude", AttitudeDBSchema, "attitudeDB");

export default Attitude;
