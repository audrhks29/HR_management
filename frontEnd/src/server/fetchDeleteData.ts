import axios from "axios";

export const deleteSalaryData = async (id: string | undefined, year: string, month: string) => {
  const response = await axios.delete(`http://15.164.166.86/salary/${id}/${year}/${month}`);
  return response.data;
};

export const deleteMemberSalaryData = async (id: string | undefined, year: string, month: string) => {
  const response = await axios.delete(`http://15.164.166.86/memberSalary/${id}/${year}/${month}`);
  return response.data;
};

export const deletePersonalMemberData = async (id: string | undefined) => {
  const response = await axios.delete(`http://15.164.166.86/member/${id}`);
  return response.data;
};

export const deletePersonalWorkData = async (id: string | undefined) => {
  const response = await axios.delete(`http://15.164.166.86/work/${id}`);
  return response.data;
};

export const deletePersonalMemberSalaryData = async (id: string | undefined) => {
  const response = await axios.delete(`http://15.164.166.86/memberSalary/${id}`);
  return response.data;
};

export const deletePersonalSalaryData = async (id: string | undefined) => {
  const response = await axios.delete(`http://15.164.166.86/salary/${id}`);
  return response.data;
};
