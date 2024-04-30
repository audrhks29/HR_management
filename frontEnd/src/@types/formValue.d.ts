interface MemberRegistrationFormValues {
  employeeData: MemberDataTypes;
}

interface SalaryRegistrationFormTypes {
  salary: {
    year: string;
    salary: SalaryPersonalDataTypes;
  };
}

interface OrganizationFormValues {
  organizationData: OrganizationDataTypes[];
}
