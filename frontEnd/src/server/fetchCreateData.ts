import axios from "axios";

export const postMemberData = async (data: MemberDataTypes) => {
  await axios.post("http://localhost:5000/member", data);
};

export const postMemberSalaryData = async (data: MemberSalaryDataTypes) => {
  await axios.post("http://localhost:5000/memberSalary", data);
};

export const postAttitudeData = async (data: AttitudeTypes) => {
  await axios.post("http://localhost:5000/attitude", data);
};
