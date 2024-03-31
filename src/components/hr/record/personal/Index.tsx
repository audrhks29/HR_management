import { memo } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Contents from './Contents';

const Index = memo(() => {


  return (
    <div>
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="info">정보</TabsTrigger>
          <TabsTrigger value="edu_career">학력&경력</TabsTrigger>
        </TabsList>

        <Contents />

      </Tabs>
    </div>
  );
});

export default Index;