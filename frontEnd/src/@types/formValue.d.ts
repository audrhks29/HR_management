interface MemberRegistrationFormTypes {
  employeeData: MemberDataTypes;
}

interface SalaryRegistrationFormTypes {
  salary: {
    year: string;
    salary: SalaryPersonalDataTypes;
  };
}

interface OrganizationFormTypes {
  organizationData: OrganizationDataTypes[];
}

interface MemberSalaryFormTypes {
  memberSalary: {
    employee_number: string;
    data: {
      year: string;
      month: string;
      wage: number;
      salary: number;
    };
  };
}
