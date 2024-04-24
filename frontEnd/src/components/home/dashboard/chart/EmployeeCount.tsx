import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { memo } from "react";

const EmployeeCount = memo(() => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[20px] flex items-center">
          <User className="mr-3" />
          <span>월별 직원 수</span>
        </CardTitle>
      </CardHeader>
      <CardContent>차트 영역</CardContent>
    </Card>
  );
});

export default EmployeeCount;
