import { memo } from "react";
import EmployeeInfo from "./login/EmployeeInfo";
import Info from "./info/Info";

const Index = memo(() => {
  return (
    <main className="grid grid-cols-[1fr_1fr_358px] gap-6">
      <Info />
      <EmployeeInfo />
    </main>
  );
});

export default Index;
