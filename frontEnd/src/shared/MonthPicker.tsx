import { memo, useState } from "react";
import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const MonthPicker = memo(
  ({
    isMonthPicker,
    setIsMonthPicker,
    selectedMonth,
    setSelectedMonth,
    className,
  }: {
    isMonthPicker: boolean;
    setIsMonthPicker: React.Dispatch<React.SetStateAction<boolean>>;
    selectedMonth: {
      year: string;
      month: string;
    };
    setSelectedMonth: React.Dispatch<
      React.SetStateAction<{
        year: string;
        month: string;
      }>
    >;
    className: string | undefined;
  }) => {
    const [year, setYear] = useState(selectedMonth.year);
    const [month, setMonth] = useState(selectedMonth.month);

    const handleButtonClick = () => {
      setSelectedMonth({ year, month });
      setIsMonthPicker(false);
    };

    const monthArray = Array.from({ length: 12 }, (_, index) => (index + 1 < 10 ? `0${index + 1}` : `${index + 1}`));

    return (
      <div className={cn("absolute top-8 right-1/2 translate-x-1/2 z-10", className)}>
        <Button variant="outline" onClick={() => setIsMonthPicker(!isMonthPicker)}>
          <Calendar className="mr-3" />
          {selectedMonth.year}년 {selectedMonth.month}월
        </Button>

        {isMonthPicker && (
          <Card className="w-[500px] pt-6 absolute top-12 right-1/2 translate-x-1/2">
            <CardContent className="text-center grid grid-cols-2 gap-6">
              <Select value={year} onValueChange={value => setYear(value)}>
                <SelectTrigger>
                  <SelectValue placeholder={`${selectedMonth.year}년`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="2024">2024년</SelectItem>
                    <SelectItem value="2023">2023년</SelectItem>
                    <SelectItem value="2022">2022년</SelectItem>
                    <SelectItem value="2021">2021년</SelectItem>
                    <SelectItem value="2020">2020년</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={month} onValueChange={value => setMonth(value)}>
                <SelectTrigger>
                  <SelectValue placeholder={`${selectedMonth.month}월`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {monthArray.map((month, index) => {
                      return (
                        <SelectItem key={index} value={month}>
                          {month}월
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button className="col-span-2 w-[150px] m-auto" onClick={handleButtonClick}>
                조회
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  },
);

export default MonthPicker;
