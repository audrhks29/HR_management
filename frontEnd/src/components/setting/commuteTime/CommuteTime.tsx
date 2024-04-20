import { memo } from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CommuteTime = memo(({ data }: { data: CommuteSettingTypes[] }) => {
  const working_time_setting = data.find(item => item.name === "working_time_setting");
  const quitting_time_setting = data.find(item => item.name === "quitting_time_setting");

  return (
    <Card className="p-8">
      <CardTitle className="pb-3">출퇴근시간</CardTitle>
      <Separator />
      <CardContent className="py-3 grid grid-cols-2 gap-6">
        <div>
          <h2 className="py-2 text-[20px] font-bold">출근</h2>
          <Separator />
          {working_time_setting?.setting.map(working => (
            <div key={working.id} className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
              <Button variant="outline">{working.id}</Button>
              <Input type="text" placeholder="예) 09:00" value={working.value} />
            </div>
          ))}
        </div>

        <div>
          <h2 className="py-2 text-[20px] font-bold">퇴근</h2>
          <Separator />
          {quitting_time_setting?.setting.map(qutting => (
            <div key={qutting.id} className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
              <Button variant="outline">{qutting.id}</Button>
              <Input type="text" placeholder="예) 09:00" value={qutting.value} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

export default CommuteTime;
