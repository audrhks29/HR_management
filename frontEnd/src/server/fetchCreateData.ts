import axios from "axios";

export const postMemberData = async (data: { employeeData: MemberDataTypes }) => {
  await axios.post("http://15.164.166.86/member", data);
};

export const postMemberSalaryPersonalData = async (data: MemberSalaryFormTypes, id: string | undefined) => {
  await axios.post(`http://15.164.166.86/memberSalary/${id}`, data);
};

export const postCommuteTimeData = async (
  data: {
    employee_number: string;
    commuteTime: CommuteTimeDataTypes;
  },
  id: string,
) => {
  await axios.post(`http://15.164.166.86/work/commute/${id}`, data);
};

export const postAttitudeData = async (data: AttitudeDataTypes | undefined, id: string) => {
  await axios.post(`http://15.164.166.86/work/attitude/${id}`, data);
};

export const postSalaryData = async (
  data: SalaryRegistrationFormTypes | undefined,
  id: string | undefined,
  year: string,
  month: string,
) => {
  await axios.post(`http://15.164.166.86/salary/${id}/${year}/${month}`, data);
};

export const postSettingBusinessData = async (data: BusinessSettingTypes | undefined) => {
  await axios.post(`http://15.164.166.86/setting/business`, data);
};
