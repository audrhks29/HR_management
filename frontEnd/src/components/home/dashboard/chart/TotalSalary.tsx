import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon } from "lucide-react";
import { memo } from "react";

const TotalSalary = memo(() => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[20px] flex items-center">
          <DollarSignIcon className="mr-3" />
          <span>월별 직원 급여</span>
        </CardTitle>
      </CardHeader>
      <CardContent>차트 영역</CardContent>
    </Card>
  );
});

export default TotalSalary;
