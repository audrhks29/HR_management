import { memo, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

const Education = memo(() => {
  const [admission_date, setAdmission_date] = useState<Date | undefined>(new Date())
  const [graduation_date, setGraduation_date] = useState<Date | undefined>(new Date())

  const [eduData, setEduData] = useState({
    school_classification: "",
    school_name: "",
    collage: "",
    graduation_status: "",
    admission_date: "",
    graduation_date: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEduData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeSelect = (name: string, value: string) => {
    setEduData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSelectDate = (name: string, value: Date | undefined) => {
    if (value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formatData = `${year}년 ${month}월 ${day}일`;

      setEduData((prevData) => ({
        ...prevData,
        [name]: formatData
      }));
    }
  };

  return (
    <Card className='w-full p-8'>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          <span>학력</span>
          <Button><Plus className='w-3 h-3' /></Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">

        <div className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-6'>

          {/* 졸업구분 */}
          <div className='space-y-1'>
            <Select
              value={eduData.school_classification}
              onValueChange={(value) => handleChangeSelect('school_classification', value)}>
              <Label>졸업 구분</Label>
              <SelectTrigger>
                <SelectValue placeholder="졸업 구분" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="초등학교">초등학교</SelectItem>
                  <SelectItem value="중학교">중학교</SelectItem>
                  <SelectItem value="고등학교">고등학교</SelectItem>
                  <SelectItem value="대학교">대학교</SelectItem>
                  <SelectItem value="대학원">대학원</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* 학교명 */}
          <div className="space-y-1">
            <Label htmlFor="school_name">학교명</Label>
            <Input
              id="school_name"
              name="school_name"
              value={eduData.school_name}
              onChange={handleChange} />
          </div>

          {/* 학과 */}
          <div className="space-y-1">
            <Label htmlFor="collage">학과</Label>
            <Input
              id="collage"
              name="collage"
              value={eduData.collage}
              onChange={handleChange} />
          </div>

          {/* 졸업 여부 */}
          <div className='space-y-1'>
            <Select
              value={eduData.graduation_status}
              onValueChange={(value) => handleChangeSelect("graduation_status", value)}>
              <Label>졸업 여부</Label>
              <SelectTrigger>
                <SelectValue placeholder="졸업 여부" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="졸업">졸업</SelectItem>
                  <SelectItem value="재학중">재학중</SelectItem>
                  <SelectItem value="휴학중">휴학중</SelectItem>
                  <SelectItem value="중퇴">중퇴</SelectItem>
                  <SelectItem value="자퇴">자퇴</SelectItem>
                  <SelectItem value="졸업예정">졸업예정</SelectItem>
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
                      !admission_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {admission_date ? format(admission_date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={admission_date}
                    onSelect={(value) => {
                      setAdmission_date(value)
                      handleSelectDate("admission_date", value)
                    }}
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
                      !graduation_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {graduation_date ? format(graduation_date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={graduation_date}
                    onSelect={(value) => {
                      setGraduation_date(value)
                      handleSelectDate("graduation_date", value)
                    }}
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