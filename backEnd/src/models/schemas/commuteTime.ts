import mongoose from "mongoose";

const CommuteTimeDBSchema = new mongoose.Schema({
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

const CommuteTime = mongoose.model(
  "CommuteTime",
  CommuteTimeDBSchema,
  "commuteTimeDB"
);

export default CommuteTime;
