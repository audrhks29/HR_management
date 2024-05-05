import axios from "axios";

export const deleteSalaryData = async (id: string | undefined, year: string, month: string) => {
  const response = await axios.delete(`http://localhost:5000/salary/${id}/${year}/${month}`);
  return response.data;
};

export const deleteMemberSalaryData = async (id: string | undefined, year: string, month: string) => {
  const response = await axios.delete(`http://localhost:5000/memberSalary/${id}/${year}/${month}`);
  return response.data;
};

export const deletePersonalMemberData = async (id: string | undefined) => {
  const response = await axios.delete(`http://localhost:5000/member/${id}`);
  return response.data;
};

export const deletePersonalWorkData = async (id: string | undefined) => {
  const response = await axios.delete(`http://localhost:5000/work/${id}`);
  return response.data;
};

export const deletePersonalMemberSalaryData = async (id: string | undefined) => {
  const response = await axios.delete(`http://localhost:5000//${id}`);
  return response.data;
};

export const deletePersonalSalaryData = async (id: string | undefined) => {
  const response = await axios.delete(`http://localhost:5000/work/${id}`);
  return response.data;
};
