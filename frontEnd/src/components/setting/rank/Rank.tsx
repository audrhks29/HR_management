import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { memo } from "react";

const Rank = memo(({ data }: { data: RankSettingTypes[] }) => {
  return (
    <Card className="p-8">
      <CardTitle className="pb-3">직급</CardTitle>
      <Separator />
      <CardContent className="py-3">
        {data.map(rank => (
          <div key={rank.order} className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
            <Button variant="outline">{rank.order}</Button>
            <Input type="text" value={rank.value} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
});

export default Rank;
