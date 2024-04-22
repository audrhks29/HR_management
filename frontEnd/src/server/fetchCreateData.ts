import axios from "axios";

export const postMemberData = async (data: MemberDataTypes) => {
  await axios.post("http://localhost:5000/member", data);
};

export const postMemberSalaryData = async (data: MemberSalaryDataTypes) => {
  await axios.post("http://localhost:5000/memberSalary", data);
};

export const postCommuteTimeData = async (
  data: {
    employee_number: string;
    commuteTime: CommuteTimeDataTypes;
  },
  id: string,
) => {
  await axios.post(`http://localhost:5000/work/commute/${id}`, data);
};

export const postAttitudeData = async (data: AttitudeDataTypes | undefined, id: string) => {
  await axios.post(`http://localhost:5000/work/attitude/${id}`, data);
};
