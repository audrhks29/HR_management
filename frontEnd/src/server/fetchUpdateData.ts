import axios from "axios";

export const updatePositionData = async () => {
  const response = await axios.get("http://localhost:5000/position");
  return response.data;
};
