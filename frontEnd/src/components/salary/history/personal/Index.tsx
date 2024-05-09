import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMemberPersonalData, getSalaryPersonalData } from "@/server/fetchReadData";
import PersonalTitle from "@/shared/PersonalTitle";
import { useSuspenseQueries } from "@tanstack/react-query";
import { memo } from "react";
import { useParams } from "react-router-dom";

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [QueryResult<SalaryPersonalDataTypes>, QueryResult<MemberDataTypes>];

const Index = memo(() => {
  const { employee_number, year, month } = useParams();

  const [{ data: salaryPersonalData }, { data: memberPersonalData }] = useSuspenseQueries<SuspenseQueriesResult>({
    queries: [
      {
        queryKey: [`salaryPersonalData/${employee_number}`],
        queryFn: () => getSalaryPersonalData(employee_number, year, month),
      },
      {
        queryKey: [`memberPersonalData/${employee_number}`],
        queryFn: () => getMemberPersonalData(employee_number),
      },
    ],
  });

  const {
    salary,
    annual_leave_allowance,
    bonus,
    meals,
    night_work_allowance,
    overtime_pay,
    saturday_work_allowance,
    tax,
  } = salaryPersonalData;

  const {
    employment_insurance,
    health_tax,
    income_tax,
    long_term_care_insurance,
    national_pension,
    resident_tax,
    year_end_tax_settlement,
  } = tax;

  const salarySum =
    salary + annual_leave_allowance + bonus + meals + night_work_allowance + overtime_pay + saturday_work_allowance;

  const taxSum =
    employment_insurance +
    health_tax +
    income_tax +
    long_term_care_insurance +
    national_pension +
    resident_tax +
    year_end_tax_settlement;

  return (
    <ScrollArea className="h-[780px]">
      <Card className="min-h-[700px]">
        <PersonalTitle personalData={memberPersonalData} children={undefined} />
        <CardContent className="py-4">
          <CardTitle className="text-center">
            {year}년 {month}월 급여명세서
          </CardTitle>
          <Table className="text-center my-6">
            <TableHeader className="bg-primary-foreground">
              <TableRow>
                <TableHead>지급합계</TableHead>
                <TableHead>공제합계</TableHead>
                <TableHead>실수령액</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>{salarySum.toLocaleString()}원</TableCell>
                <TableCell>{taxSum.toLocaleString()}원</TableCell>
                <TableCell>{`${(salarySum - taxSum).toLocaleString()}`}원</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Separator className="bg-white" />

          <h3 className="my-3">근태내역</h3>
          <Table className="text-center mb-3">
            <TableHeader className="bg-primary-foreground">
              <TableRow>
                <TableHead>근무일수</TableHead>
                <TableHead>연차일수</TableHead>
                <TableHead>결근일수</TableHead>
                <TableHead>연장근로시간</TableHead>
                <TableHead>야간근로시간</TableHead>
                <TableHead>휴일근로시간</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>0일</TableCell>
                <TableCell>0일</TableCell>
                <TableCell>0일</TableCell>
                <TableCell>0시간</TableCell>
                <TableCell>0시간</TableCell>
                <TableCell>0시간</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h3 className="my-3">급여내역</h3>
          <Table className="text-center mb-3">
            <TableHeader className="bg-primary-foreground">
              <TableRow>
                <TableHead>기본급</TableHead>
                <TableHead>직무수당</TableHead>
                <TableHead>연장근로수당</TableHead>
                <TableHead>성과금</TableHead>
                <TableHead>휴일근로시간</TableHead>
                <TableHead>야간근로시간</TableHead>
                <TableHead>연차수당</TableHead>
                <TableHead>식대</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>{salary.toLocaleString()}원</TableCell>
                <TableCell>0원</TableCell>
                <TableCell>{overtime_pay.toLocaleString()}원</TableCell>
                <TableCell>{bonus.toLocaleString()}원</TableCell>
                <TableCell>{saturday_work_allowance.toLocaleString()}원</TableCell>
                <TableCell>{night_work_allowance.toLocaleString()}원</TableCell>
                <TableCell>{annual_leave_allowance.toLocaleString()}원</TableCell>
                <TableCell>{meals.toLocaleString()}원</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h3 className="my-3">공제내역</h3>
          <Table className="text-center mb-3">
            <TableHeader className="bg-primary-foreground">
              <TableRow>
                <TableHead>소득세</TableHead>
                <TableHead>주민세</TableHead>
                <TableHead>건강보험</TableHead>
                <TableHead>요양보험</TableHead>
                <TableHead>국민연금</TableHead>
                <TableHead>고용보험</TableHead>
                <TableHead>연말정산</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>{income_tax.toLocaleString()}원</TableCell>
                <TableCell>{resident_tax.toLocaleString()}원</TableCell>
                <TableCell>{health_tax.toLocaleString()}원</TableCell>
                <TableCell>{long_term_care_insurance.toLocaleString()}원</TableCell>
                <TableCell>{national_pension.toLocaleString()}원</TableCell>
                <TableCell>{employment_insurance.toLocaleString()}원</TableCell>
                <TableCell>{year_end_tax_settlement.toLocaleString()}원</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </ScrollArea>
  );
});

export default Index;
