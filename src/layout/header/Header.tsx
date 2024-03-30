import { memo } from 'react';

import User from './user/User';
import PageTitle from '@/shared/PageTitle';

const Header = memo(() => {
  return (
    <header className='col-span-2 h-[60px] flex border-b border-primary/40'>
      <User />
      <PageTitle />
    </header>
  );
});

export default Header;