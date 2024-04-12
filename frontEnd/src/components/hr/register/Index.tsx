import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { memo, useState } from "react";
import Contents from "./Contents";

const Index = memo(() => {
  const [activeTap, setActiveTab] = useState("info");

  // 다음 버튼 클릭
  const handleNextClick = () => setActiveTab("edu_career");

  return (
    <Tabs value={activeTap} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 w-[400px]">
        <TabsTrigger value="info">정보</TabsTrigger>
        <TabsTrigger value="edu_career">학력&경력</TabsTrigger>
      </TabsList>

      <Contents handleNextClick={handleNextClick} />
    </Tabs>
  );
});

export default Index;
