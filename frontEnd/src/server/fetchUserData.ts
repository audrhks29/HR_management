import axios from "axios";

export const postUserData = async (user_id: string, user_password: string) => {
  try {
    const response = await axios.post("http://localhost:5000/user", {
      user_id,
      user_password,
    });
    if (response.status === 200) {
      return response.data.user;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
      }
    } else {
    }
  }
};
