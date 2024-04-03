interface MemberDataTypes {
  "employee_number": string;
  "kor_name": string;
  "eng_name": string;
  "sex": string;
  "quarter": string;
  "department": string;
  "team": string;
  "position": string;
  "rank": string;
  "date_of_joining": string;
}

interface SalaryDataTypes {
  "employee_number": string;
  "data": {
    year: number;
    salary: {
      "month": number;
      "salary": number;
      "overtime_pay": number;
      "bonus": number;
      "saturday_work_allowance": number;
      "night_work_allowance": number;
      "annual_leave_allowance": number;
      "meals": number;
    }[]
  }[]
}