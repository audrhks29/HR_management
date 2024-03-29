import { memo } from 'react';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const User = memo(() => {
  return (
    <div className="border-b border-b-secondary h-10 flex justify-between items-center p-1">
      <div>이름</div>
      <Link to="/login" className='block'>
        <Button
          variant="secondary"
          className="h-7"
        >로그인</Button>
      </Link>
    </div>
  );
});

export default User;