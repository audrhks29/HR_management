import { memo } from 'react';

import Menu from "./Menu";
import User from './user/User';

const Header = memo(() => {
  return (
    <header className="h-screen p-4 bg-background border-r border-r-border rounded-r-md">
      <User />
      <Menu />
    </header>
  );
});

export default Header;