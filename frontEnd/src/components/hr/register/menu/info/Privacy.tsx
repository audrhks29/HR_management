import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Address from "./Address";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

const Privacy = memo(
  ({
    register,
    setValue,
  }: {
    register: UseFormRegister<MemberRegistrationFormValues>;
    setValue: UseFormSetValue<MemberRegistrationFormValues>;
  }) => {
    return (
      <Card className="h-[700px] p-8">
        <CardHeader>
          <CardTitle>개인정보</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex gap-2">
            {/* 한글 이름 입력 */}
            <div className="space-y-1 w-3/5">
              <Label htmlFor="employeeData.kor_name">한글 이름</Label>
              <Input id="employeeData.kor_name" {...register(`employeeData.kor_name`)} />
            </div>

            {/* 영문 이름 입력 */}
            <div className="space-y-1 w-3/5">
              <Label htmlFor="eng_name">영문 이름</Label>
              <Input id="eng_name" {...register(`employeeData.eng_name`)} />
            </div>
          </div>
          {/* 이메일 입력 */}
          <div className="space-y-1 w-3/5">
            <Label htmlFor="phone_number">이메일</Label>
            <Input id="email" {...register(`employeeData.email`)} />
          </div>

          {/* 핸드폰 번호 입력 */}
          <div className="space-y-1 w-3/5">
            <Label htmlFor="phone_number">
              핸드폰 번호
              <span className="text-[12px]"> ( '-' 를 제외하고 입력)</span>
            </Label>
            <Input id="phone_number" {...register(`employeeData.phone_number`)} />
          </div>

          {/* 주민등록번호 입력 */}
          <div className="space-y-1">
            <Label htmlFor="rrn">주민등록번호</Label>
            <div className="flex items-center gap-3">
              <Input id="rrn_front" {...register(`employeeData.rrn_front`)} />
              <span> - </span>
              <Input type="password" id="rrn_back" {...register(`employeeData.rrn_back`)} />
            </div>
          </div>

          <Address register={register} setValue={setValue} />

          {/* 성별 체크 */}
          <div className="py-2">
            <Label className="pb-3 block">성별</Label>
            <RadioGroup
              defaultValue="남성"
              className="flex items-center space-x-2"
              onValueChange={value => setValue(`employeeData.sex`, value)}>
              <RadioGroupItem value="남성" id="male" />
              <Label htmlFor="male">남성</Label>

              <RadioGroupItem value="여성" id="female" />
              <Label htmlFor="female">여성</Label>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    );
  },
);

export default Privacy;
