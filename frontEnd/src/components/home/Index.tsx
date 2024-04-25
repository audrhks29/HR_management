import { memo } from "react";
import EmployeeInfo from "./login/EmployeeInfo";
import Dashboard from "./dashboard/Dashboard";

const Index = memo(() => {
  return (
    <main>
      <Dashboard />
    </main>
  );
});

export default Index;
