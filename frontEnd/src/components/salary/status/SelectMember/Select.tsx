import React, { memo, useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useParams } from "react-router-dom";
import PersonalTitle from "@/shared/PersonalTitle";

const Select = memo(
  ({
    personalData,
    memberSalaryPersonalData,
  }: {
    personalData: MemberDataTypes;
    memberSalaryPersonalData: MemberSalaryDataTypes;
  }) => {
    return (
      <Card className="h-[850px] p-8 overflow-y-auto">
        <PersonalTitle personalData={personalData} />
        <CardContent className="mt-5">
          <Table className="text-right text-[12px]">
            <TableHeader className="text-[14px] text-center">
              <TableRow className="h-[53px] hover:bg-muted cursor-default">
                <TableHead className="p-2 w-[100px]">협상월</TableHead>
                <TableHead className="p-2 w-[100px]">기본연봉</TableHead>
                <TableHead className="p-2 w-[100px]">기본급여</TableHead>
                <TableHead className="p-2 w-[100px]">인상율</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {memberSalaryPersonalData?.data.map(item => (
                <TableRow className="cursor-pointer h-[53px] bg-primary-foreground">
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.month}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  },
);

export default Select;
