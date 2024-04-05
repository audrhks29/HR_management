import { memo, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

const Education = memo(() => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card className='w-full p-8'>
      <CardHeader>
        <CardTitle>학력</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">

        <div className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-6'>

          {/* 졸업구분 */}
          <div className='space-y-1'>
            <Select>
              <Label>졸업 구분</Label>
              <SelectTrigger>
                <SelectValue placeholder="졸업 구분" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="primary_school">초등학교</SelectItem>
                  <SelectItem value="middle_school">중학교</SelectItem>
                  <SelectItem value="high_school">고등학교</SelectItem>
                  <SelectItem value="university">대학교</SelectItem>
                  <SelectItem value="graduate_school">대학교</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* 학교명 */}
          <div className="space-y-1">
            <Label htmlFor="school_name">학교명</Label>
            <Input id="school_name" />
          </div>

          {/* 학과 */}
          <div className="space-y-1">
            <Label htmlFor="collage">학과</Label>
            <Input id="collage" />
          </div>

          {/* 졸업 여부 */}
          <div className='space-y-1'>
            <Select>
              <Label>졸업 여부</Label>
              <SelectTrigger>
                <SelectValue placeholder="졸업 여부" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="primary_school">졸업</SelectItem>
                  <SelectItem value="middle_school">재학중</SelectItem>
                  <SelectItem value="high_school">휴학중</SelectItem>
                  <SelectItem value="university">중퇴</SelectItem>
                  <SelectItem value="university">자퇴</SelectItem>
                  <SelectItem value="university">졸업예정</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* 입학일 */}
          <div className='grid grid-cols-[1fr_1fr] gap-6'>
            <div className='flex flex-col justify-between'>
              <Label className='mt-1'>입학일</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* 졸업일 */}
            <div className='flex flex-col justify-between'>
              <Label className='mt-1'>졸업일</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>


      </CardContent >
    </Card >
  );
});

export default Education;