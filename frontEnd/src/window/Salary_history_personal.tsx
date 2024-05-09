import Index from "@/components/salary/history/personal/Index";
import { memo } from "react";

const Salary_history_personal = memo(() => {
  return (
    <main className="col-span-2 h-[840px]">
      <Index />
    </main>
  );
});

export default Salary_history_personal;
