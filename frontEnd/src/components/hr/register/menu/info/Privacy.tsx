import React, { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Address from "./Address";
// const Address = React.lazy(() => import('./Address'));

const Privacy = memo(
  ({
    formData,
    setFormData,
    handleChange,
    handleSexChange,
    fullAddress,
    setFullAddress,
  }: {
    formData: MemberDataTypes;
    setFormData: React.Dispatch<React.SetStateAction<MemberDataTypes>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSexChange: (value: string) => void;
    fullAddress: AddressDataTypes;
    setFullAddress: React.Dispatch<React.SetStateAction<AddressDataTypes>>;
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
              <Label htmlFor="kor_name">한글 이름</Label>
              <Input id="kor_name" name="kor_name" value={formData.kor_name} onChange={handleChange} />
            </div>

            {/* 영문 이름 입력 */}
            <div className="space-y-1 w-3/5">
              <Label htmlFor="eng_name">영문 이름</Label>
              <Input id="eng_name" name="eng_name" value={formData.eng_name} onChange={handleChange} />
            </div>
          </div>
          {/* 이메일 입력 */}
          <div className="space-y-1 w-3/5">
            <Label htmlFor="phone_number">이메일</Label>
            <Input id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>

          {/* 핸드폰 번호 입력 */}
          <div className="space-y-1 w-3/5">
            <Label htmlFor="phone_number">
              핸드폰 번호
              <span className="text-[12px]"> ( '-' 를 제외하고 입력)</span>
            </Label>
            <Input id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
          </div>

          {/* 주민등록번호 입력 */}
          <div className="space-y-1">
            <Label htmlFor="rrn">주민등록번호</Label>
            <div className="flex items-center gap-3">
              <Input id="rrn_front" name="rrn_front" value={formData.rrn_front} onChange={handleChange} />
              <span> - </span>
              <Input type="password" id="rrn_back" name="rrn_back" value={formData.rrn_back} onChange={handleChange} />
            </div>
          </div>

          {/* !!! 카카오 주소 가져와야함!!! --> 임시로 대체중 */}

          <Address setFormData={setFormData} fullAddress={fullAddress} setFullAddress={setFullAddress} />

          {/* 성별 체크 */}
          <div className="py-2">
            <Label className="pb-3 block">성별</Label>
            <RadioGroup value={formData.sex} onValueChange={handleSexChange} className="flex items-center space-x-2">
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
