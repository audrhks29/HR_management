import { Card, CardContent } from '@/components/ui/card';
import { memo } from 'react';

const None = memo(() => {
  return (
    <Card className='h-[850px] p-8'>
      <CardContent className='flex items-center justify-center h-full'>
        구성원을 선택해주세요
      </CardContent>
    </Card>
  );
});

export default None;