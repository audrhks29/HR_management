
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { memo } from 'react';
import Info from './menu/Info';

const Index = memo(() => {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid grid-cols-5 w-[500px]">
        <TabsTrigger value="info">정보</TabsTrigger>
        <TabsTrigger value="certificate">자격 및 교육</TabsTrigger>
        <TabsTrigger value="carrer">경력</TabsTrigger>
        <TabsTrigger value="department">부서</TabsTrigger>
        <TabsTrigger value="etc">기타</TabsTrigger>
      </TabsList>

      <Info />

    </Tabs>
  );
});

export default Index;