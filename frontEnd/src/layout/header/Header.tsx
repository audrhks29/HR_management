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
        <header className="grid grid-cols-[250px_1fr] h-[60px] border-b border-primary/40">
          <User />
          <PageTitle />
        </header>
      )}
    </>
  );
});

export default Header;
