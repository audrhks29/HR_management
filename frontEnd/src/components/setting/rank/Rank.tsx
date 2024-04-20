import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { memo } from "react";

const Rank = memo(() => {
  return (
    <Card className="p-8">
      <CardTitle className="pb-3">직급</CardTitle>
      <Separator />
      <CardContent className="py-3">
        <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
          <Button variant="outline">1</Button>
          <Input type="text" value="CEO" />
        </div>
        <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
          <Button variant="outline">2</Button>
          <Input type="text" value="부사장" />
        </div>
        <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
          <Button variant="outline">3</Button>
          <Input type="text" value="상무" />
        </div>
        <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
          <Button variant="outline">4</Button>
          <Input type="text" value="이사" />
        </div>
        <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
          <Button variant="outline">5</Button>
          <Input type="text" value="부장" />
        </div>
        <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
          <Button variant="outline">6</Button>
          <Input type="text" value="차장" />
        </div>
        <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
          <Button variant="outline">7</Button>
          <Input type="text" value="과장" />
        </div>
        <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
          <Button variant="outline">8</Button>
          <Input type="text" value="대리" />
        </div>
        <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
          <Button variant="outline">9</Button>
          <Input type="text" value="주임" />
        </div>
        <div className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
          <Button variant="outline">10</Button>
          <Input type="text" value="사원" />
        </div>
      </CardContent>
    </Card>
  );
});

export default Rank;
