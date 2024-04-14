import mongoose from "mongoose";
import { userConnection } from "../../db/server";
const userDBSchema = new mongoose.Schema({
  user_id: String,
  user_password: String,
  businessInfo: [
    {
      id: Number,
      kor_desc: String,
      eng_desc: String,
      displayText: String,
    },
  ],
});

const User = userConnection.model("user", userDBSchema, "user");

export default User;
