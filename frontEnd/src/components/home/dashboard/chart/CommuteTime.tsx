import { memo } from "react";
import { Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Working from "./commuteTime/Working";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getCommuteData } from "@/server/fetchReadData";
import Quitting from "./commuteTime/Quitting";

const CommuteTime = memo(() => {
  const { data: commuteData }: { data: ExceptAttitude[] } = useSuspenseQuery({
    queryKey: ["commuteData"],
    queryFn: getCommuteData,
  });

  return (
    <Card className="h-[330px]">
      <CardHeader>
        <CardTitle className="text-[20px] flex items-center">
          <Timer className="mr-2" />
          <span>금일 출퇴근 현황</span>
        </CardTitle>
      </CardHeader>
      <div className="grid grid-cols-2 gap-6">
        <CardContent>
          <Working commuteData={commuteData} />
        </CardContent>
        <CardContent>
          <Quitting commuteData={commuteData} />
        </CardContent>
      </div>
    </Card>
  );
});

export default CommuteTime;
