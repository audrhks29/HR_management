import axios from "axios";

export const updateOrganizationData = async (updateData: { organizationData: OrganizationDataTypes[] }) => {
  const response = await axios.put("http://localhost:5000/organization", updateData);
  return response.data;
};

export const updateSettingBusinessData = async (updateData: { business_setting: BusinessSettingTypes }) => {
  const response = await axios.put("http://localhost:5000/setting/business", updateData);
  return response.data;
};

export const updateSettingRankData = async (updateData: { rank_setting: RankSettingTypes[] }) => {
  const response = await axios.put("http://localhost:5000/setting/rank", updateData);
  return response.data;
};

export const updateSettingPositionData = async (updateData: { position_setting: PositionSettingTypes[] }) => {
  const response = await axios.put("http://localhost:5000/setting/position", updateData);
  return response.data;
};

export const updateSalaryData = async (
  updateData: SalaryRegistrationFormTypes,
  id: string | undefined,
  year: string,
  month: string,
) => {
  const response = await axios.put(`http://localhost:5000/salary/${id}/${year}/${month}`, updateData);
  return response.data;
};

export const updateEduCareerData = async (
  updateData: MemberPrivacyUpdateFormTypes | MemberEduCareerUpdateFormTypes,
  id: string | undefined,
) => {
  const response = await axios.put(`http://localhost:5000/member/${id}`, updateData);
  return response.data;
};
