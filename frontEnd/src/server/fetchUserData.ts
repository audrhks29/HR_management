import axios from "axios";

export const postUserData = async (user_id: string, user_password: string) => {
  try {
    const response = await axios.post("http://localhost:5000/user", {
      user_id,
      user_password,
    });
    if (response.status === 200) {
      alert("로그인에 성공하였습니다.");
      return response.data.user;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
      }
    } else {
      alert("서버 오류가 발생했습니다.");
    }
  }
};
