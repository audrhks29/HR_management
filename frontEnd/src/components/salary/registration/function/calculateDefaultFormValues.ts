import { calculateTotalSalary } from "./calculateTotalSalary";

export const calculateDefaultFormValues = (
  selectedMonth: {
    year: string;
    month: string;
  },
  employeeMonthAttitude: AttitudeDataTypes | undefined,
  hourSalary: number,
  personalMemberSalaryData: MemberSalaryDataTypes,
) => {
  let formatDefaultFormValues = {
    year: selectedMonth.year,
    salary: {
      annual_leave_allowance: 0,
      bonus: 0,
      meals: 0,
      month: selectedMonth.month,
      night_work_allowance: employeeMonthAttitude
        ? Math.ceil(employeeMonthAttitude.night_work_count * 0.5 * hourSalary)
        : 0,
      overtime_pay: employeeMonthAttitude ? Math.ceil(employeeMonthAttitude.overtime_count * 0.5 * hourSalary) : 0,
      salary: personalMemberSalaryData ? personalMemberSalaryData.wage / 12 : 0,
      saturday_work_allowance: employeeMonthAttitude
        ? Math.ceil(employeeMonthAttitude.holiday_work_count * 0.5 * hourSalary)
        : 0,
      total_salary: 0,
      tax: {
        employment_insurance: 0,
        health_tax: 0,
        income_tax: 0,
        long_term_care_insurance: 0,
        national_pension: 0,
        resident_tax: 0,
        year_end_tax_settlement: 0,
        total_tax: 0,
      },
    },
  };
  const total_salary = calculateTotalSalary(formatDefaultFormValues);

  const total_salary_except_meals = total_salary - formatDefaultFormValues.salary.meals;
  const employment_insurance = Math.round(total_salary_except_meals * 0.09);
  const health_tax = Math.round(total_salary_except_meals * 0.03545);
  // 소득세 간이세액
  const income_tax = Math.round(total_salary_except_meals * 0.1);
  const resident_tax = Math.round(income_tax * 0.1);
  const long_term_care_insurance = Math.round(health_tax * 0.1295);
  const national_pension = Math.round(total_salary_except_meals * 0.045);
  const total_tax =
    formatDefaultFormValues.salary.tax.year_end_tax_settlement +
    employment_insurance +
    health_tax +
    income_tax +
    long_term_care_insurance +
    national_pension +
    resident_tax;

  formatDefaultFormValues.salary.total_salary = total_salary;
  formatDefaultFormValues.salary.tax.employment_insurance = employment_insurance;
  formatDefaultFormValues.salary.tax.health_tax = health_tax;
  formatDefaultFormValues.salary.tax.income_tax = income_tax;
  formatDefaultFormValues.salary.tax.resident_tax = resident_tax;
  formatDefaultFormValues.salary.tax.long_term_care_insurance = long_term_care_insurance;
  formatDefaultFormValues.salary.tax.national_pension = national_pension;
  formatDefaultFormValues.salary.tax.total_tax = total_tax;

  return formatDefaultFormValues;
};
