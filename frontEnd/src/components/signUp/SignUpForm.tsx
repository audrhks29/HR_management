import { memo, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { userSignUp } from "@/server/fetchUserData";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const SignUpForm = memo(() => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignDataTypes>({
    defaultValues: {
      user: {
        user_id: "",
        user_password: "",
        user_password_confirm: "",
      },
      business: {
        name_of_company: "",
        business_address: "",
        business_registration_number: "",
        resident_registration_number: "",
        date_of_business_commencement: "",
        main_number: "",
        name_of_representative: "",
        type_of_business: "",
      },
    },
  });

  const onSubmit = async (data: SignDataTypes) => {
    toast({
      title: "회원가입",
      description: "회원가입을 완료하시겠습니까?",
      action: (
        <>
          <ToastAction
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            onClick={() => submitData(data)}
            altText="확인">
            확인
          </ToastAction>
          <ToastAction className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" altText="취소">
            취소
          </ToastAction>
        </>
      ),
    });
  };

  const submitData = async (data: SignDataTypes) => {
    await userSignUp(data);
    toast({
      description: "회원가입이 완료되었습니다.",
    });
    navigate("/");
  };

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch(`user.user_password`);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-[550px] text-center p-8 relative">
        <div className="absolute top-0 left-0">
          <Button type="button" onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-3 h-3" />
          </Button>
        </div>

        <CardHeader>
          <CardTitle>회원가입</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[600px]">
          <CardTitle className="text-lg text-left py-1">가입자 정보</CardTitle>
          <Separator />
          <CardContent className="w-[450px] grid gap-2 p-6">
            <div className="text-left grid grid-cols-[110px_1fr_80px] grid-rows-[1fr_auto] gap-x-2 gap-y-1 items-center">
              <Label htmlFor="user.user_id">아이디</Label>
              <Input
                id="user.user_id"
                type="text"
                {...register("user.user_id", {
                  required: "아이디를 입력해주세요",
                  maxLength: { value: 20, message: "20글자 내로 입력해주세요" },
                })}
                placeholder="20자 내로 입력해주세요"
              />
              <Button type="button">중복확인</Button>

              <ErrorMessage
                errors={errors}
                name={`user.user_id`}
                render={({ message }) => (
                  <div className="text-destructive font-bold text-[12px] col-span-2 col-start-2">{message}</div>
                )}
              />
            </div>

            <div className="text-left grid grid-cols-[110px_1fr_80px] grid-rows-[1fr_auto] gap-x-2 gap-y-1 items-center">
              <Label htmlFor="user.user_password">비밀번호</Label>
              <Input
                id="user.user_password"
                {...register("user.user_password", {
                  required: "비밀번호를 입력해주세요",
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/,
                    message: "영문 숫자 조합이 포함되게 입력해주세요",
                  },
                  minLength: { value: 8, message: "8글자 이상으로 입력해주세요." },
                  maxLength: { value: 20, message: "20글자 내로 입력해주세요." },
                })}
                type="password"
                placeholder="20글자 내로 입력해주세요"
              />

              <ErrorMessage
                errors={errors}
                name={`user.user_password`}
                render={({ message }) => (
                  <div className="text-destructive font-bold text-[12px] col-span-2 col-start-2">{message}</div>
                )}
              />
            </div>

            <div className="text-left grid grid-cols-[110px_1fr_80px] grid-rows-[1fr_auto] gap-x-2 gap-y-1 items-center">
              <Label htmlFor="user.user_password_confirm">비밀번호 확인</Label>
              <Input
                id="user.user_password_confirm"
                {...register("user.user_password_confirm", {
                  required: "비밀번호를 확인해주세요.",
                  validate: value => value === passwordRef.current,
                })}
                type="password"
              />

              {errors?.user?.user_password_confirm?.type === "required" && (
                <div className="text-destructive font-bold text-[12px] col-span-2 col-start-2">
                  비밀번호를 확인해주세요.
                </div>
              )}

              {errors?.user?.user_password_confirm?.type === "validate" && (
                <div className="text-destructive font-bold text-[12px] col-span-2 col-start-2">
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
            </div>
          </CardContent>

          <CardTitle className="text-lg text-left py-1">회사 정보</CardTitle>
          <Separator />
          <CardContent className="w-[450px] grid gap-2 p-6">
            <div className="text-left grid grid-cols-[110px_1fr] grid-rows-[1fr_auto] gap-x-2 gap-y-1 items-center">
              <Label htmlFor="business.name_of_company">상호</Label>
              <Input
                id="business.name_of_company"
                type="text"
                {...register("business.name_of_company", {
                  required: "상호를 입력해주세요",
                  maxLength: {
                    value: 20,
                    message: "20글자 내로 입력해주세요",
                  },
                })}
                placeholder="20글자 내로 입력해주세요"
              />

              <ErrorMessage
                errors={errors}
                name={`business.name_of_company`}
                render={({ message }) => (
                  <div className="text-destructive font-bold text-[12px] col-span-2 col-start-2">{message}</div>
                )}
              />
            </div>

            <div className="text-left grid grid-cols-[110px_1fr_80px] grid-rows-[1fr_auto] gap-x-2 gap-y-1 items-center">
              <Label htmlFor="business.business_address">사업장주소</Label>
              <Input
                id="business.business_address"
                {...register("business.business_address", {
                  required: "사업장 주소를 입력해주세요",
                })}
                type="text"
              />

              <ErrorMessage
                errors={errors}
                name={`business.business_address`}
                render={({ message }) => (
                  <div className="text-destructive font-bold text-[12px] col-span-2 col-start-2">{message}</div>
                )}
              />
            </div>

            <div className="text-left grid grid-cols-[110px_1fr] grid-rows-[1fr_auto] gap-x-2 gap-y-1 items-center">
              <Label htmlFor="business.business_registration_number">사업자등록번호</Label>
              <Input
                id="business.business_registration_number"
                {...register("business.business_registration_number", {
                  pattern: {
                    value: /\d{3}-\d{2}-\d{5}/,
                    message: "사업자등록번호 형식이 맞지 않습니다.",
                  },
                })}
                type="text"
                placeholder="000-00-00000"
              />

              <ErrorMessage
                errors={errors}
                name={`business.business_registration_number`}
                render={({ message }) => (
                  <div className="text-destructive font-bold text-[12px] col-span-2 col-start-2">{message}</div>
                )}
              />
            </div>

            <div className="text-left grid grid-cols-[110px_1fr] grid-rows-[1fr_auto] gap-x-2 gap-y-1 items-center">
              <Label htmlFor="business.resident_registration_number">법인등록번호</Label>
              <Input
                id="business.resident_registration_number"
                {...register("business.resident_registration_number", {
                  pattern: { value: /\d{6}-\d{7}/, message: "법인등록번호 형식이 맞지 않습니다." },
                })}
                type="text"
              />

              <ErrorMessage
                errors={errors}
                name={`business.resident_registration_number`}
                render={({ message }) => (
                  <div className="text-destructive font-bold text-[12px] col-span-2 col-start-2">{message}</div>
                )}
              />
            </div>

            <div className="text-left grid grid-cols-[110px_1fr] grid-rows-[1fr_auto] gap-x-2 gap-y-1 items-center">
              <Label htmlFor="business.date_of_business_commencement">개업일</Label>
              <Input
                id="business.date_of_business_commencement"
                {...register("business.date_of_business_commencement", {
                  required: "개업일을 입력해주세요.",
                  pattern: {
                    value: /(\d{4})년 (\d{2})월 (\d{2})일$/,
                    message: "입사일에 알맞은 형식을 입력해주세요.",
                  },
                })}
                type="text"
                placeholder="0000년 00월 00일"
              />

              <ErrorMessage
                errors={errors}
                name={`business.date_of_business_commencement`}
                render={({ message }) => (
                  <div className="text-destructive font-bold text-[12px] col-span-2 col-start-2">{message}</div>
                )}
              />
            </div>

            <div className="text-left grid grid-cols-[110px_1fr] grid-rows-[1fr_auto] gap-x-2 gap-y-1 items-center">
              <Label htmlFor="business.main_number">사업장 대표번호</Label>
              <Input
                id="business.main_number"
                {...register("business.main_number", {
                  maxLength: { value: 11, message: "11글자 내로 입력해주세요." },
                })}
                type="text"
              />

              <ErrorMessage
                errors={errors}
                name={`business.main_number`}
                render={({ message }) => (
                  <div className="text-destructive font-bold text-[12px] col-span-2 col-start-2">{message}</div>
                )}
              />
            </div>

            <div className="text-left grid grid-cols-[110px_1fr] grid-rows-[1fr_auto] gap-x-2 gap-y-1 items-center">
              <Label htmlFor="business.name_of_representative">사업자 대표</Label>
              <Input
                id="business.name_of_representative"
                {...register("business.name_of_representative", {
                  maxLength: { value: 20, message: "20글자 내로 입력해주세요." },
                })}
                type="text"
              />

              <ErrorMessage
                errors={errors}
                name={`business.name_of_representative`}
                render={({ message }) => (
                  <div className="text-destructive font-bold text-[12px] col-span-2 col-start-2">{message}</div>
                )}
              />
            </div>

            <div className="text-left grid grid-cols-[110px_1fr] grid-rows-[1fr_auto] gap-x-2 gap-y-1 items-center">
              <Label htmlFor="business.type_of_business">업종</Label>
              <Input
                id="business.type_of_business"
                {...register("business.type_of_business", {
                  maxLength: { value: 30, message: "30글자 이내로 입력해주세요." },
                })}
                type="text"
              />

              <ErrorMessage
                errors={errors}
                name={`business.type_of_business`}
                render={({ message }) => (
                  <div className="text-destructive font-bold text-[12px] col-span-2 col-start-2">{message}</div>
                )}
              />
            </div>
          </CardContent>
          <Button>가입완료</Button>
        </ScrollArea>
      </Card>
    </form>
  );
});

export default SignUpForm;
