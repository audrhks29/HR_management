import { TabsContent } from '@/components/ui/tabs';
import { memo } from 'react';
import Privacy from './menu/info/Privacy';

const Contents = memo(() => {
  return (
    <div className='mt-5'>
      <TabsContent
        value="info"
        className='grid grid-cols-[2fr_1fr] gap-6'>
        <Privacy />

      </TabsContent>
    </div>
  );
});

export default Contents;