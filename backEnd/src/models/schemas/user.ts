import mongoose from "mongoose";
import { userConnection } from "../../db/server";
const userDBSchema = new mongoose.Schema({
  user_id: String,
  user_password: String,
  business: {
    name_of_company: String,
    business_registration_number: String,
    name_of_representative: String,
    resident_registration_number: String,
    business_address: String,
    date_of_business_commencement: String,
    type_of_business: String,
    main_number: String,
  },
});

const User = userConnection.model("user", userDBSchema, "user");

export default User;
