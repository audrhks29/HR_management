import { memo } from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CommuteTime = memo(() => {
  return (
    <Card className="p-8">
      <CardTitle className="pb-3">출퇴근시간</CardTitle>
      <Separator />
      <CardContent className="py-3 grid grid-cols-2 gap-6">
        <div>
          <h2 className="py-2 text-[20px] font-bold">출근</h2>
          <Separator />
          <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
            <Button variant="outline">1</Button>
            <Input type="text" placeholder="예) 09:00" value="정상출근" />
          </div>

          <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
            <Button variant="outline">2</Button>
            <Input type="text" placeholder="예) 09:00" value="지각" />
          </div>

          <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
            <Button variant="outline">3</Button>
            <Input type="text" placeholder="예) 09:00" value="결근" />
          </div>

          <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
            <Button variant="outline">4</Button>
            <Input type="text" placeholder="예) 09:00" value="연차" />
          </div>

          <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
            <Button variant="outline">5</Button>
            <Input type="text" placeholder="예) 09:00" value="오전반차" />
          </div>
        </div>

        <div>
          <h2 className="py-2 text-[20px] font-bold">퇴근</h2>
          <Separator />
          <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
            <Button variant="outline">1</Button>
            <Input type="text" placeholder="예) 09:00" value="정상퇴근" />
          </div>

          <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
            <Button variant="outline">2</Button>
            <Input type="text" placeholder="예) 09:00" value="조기퇴근" />
          </div>

          <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
            <Button variant="outline">3</Button>
            <Input type="text" placeholder="예) 09:00" value="병가" />
          </div>

          <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
            <Button variant="outline">4</Button>
            <Input type="text" placeholder="예) 09:00" value="오후반차" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default CommuteTime;
