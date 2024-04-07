interface MemberDataTypes {
  employee_number: string;
  kor_name: string;
  eng_name: string;
  phone_number: string;
  rrn_front: string;
  rrn_back: string;
  sex: string;
  quarter: string;
  department: string;
  team: string;
  position: string;
  rank: string;
  date_of_joining: string;
  // edu: {
  //   id: number;
  //   school_classification: string;
  //   school_name: string;
  //   collage: string;
  //   graduation_status: string;
  // }[]
}

interface SalaryDataTypes {
  employee_number: string;
  data: {
    year: number;
    salary: {
      month: number;
      salary: number;
      overtime_pay: number;
      bonus: number;
      saturday_work_allowance: number;
      night_work_allowance: number;
      annual_leave_allowance: number;
      meals: number;
    }[]
  }[]
}

interface MemberSalaryDataTypes {
  employee_number: string;
  wage: number;
}

interface OrganizationDataTypes {
  id: number;
  quarter: string;
  depart: {
    id: number;
    name: string;
    team: {
      id: number;
      name: string;
    }[]
  }[]
}

interface BusinessDataTypes {
  id: number;
  kor_desc: string;
  eng_desc: string;
  displayText: string;
}

interface RankDataTypes {
  id: number;
  rank: string;
  order: number;
}

interface PositionDataTypes {
  id: number;
  name: string;
}