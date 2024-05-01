import axios from "axios";

export const postMemberData = async (data: { employeeData: MemberDataTypes }) => {
  await axios.post("http://localhost:5000/member", data);
};

export const postMemberSalaryPersonalData = async (data: MemberSalaryFormTypes, id: string | undefined) => {
  console.log(data);
  await axios.post(`http://localhost:5000/memberSalary/${id}`, data);
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
