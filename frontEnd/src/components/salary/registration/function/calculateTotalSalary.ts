export const calculateTotalSalary = (data: SalaryRegistrationFormTypes) => {
  const { annual_leave_allowance, bonus, meals, night_work_allowance, overtime_pay, salary, saturday_work_allowance } =
    data.salary;

  const total_salary =
    annual_leave_allowance + bonus + night_work_allowance + overtime_pay + salary + saturday_work_allowance + meals;

  return total_salary;
};
