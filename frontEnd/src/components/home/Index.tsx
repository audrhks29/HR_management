import { memo } from "react";
import Dashboard from "./dashboard/Dashboard";

const Index = memo(() => {
  return (
    <main>
      <Dashboard />
    </main>
  );
});

export default Index;
