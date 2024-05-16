import axios from "axios";

export const postUserData = async (user_id: string, user_password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/login",
      {
        user_id,
        user_password,
      },
      {
        withCredentials: true,
      },
    );

    return response.data.user;
  } catch (error) {
    console.log("error");
  }
};

export const userSignUp = async (data: SignDataTypes) => {
  try {
    const response = await axios.post("http://localhost:5000/signup", data);
    if (response.status === 200) {
      return response.data.user;
    }
  } catch {}
};

export const accessToken = async () => {
  try {
    await axios.get("http://localhost:5000/accessToken", {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const refreshToken = async () => {
  try {
    await axios.get("http://localhost:5000/refreshToken", {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userLogout = async () => {
  try {
    await axios.get("http://localhost:5000/logout", {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};
