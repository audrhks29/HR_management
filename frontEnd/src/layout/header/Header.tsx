import { memo } from "react";
import { useLocation } from "react-router-dom";

import Index from "@/components/user/Index";
import PageTitle from "@/layout/header/PageTitle";
import { includeHashArray, someHashArray } from "@/assets/excludeHashList";

const Header = memo(() => {
  const location = useLocation();
  return (
    <>
      {!includeHashArray.some(item => location.pathname.includes(item)) &&
        !someHashArray.some(item => item === location.pathname) && (
          <header className="grid grid-cols-[250px_1fr] h-[60px] border-b border-primary/20">
            <Index />
            <PageTitle />
          </header>
        )}
    </>
  );
});

export default Header;
