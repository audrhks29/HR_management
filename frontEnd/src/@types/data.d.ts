interface MemberDataTypes {
  employee_number: string;
  kor_name: string;
  eng_name: string;
  phone_number: string;
  address: AddressDataTypes;
  rrn_front: string;
  rrn_back: string;
  sex: string;
  email: string;
  military: {
    division: string;
    army: string;
    rank: string;
  };
  quarter: string;
  department: string;
  team: string;
  position: string;
  rank: string;
  date_of_joining: string;
  career: CareerDataTypes[];
  edu: EduDataTypes[];
}

interface SalaryDataTypes {
  employee_number: string;
  data: {
    year: number;
    salary: SalaryPersonalDataTypes[];
  }[];
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
    }[];
  }[];
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

interface CareerDataTypes {
  company_name: string;
  join_date: string;
  leave_date: string;
  job: string;
  depart: string;
  rank: string;
}

interface EduDataTypes {
  school_classification: string;
  school_name: string;
  collage: string;
  graduation_status: string;
  admission_date: string;
  graduation_date: string;
}

interface AddressDataTypes {
  address: string;
  jibun_address: string;
  zone_code: string;
  detail_address: string;
}

interface SalaryPersonalDataTypes {
  month: number;
  salary: number;
  overtime_pay: number;
  bonus: number;
  saturday_work_allowance: number;
  night_work_allowance: number;
  annual_leave_allowance: number;
  meals: number;
  tax: {
    national_pension: number;
    health_tax: number;
    long_term_care_insurance: number;
    employment_insurance: number;
    income_tax: number;
    resident_tax: number;
    year_end_tax_settlement: number;
  };
}
