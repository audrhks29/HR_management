import axios from "axios";

export const getMemberData = async () => {
  const response = await axios.get("http://localhost:5000/member");
  return response.data
};

export const getPersonalData = async (employee_number: string | undefined) => {
  const response = await axios.get(`http://localhost:5000/member/${employee_number}`);
  return response.data
};

export const getSalaryData = async () => {
  const response = await axios.get("http://localhost:5000/salary");
  return response.data
};

export const getBusinessData = async () => {
  const response = await axios.get("http://localhost:5000/business");
  return response.data
};

export const getOrganizationData = async () => {
  const response = await axios.get("http://localhost:5000/organization");
  return response.data
};

export const getMemberSalaryData = async () => {
  const response = await axios.get("http://localhost:5000/memberSalary");
  return response.data
};

export const getRankData = async () => {
  const response = await axios.get("http://localhost:5000/rank");
  return response.data
};