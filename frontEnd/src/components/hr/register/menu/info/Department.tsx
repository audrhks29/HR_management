import { memo, useState } from 'react';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getRankData } from '@/server/fetchReadData';

const Department = memo(({ formData, handleChange, handleChangeSelect }: {
  formData: MemberDataTypes;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelect: (name: string, value: string) => void;
}) => {
  const { data: rankData }: { data: RankDataTypes[] } = useSuspenseQuery({
    queryKey: ["rankData"],
    queryFn: getRankData,
  });

  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className='min-h-[700px] p-8'>
      <CardHeader>
        <CardTitle>부서정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">

        {/* 사원번호 입력 */}
        <div className="space-y-1 w-3/5">
          <Label htmlFor="employee_number">사원번호</Label>
          <Input
            id="employee_number"
            name="employee_number"
            value={formData.employee_number}
            onChange={handleChange} />
        </div>

        {/* 소속 관할, 부서, 팀  */}
        <div className="space-y-1 grid grid-cols-3 gap-4">
          <div>
            <Select>
              <Label>소속 관할</Label>
              <SelectTrigger>
                <SelectValue placeholder="소속 관할" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="quarter1">본사</SelectItem>
                  <SelectItem value="quarter2">인천지사</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select>
              <Label>소속 부서</Label>
              <SelectTrigger>
                <SelectValue placeholder="소속 부서" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="depart1">경영지원부</SelectItem>
                  <SelectItem value="depart2">개발부</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select>
              <Label>소속 팀</Label>
              <SelectTrigger>
                <SelectValue placeholder="소속 팀" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="team1">00팀</SelectItem>
                  <SelectItem value="team2">00팀</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 직책, 직급 */}
        <div className="space-y-1 grid grid-cols-3 gap-4">
          <div>
            <Select>
              <Label>직책</Label>
              <SelectTrigger>
                <SelectValue placeholder="직책" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="00부장">00부장</SelectItem>
                  <SelectItem value="00팀장">00팀장</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={formData.rank}
              onValueChange={(value) => handleChangeSelect("rank", value)}>
              <Label>직급</Label>
              <SelectTrigger>
                <SelectValue placeholder="직급" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {rankData.map(rank => (
                    <SelectItem
                      key={rank.id}
                      value={rank.rank}>{rank.rank}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 입사일자 */}
        <div>
          <Label>입사일자</Label>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}>
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

      </CardContent>
    </Card>
  );
});

export default Department;