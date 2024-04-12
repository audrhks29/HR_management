import mongoose from "mongoose";

const businessDBSchema = new mongoose.Schema({
  id: Number,
  kor_desc: String,
  eng_desc: String,
  displayText: String,
});

const Business = mongoose.model("Business", businessDBSchema, "businessDB");

export default Business;
