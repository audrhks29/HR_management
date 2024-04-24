import { memo } from "react";
import EmployeeInfo from "./login/EmployeeInfo";
import Dashboard from "./dashboard/Dashboard";

const Index = memo(() => {
  return (
    <main className="grid grid-cols-[1fr_1fr_358px] gap-6">
      <Dashboard />
      <EmployeeInfo />
    </main>
  );
});

export default Index;
