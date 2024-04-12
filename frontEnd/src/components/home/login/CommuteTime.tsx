import { ChangeEvent, memo, useEffect, useState } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Timer } from "lucide-react";

const CommuteTime = memo(() => {
  const [division, setDivision] = useState("on");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [reason, setReason] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Timer className="mr-2" />
          출퇴근 등록
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Timer className="mr-2" />
            출퇴근 등록
          </SheetTitle>
          <SheetDescription className="flex gap-1">
            <span>{currentTime.getFullYear()}년</span>
            <span>
              {currentTime.getMonth() + 1 < 10 ? `0${currentTime.getMonth() + 1}` : currentTime.getMonth() + 1}월
            </span>
            <span>{currentTime.getDate() < 10 ? `0${currentTime.getDate()}` : currentTime.getDate()}일</span>
            <span>{currentTime.getHours() < 10 ? `0${currentTime.getHours()}` : currentTime.getHours()}시</span>
            <span>{currentTime.getMinutes() < 10 ? `0${currentTime.getMinutes()}` : currentTime.getMinutes()}분</span>
            <span>{currentTime.getSeconds() < 10 ? `0${currentTime.getSeconds()}` : currentTime.getSeconds()}초</span>
          </SheetDescription>
        </SheetHeader>

        <div className="py-2">
          <Label>구분</Label>
          <Select value={division} onValueChange={value => setDivision(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="on">출근</SelectItem>
                <SelectItem value="off">퇴근</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>사유</Label>
          <Input value={reason} onChange={handleInputChange} placeholder="사유를 입력해주세요" />
        </div>

        <div className="text-right mt-3">
          <Button>등록</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
});

export default CommuteTime;
