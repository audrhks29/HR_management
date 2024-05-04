import { memo } from "react";

import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

const Display = memo(({ personalData }: { personalData: MemberDataTypes | undefined }) => {
  return (
    <CardContent className="mt-5 grid grid-cols-2 gap-3">
      <div className="col-span-2 gap-3">
        <Table className="border">
          <TableBody>
            <TableRow className="cursor-pointer h-[53px] border-r">
              <TableHead className="w-32 text-left  border-r">주소</TableHead>
              <TableCell>
                {personalData?.address.address}&nbsp;
                {personalData?.address.detail_address}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Table className="text-center border">
        <TableBody>
          <TableRow className="cursor-pointer h-[53px]">
            <TableHead className="w-32 text-left border-r">핸드폰 번호</TableHead>
            <TableCell>{personalData?.phone_number}</TableCell>
          </TableRow>

          <TableRow className="cursor-pointer h-[53px]">
            <TableHead className="w-32 text-left border-r">주민등록번호</TableHead>
            <TableCell>
              {personalData?.rrn_front}-{personalData?.rrn_back}
            </TableCell>
          </TableRow>

          <TableRow className="cursor-pointer h-[53px]">
            <TableHead className="w-32 text-left border-r">이메일</TableHead>
            <TableCell>{personalData?.email}</TableCell>
          </TableRow>

          <TableRow className="cursor-pointer h-[53px]">
            <TableHead className="w-32 text-left border-r">병역</TableHead>
            <TableCell>
              {personalData?.military.army}&nbsp;
              {personalData?.military.rank} ({personalData?.military.division})
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table className="text-center border">
        <TableBody>
          <TableRow className="cursor-pointer h-[53px]">
            <TableHead className="w-24 text-left border-r">사원번호</TableHead>
            <TableCell>{personalData?.employee_number}</TableCell>
          </TableRow>

          <TableRow className="cursor-pointer h-[53px]">
            <TableHead className="w-24 text-left border-r">소속 관할</TableHead>
            <TableCell>{personalData?.quarter}</TableCell>
          </TableRow>

          <TableRow className="cursor-pointer h-[53px]">
            <TableHead className="w-24 text-left border-r">소속 부서</TableHead>
            <TableCell>{personalData?.department}</TableCell>
          </TableRow>

          <TableRow className="cursor-pointer h-[53px]">
            <TableHead className="w-24 text-left border-r">소속 팀</TableHead>
            <TableCell>{personalData?.team}</TableCell>
          </TableRow>

          <TableRow className="cursor-pointer h-[53px]">
            <TableHead className="w-24 text-left border-r">직책</TableHead>
            <TableCell>{personalData?.position}</TableCell>
          </TableRow>

          <TableRow className="cursor-pointer h-[53px]">
            <TableHead className="w-24 text-left border-r">직급</TableHead>
            <TableCell>
              <Badge className="text-[14px] items-center justify-center" variant="secondary">
                {personalData?.rank}
              </Badge>
            </TableCell>
          </TableRow>

          <TableRow className="cursor-pointer h-[53px]">
            <TableHead className="w-24 text-left border-r">입사일</TableHead>
            <TableCell>{personalData?.date_of_joining}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  );
});

export default Display;
