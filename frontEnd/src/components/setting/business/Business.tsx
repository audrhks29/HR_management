import { memo } from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Business = memo(({ data }: { data: BusinessSettingTypes }) => {
  return (
    <Card className="p-8">
      <CardTitle className="pb-3">회사정보</CardTitle>
      <Separator />
      <CardContent className="py-3">
        <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
          <Button variant="outline">상호</Button>
          <Input type="text" value={data.name_of_company} />
        </div>

        <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
          <Button variant="outline">사업장주소</Button>
          <Input type="text" value={data.business_address} />
        </div>

        <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
          <Button variant="outline">사업자등록번호</Button>
          <Input type="text" value={data.resident_registration_number} />
        </div>

        <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
          <Button variant="outline">법인등록번호</Button>
          <Input type="text" value={data.business_registration_number} />
        </div>

        <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
          <Button variant="outline">개업일</Button>
          <Input type="text" value={data.date_of_business_commencement} />
        </div>

        <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
          <Button variant="outline">사업장 대표번호</Button>
          <Input type="text" value={data.main_number} />
        </div>

        <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
          <Button variant="outline">사업자 대표</Button>
          <Input type="text" value={data.name_of_representative} />
        </div>

        <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
          <Button variant="outline">업종</Button>
          <Input type="text" value={data.type_of_business} />
        </div>
      </CardContent>
    </Card>
  );
});

export default Business;
