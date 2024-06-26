import mongoose from "mongoose";

const SettingDBSchema = new mongoose.Schema({
  business_setting: {
    name_of_company: String,
    business_registration_number: String,
    name_of_representative: String,
    resident_registration_number: String,
    business_address: String,
    date_of_business_commencement: String,
    type_of_business: String,
    main_number: String,
  },
  rank_setting: [{ order: Number, value: String }],
  position_setting: [
    {
      id: Number,
      name: String,
    },
  ],
});

const Setting = mongoose.model("Setting", SettingDBSchema, "setting");

export default Setting;
