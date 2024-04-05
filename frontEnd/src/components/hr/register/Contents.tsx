import { memo } from 'react';

import { TabsContent } from '@/components/ui/tabs';

import Privacy from './menu/info/Privacy';
import Department from './menu/info/Department';
import { Button } from '@/components/ui/button';
import Career from './menu/career/Career';
import Education from './menu/career/Education';

const Contents = memo(() => {
  return (
    <div className='mt-5'>
      <TabsContent
        value="info"
        className='grid grid-cols-2 gap-6'>
        <Privacy />
        <Department />
        <div className='text-right col-span-2'>
          <Button>다음</Button>
        </div>
      </TabsContent>

      <TabsContent
        value="edu_career"
        className='grid grid-rows-2 gap-6'
      >
        <Education />
        <Career />
        <div className='text-right'>
          <Button>제출</Button>
        </div>
      </TabsContent>
    </div>
  );
});

export default Contents;