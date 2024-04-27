import axios from "axios";

// member
export const getMemberData = async () => {
  const response = await axios.get("http://localhost:5000/member");
  return response.data;
};

export const getMemberPersonalData = async (employee_number: string | undefined) => {
  const response = await axios.get(`http://localhost:5000/member/${employee_number}`);
  return response.data;
};

// salary
export const getSalaryData = async () => {
  const response = await axios.get("http://localhost:5000/salary");
  return response.data;
};

export const getPersonalSalaryData = async (id: string | undefined) => {
  const response = await axios.get(`http://localhost:5000/salary/${id}`);
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

// organization
export const getOrganizationData = async () => {
  const response = await axios.get("http://localhost:5000/organization");
  return response.data;
};

// memberSalary
export const getMemberSalaryData = async () => {
  const response = await axios.get("http://localhost:5000/memberSalary");
  return response.data;
};

export const getPersonalMemberSalaryData = async (id: string | undefined) => {
  const response = await axios.get(`http://localhost:5000/memberSalary/${id}`);
  return response.data;
};

// workData
export const getWorkData = async () => {
  const response = await axios.get("http://localhost:5000/work");
  return response.data;
};

export const getPersonalAttitudeData = async (id: string | undefined) => {
  const response = await axios.get(`http://localhost:5000/work/attitude/${id}`);
  return response.data;
};

export const getAttitudeData = async () => {
  const response = await axios.get("http://localhost:5000/work/attitude");
  return response.data;
};

export const getCommuteData = async () => {
  const response = await axios.get("http://localhost:5000/work/commute");
  return response.data;
};

// setting
export const getSettingData = async () => {
  const response = await axios.get(`http://localhost:5000/setting`);
  return response.data;
};

export const getRankData = async () => {
  const response = await axios.get("http://localhost:5000/setting/rank");
  return response.data;
};

export const getPositionData = async () => {
  const response = await axios.get("http://localhost:5000/setting/position");
  return response.data;
};
