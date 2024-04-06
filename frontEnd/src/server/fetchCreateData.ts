import axios from "axios";

export const postMemberData = async (data: MemberDataTypes) => {
  await axios.post('http://localhost:5000/member', data)
    .then(response => {
      console.log('삽입된 문서:', response.data);
    })
    .catch(error => {
      console.error('오류 발생:', error);
    });
};

export const postMemberSalaryData = async (data: MemberSalaryDataTypes) => {
  await axios.post('http://localhost:5000/memberSalary', data)
    .then(response => {
      console.log('삽입된 문서:', response.data);
    })
    .catch(error => {
      console.error('오류 발생:', error);
    });
};

