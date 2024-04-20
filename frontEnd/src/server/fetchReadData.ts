import axios from "axios";

export const getMemberData = async () => {
  const response = await axios.get("http://localhost:5000/member");
  return response.data;
};

export const getMemberPersonalData = async (employee_number: string | undefined) => {
  const response = await axios.get(`http://localhost:5000/member/${employee_number}`);
  return response.data;
};

export const getSalaryData = async () => {
  const response = await axios.get("http://localhost:5000/salary");
  return response.data;
};

export const getSalaryPersonalData = async (
  employee_number: string | undefined,
  year: string | undefined,
  month: string | undefined,
) => {
  const response = await axios.get(`http://localhost:5000/salary/${employee_number}/${year}/${month}`);
  return response.data;
};

export const getBusinessData = async () => {
  const response = await axios.get("http://localhost:5000/business");
  return response.data;
};

export const getOrganizationData = async () => {
  const response = await axios.get("http://localhost:5000/organization");
  return response.data;
};

export const getMemberSalaryData = async () => {
  const response = await axios.get("http://localhost:5000/memberSalary");
  return response.data;
};

export const getRankData = async () => {
  const response = await axios.get("http://localhost:5000/rank");
  return response.data;
};

export const getPositionData = async () => {
  const response = await axios.get("http://localhost:5000/position");
  return response.data;
};

export const getCommuteTimeData = async () => {
  const response = await axios.get("http://localhost:5000/commutetime");
  return response.data;
};

export const getCommuteTimeDateData = async (date: string) => {
  const response = await axios.get(`http://localhost:5000/commutetime/${date}`);
  return response.data;
};
