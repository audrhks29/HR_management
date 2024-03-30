import { memo } from 'react';

import { TabsContent } from '@/components/ui/tabs';

import Privacy from './info/Privacy';
import Department from './info/Department';
import { Button } from '@/components/ui/button';

const Info = memo(() => {
  return (
    <div>
      <TabsContent
        value="info"
        className='grid grid-cols-2 gap-6'>
        <Privacy />
        <Department />
      </TabsContent>

      <div className='absolute mt-6 right-6'>
        <Button>다음</Button>
      </div>
    </div>
  );
});

export default Info;