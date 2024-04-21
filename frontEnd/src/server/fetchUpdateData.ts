import axios from "axios";

export const updateSettingBusinessData = async (updateData: { business_setting: BusinessSettingTypes }) => {
  const response = await axios.put("http://localhost:5000/setting/business", updateData);
  return response.data;
};

export const updateSettingCommuteData = async (updateData: { commute_setting: CommuteSettingTypes }) => {
  const response = await axios.put("http://localhost:5000/setting/commute", updateData);
  return response.data;
};

export const updateSettingRankData = async (updateData: { RankSettingTypes: RankSettingTypes[] }) => {
  const response = await axios.put("http://localhost:5000/setting/rank", updateData);
  return response.data;
};
