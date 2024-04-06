import { memo, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

const Career = memo(() => {
  const [joinDate, setJoinDate] = useState<Date | undefined>(new Date())
  const [leaveDate, setLeaveDate] = useState<Date | undefined>(new Date())

  return (
    <Card className='w-full p-8'>
      <CardHeader>
        <CardTitle>경력</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">

        <div className='grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-6'>

          {/* 회사명 */}
          <div className="space-y-1">
            <Label htmlFor="company_name">회사명</Label>
            <Input id="company_name" />
          </div>

          {/* 입사일 */}
          <div className='grid grid-cols-[1fr_1fr] gap-6'>
            <div className='flex flex-col justify-between'>
              <Label className='mt-1'>입사일</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !joinDate && "text-muted-foreground"
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
                    onSelect={setJoinDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* 퇴사일 */}
            <div className='flex flex-col justify-between'>
              <Label className='mt-1'>퇴사일</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !leaveDate && "text-muted-foreground"
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
                    onSelect={setLeaveDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* 직무 */}
          <div className="space-y-1">
            <Label htmlFor="job">직무</Label>
            <Input id="job" />
          </div>

          {/* 근무부서 */}
          <div className="space-y-1">
            <Label htmlFor="depart">근무부서</Label>
            <Input id="depart" />
          </div>

          {/* 직급 */}
          <div className="space-y-1">
            <Label htmlFor="rank">직급</Label>
            <Input id="rank" />
          </div>
        </div>

      </CardContent >
    </Card >
  );
});

export default Career;