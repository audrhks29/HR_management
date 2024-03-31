import { TabsContent } from '@/components/ui/tabs';
import { memo } from 'react';
import Privacy from './menu/info/Privacy';
import Career from './menu/info/Career';
import MemberList from './side/MemberList';

const Contents = memo(() => {
  return (

    <div className='mt-5'>
      <TabsContent
        value="info"
        className='grid grid-cols-[2fr_1fr] gap-6'>
        <Privacy />
        <MemberList />
      </TabsContent>

      <TabsContent
        value="edu_career"
        className='grid grid-cols-[2fr_1fr] gap-6'>
        <Career />
        <MemberList />
      </TabsContent>

    </div>


  );
});

export default Contents;