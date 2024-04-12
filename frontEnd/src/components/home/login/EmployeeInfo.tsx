import { memo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Mail, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import CommuteTime from "./CommuteTime";
import { Separator } from "@/components/ui/separator";

import { getMemberData } from "@/server/fetchReadData";

const EmployeeInfo = memo(() => {
  const { data: memberData }: { data: MemberDataTypes[] } = useSuspenseQuery({
    queryKey: ["memberData"],
    queryFn: getMemberData,
  });

  const loggedInUserData = memberData.find(member => member.employee_number === "160301");

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
              <div className="flex">
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
        <CardContent className="mt-6 flex items-center justify-around">
          <Mail />
          <Settings />
        </CardContent>
        <Separator />
        <CardContent className="p-6 m-0 text-[14px]">
          <CardTitle className="text-[16px] pb-3">
            <span>연차 내역</span>
          </CardTitle>
          <Separator />
          <div className="grid gap-3 grid-cols-2 pt-3 text-muted-foreground">
            <p>연차 수</p>
            <p className="text-right">15일</p>
            <p>남은 연차 수</p>
            <p className="text-right">6일</p>
          </div>
        </CardContent>
        <Separator />
        <CardContent className="p-6 m-0">
          <CommuteTime />
        </CardContent>
      </CardContent>
    </Card>
  );
});

export default EmployeeInfo;
