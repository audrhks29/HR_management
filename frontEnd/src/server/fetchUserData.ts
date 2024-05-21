import axios from "axios";

export const postUserData = async (user_id: string, user_password: string) => {
  try {
    const response = await axios.post(
      "http://15.164.166.86:5000/login",
      {
        user_id,
        user_password,
      },
      {
        withCredentials: true,
      },
    );
    return response.data.user;
  } catch (err) {
    console.log(err);
  }
};

export const userSignUp = async (data: SignDataTypes) => {
  try {
    const response = await axios.post("http://15.164.166.86:5000/signup", data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getCurrentLoggedUser = async (user_id: string | null) => {
  try {
    const response = await axios.get(`http://15.164.166.86:5000/currentUser/${user_id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    console.log(err);
    return {};
  }
};

// export const accessToken = async () => {
//   try {
//     await axios.get("http://15.164.166.86:5000/accessToken", {
//       withCredentials: true,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const refreshToken = async () => {
//   try {
//     await axios.get("http://15.164.166.86:5000/refreshToken", {
//       withCredentials: true,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const userLogout = async () => {
  try {
    await axios.get("http://15.164.166.86:5000/logout", {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};
