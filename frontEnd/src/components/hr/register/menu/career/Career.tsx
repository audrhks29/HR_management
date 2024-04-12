import { memo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import CareerTable from "./Table/CareerTable";

const Career = memo(
  ({
    formData,
    careerData,
    setCareerData,
    handleClickCareerPlusButton,
  }: {
    formData: MemberDataTypes;
    careerData: CareerDataTypes;
    setCareerData: React.Dispatch<React.SetStateAction<CareerDataTypes>>;
    handleClickCareerPlusButton: (name: string, data: CareerDataTypes) => void;
  }) => {
    const [joinDate, setJoinDate] = useState<Date | undefined>(new Date());
    const [leaveDate, setLeaveDate] = useState<Date | undefined>(new Date());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCareerData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSelectDate = (name: string, value: Date | undefined) => {
      if (value) {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formatData = `${year}년 ${month}월 ${day}일`;

        setCareerData(prevData => ({
          ...prevData,
          [name]: formatData,
        }));
      }
    };

    return (
      <Card className="w-full p-8">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>경력</span>
            <Button onClick={() => handleClickCareerPlusButton("career", careerData)}>
              <Plus className="w-3 h-3" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-6">
            {/* 회사명 */}
            <div className="space-y-1">
              <Label htmlFor="company_name">회사명</Label>
              <Input id="company_name" name="company_name" value={careerData.company_name} onChange={handleChange} />
            </div>

            {/* 입사일 */}
            <div className="grid grid-cols-[1fr_1fr] gap-6">
              <div className="flex flex-col justify-between">
                <Label className="mt-1">입사일</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !joinDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {joinDate ? format(joinDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={joinDate}
                      onSelect={value => {
                        setJoinDate(value);
                        handleSelectDate("join_date", value);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* 퇴사일 */}
              <div className="flex flex-col justify-between">
                <Label className="mt-1">퇴사일</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !leaveDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {leaveDate ? format(leaveDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={leaveDate}
                      onSelect={value => {
                        setLeaveDate(value);
                        handleSelectDate("leave_date", value);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* 직무 */}
            <div className="space-y-1">
              <Label htmlFor="job">직무</Label>
              <Input id="job" name="job" value={careerData.job} onChange={handleChange} />
            </div>

            {/* 근무부서 */}
            <div className="space-y-1">
              <Label htmlFor="depart">근무부서</Label>
              <Input id="depart" name="depart" value={careerData.depart} onChange={handleChange} />
            </div>

            {/* 직급 */}
            <div className="space-y-1">
              <Label htmlFor="rank">직급</Label>
              <Input id="rank" name="rank" value={careerData.rank} onChange={handleChange} />
            </div>
          </div>

          {formData.career.length > 0 && <CareerTable formData={formData} />}
        </CardContent>
      </Card>
    );
  },
);

export default Career;
