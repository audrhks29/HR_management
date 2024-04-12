import { memo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Edit = memo(() => {
  return (
    <Card className="h-[850px] relative overflow-y-auto">
      <CardHeader>
        <CardTitle>조직도 수정</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="quarter">관할</Label>
          <Input id="quarter" placeholder="관할" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="depart">부서</Label>
          <Input type="depart" placeholder="부서" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="team">팀</Label>
          <Input type="team" placeholder="팀" />
        </div>
      </CardContent>
    </Card>
  );
});

export default Edit;
