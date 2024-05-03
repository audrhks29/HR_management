import axios from "axios";

export const deleteSalaryData = async (id: string | undefined, year: string, month: string) => {
  const response = await axios.delete(`http://localhost:5000/salary/${id}/${year}/${month}`);
  return response.data;
};
