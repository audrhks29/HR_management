import { TabsContent } from '@/components/ui/tabs';
import { memo } from 'react';

import MemberList from '@/shared/MemberList';
import Privacy from './menu/Privacy';
import Career from './menu/Career';
import { getMemberData } from '@/server/fatchData';
import { useSuspenseQuery } from '@tanstack/react-query';

const Contents = memo(() => {
  const { data: memberData }: { data: MemberDataTypes[] } = useSuspenseQuery({
    queryKey: ["memberData"],
    queryFn: getMemberData,
  });

  return (

    <div className='mt-5'>
      <TabsContent
        value="info"
        className='grid grid-cols-[2fr_1fr] gap-6'>
        <Privacy data={memberData} />
        <MemberList
          menuLink="hr_record"
          height="800px"
          displayAmount={11} />
      </TabsContent>

      <TabsContent
        value="edu_career"
        className='grid grid-cols-[2fr_1fr] gap-6'>
        <Career data={memberData} />
        <MemberList
          menuLink="hr_record"
          height="800px"
          displayAmount={11} />
      </TabsContent>

    </div>


  );
});

export default Contents;