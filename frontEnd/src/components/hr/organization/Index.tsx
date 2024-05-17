import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { getOrganizationData } from "@/server/fetchReadData";
import Contents from "./Contents";
import Edit from "./edit/Edit";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: organizationData, refetch }: { data: OrganizationDataTypes[]; refetch: () => void } = useSuspenseQuery({
    queryKey: ["organizationData"],
    queryFn: getOrganizationData,
  });

  return (
    <ScrollArea className="h-[850px] ">
      {!isEditMode && organizationData?.length === 0 ? (
        <Card className="p-8">
          <CardContent className="flex flex-col items-center justify-center h-full">
            <p>데이터가 없습니다</p>

            <Button type="button" onClick={() => setIsEditMode(true)} className="w-[100px] mt-3">
              등록
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue={organizationData[0]?.quarter}>
          {!isEditMode && (
            <TabsList>
              {organizationData.map((item, index) => (
                <TabsTrigger key={index} value={item.quarter} className="w-[200px]">
                  {item.quarter}
                </TabsTrigger>
              ))}
            </TabsList>
          )}

          {!isEditMode ? (
            organizationData.map((item, index) => <Contents key={index} data={item} />)
          ) : (
            <Edit organizationData={organizationData} refetch={refetch} setIsEditMode={setIsEditMode} />
          )}

          {!isEditMode && (
            <div className="text-right mt-3 mr-3">
              <Button type="button" onClick={() => setIsEditMode(true)}>
                수정
              </Button>
            </div>
          )}
        </Tabs>
      )}
    </ScrollArea>
  );
};

export default Index;
