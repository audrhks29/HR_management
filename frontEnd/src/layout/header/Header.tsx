import { memo } from "react";

import User from "./user/User";
import PageTitle from "@/layout/header/PageTitle";
import { useLocation } from "react-router-dom";
import excludeHashArray from "@/assets/excludeHashList";

const Header = memo(() => {
  const location = useLocation();
  return (
    <>
      {!excludeHashArray.some(item => location.pathname.includes(item)) && (
        <header className="col-span-2 h-[60px] flex border-b border-primary/40 w-full">
          <User />
          <PageTitle />
        </header>
      )}
    </>
  );
});

export default Header;
