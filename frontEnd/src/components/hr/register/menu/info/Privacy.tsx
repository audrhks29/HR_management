import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import Address from "./Address";

const Privacy = ({
  register,
  setValue,
  errors,
}: {
  register: UseFormRegister<MemberRegistrationFormTypes>;
  setValue: UseFormSetValue<MemberRegistrationFormTypes>;
  errors: FieldErrors<MemberRegistrationFormTypes>;
}) => {
  return (
    <Card className="p-8">
      <CardHeader>
        <CardTitle>개인정보</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex gap-2">
          {/* 한글 이름 입력 */}
          <div className="space-y-1 w-3/5">
            <Label htmlFor="employeeData.kor_name">한글 이름</Label>
            <Input
              id="employeeData.kor_name"
              {...register(`employeeData.kor_name`, {
                required: "한글 이름을 입력해주세요",
                maxLength: { value: 8, message: "8글자 미만으로 입력해주세요" },
              })}
            />

            <ErrorMessage
              errors={errors}
              name="employeeData.kor_name"
              render={({ message }) => <p className="text-destructive font-bold text-[12px]">{message}</p>}
            />
          </div>

          {/* 영문 이름 입력 */}
          <div className="space-y-1 w-3/5">
            <Label htmlFor="employeeData.eng_name">영문 이름</Label>
            <Input
              id={`employeeData.eng_name`}
              {...register(`employeeData.eng_name`, {
                maxLength: { value: 20, message: "20글자 미만으로 입력해주세요" },
              })}
            />
          </div>
        </div>

        {/* 이메일 입력 */}
        <div className="space-y-1 w-3/5">
          <Label htmlFor="employeeData.email">이메일</Label>
          <Input
            type="email"
            id={`employeeData.email`}
            {...register(`employeeData.email`, {
              pattern: {
                value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "올바른 이메일을 작성해주세요",
              },
            })}
          />

          <ErrorMessage
            errors={errors}
            name="employeeData.email"
            render={({ message }) => <p className="text-destructive font-bold text-[12px]">{message}</p>}
          />
        </div>

        {/* 핸드폰 번호 입력 */}
        <div className="space-y-1 w-3/5">
          <Label htmlFor="employeeData.phone_number">
            핸드폰 번호
            <span className="text-[12px]"> ( '-' 를 제외하고 입력)</span>
          </Label>
          <Input
            id={`employeeData.phone_number`}
            {...register(`employeeData.phone_number`, {
              required: "핸드폰 번호를 입력해주세요",
              pattern: {
                value: /^\d+$/,
                message: "숫자로만 입력해주세요",
              },
              minLength: {
                value: 10,
                message: "핸드폰 번호는 10 ~ 11자리 입니다.",
              },
              maxLength: {
                value: 11,
                message: "핸드폰 번호는 10 ~ 11자리 입니다.",
              },
            })}
          />

          <ErrorMessage
            errors={errors}
            name="employeeData.phone_number"
            render={({ message }) => <p className="text-destructive font-bold text-[12px]">{message}</p>}
          />
        </div>

        {/* 주민등록번호 입력 */}
        <div className="space-y-1">
          <Label htmlFor="employeeData.rrn_front">주민등록번호</Label>
          <div className="flex items-center gap-3">
            <Input
              id={`employeeData.rrn_front`}
              {...register(`employeeData.rrn_front`, {
                required: "주민등록번호 앞자리를 입력해주세요",
                minLength: {
                  value: 6,
                  message: "주민등록번호 앞자리는 6자리 입니다.",
                },
                maxLength: {
                  value: 6,
                  message: "주민등록번호 앞자리는 6자리 입니다.",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "숫자로만 입력해주세요",
                },
              })}
            />

            <span> - </span>
            <Input
              type="password"
              id={`employeeData.rrn_back`}
              {...register("employeeData.rrn_back", {
                required: "주민등록번호 뒷자리를 입력해주세요",
                minLength: {
                  value: 7,
                  message: "주민등록번호 뒷자리는 7자리 입니다.",
                },
                maxLength: {
                  value: 7,
                  message: "주민등록번호 뒷자리는 7자리 입니다.",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "숫자로만 입력해주세요",
                },
              })}
            />
          </div>

          <ErrorMessage
            errors={errors}
            name="employeeData.rrn_front"
            render={({ message }) => <p className="text-destructive font-bold text-[12px]">{message}</p>}
          />

          <ErrorMessage
            errors={errors}
            name="employeeData.rrn_back"
            render={({ message }) => <p className="text-destructive font-bold text-[12px]">{message}</p>}
          />
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

        <div className="grid grid-cols-3 gap-6">
          <div>
            <Select
              onValueChange={value => {
                setValue(`employeeData.military.division`, value);
              }}>
              <Label>병역 구분</Label>
              <SelectTrigger>
                <SelectValue placeholder="병역 구분" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="군필">군필</SelectItem>
                  <SelectItem value="미필">미필</SelectItem>
                  <SelectItem value="해당없음">해당없음</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              onValueChange={value => {
                setValue(`employeeData.military.army`, value);
              }}>
              <Label>군 구분</Label>
              <SelectTrigger>
                <SelectValue placeholder="군 구분" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="육군">육군</SelectItem>
                  <SelectItem value="해군">해군</SelectItem>
                  <SelectItem value="공군">공군</SelectItem>
                  <SelectItem value="해병대">해병대</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              onValueChange={value => {
                setValue(`employeeData.military.rank`, value);
              }}>
              <Label>군 계급</Label>
              <SelectTrigger>
                <SelectValue placeholder="군 계급" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="대령">대령</SelectItem>
                  <SelectItem value="중령">중령</SelectItem>
                  <SelectItem value="소령">소령</SelectItem>
                  <SelectItem value="대위">대위</SelectItem>
                  <SelectItem value="중위">중위</SelectItem>
                  <SelectItem value="소위">소위</SelectItem>
                  <SelectItem value="상사">상사</SelectItem>
                  <SelectItem value="중사">중사</SelectItem>
                  <SelectItem value="하사">하사</SelectItem>
                  <SelectItem value="병장">병장</SelectItem>
                  <SelectItem value="상병">상병</SelectItem>
                  <SelectItem value="일병">일병</SelectItem>
                  <SelectItem value="이병">이병</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Privacy;
