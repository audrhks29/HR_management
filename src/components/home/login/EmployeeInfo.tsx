import { memo } from 'react';

import { Mail, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import memberData from '@/assets/sampleData/memberData.json'
import { Button } from '@/components/ui/button';

const EmployeeInfo = memo(() => {
  const loggedInUserData = memberData.find(member => member.employee_number === "160301")

  return (
    <Card className="w-fit">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid grid-cols2 gap-0.5">
          <CardTitle className="group flex items-center text-lg">
            <ul className="text-[14px] mr-10 w-[120px]">
              <li className="flex items-center h-5">
                <div className="mr-3">관할</div>
                <div className="text-left font-thin">{loggedInUserData?.quarter}</div>
              </li>
              <li className="flex items-center h-5">
                <div className="mr-3">부서</div>
                <div className="text-left font-thin">{loggedInUserData?.department}</div>
              </li>
              <li className="flex items-center h-5">
                <div className="mr-3">팀</div>
                <div className="text-left font-thin">{loggedInUserData?.team}</div>
              </li>
              <li className="flex items-center h-5">
                <div className="mr-3">직책</div>
                <div className="text-left font-thin">{loggedInUserData?.position}</div>
              </li>
            </ul>
            <div className="w-[150px] h-20 flex flex-col justify-between">
              <div className='flex'>
                <Badge className="text-xs mr-3" variant="secondary">
                  {loggedInUserData?.rank}
                </Badge>
                <span>{loggedInUserData?.kor_name}</span>
              </div>
              <Button>로그아웃</Button>
            </div>
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <CardContent className='mt-6 flex items-center justify-around'>
          <Mail />
          <Settings />
        </CardContent>
        <CardContent className='p-0 m-0 bg-muted/50'>
          dd
        </CardContent>
      </CardContent>
    </Card>
  );
});

export default EmployeeInfo;