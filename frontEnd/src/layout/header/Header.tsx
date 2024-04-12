import { memo } from "react";

import User from "./user/User";
import PageTitle from "@/layout/header/PageTitle";
import { useLocation } from "react-router-dom";

const Header = memo(() => {
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes("salary_history_personal") && (
        <header className="col-span-2 h-[60px] flex border-b border-primary/40 w-full">
          <User />
          <PageTitle />
        </header>
      )}
    </>
  );
});

export default Header;
