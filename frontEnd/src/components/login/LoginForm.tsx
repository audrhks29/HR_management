import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useUserStore from "@/store/user-store";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { postUserData } from "@/server/fetchUserData";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  user_id: string;
  user_password: string;
}

const LoginForm = memo(() => {
  const [findUser, setFindUser] = useState(true);
  const { setUserInfo } = useUserStore();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormValues>();

  const findUserData = async (user_id: string, user_password: string) => {
    const userData = await postUserData(user_id, user_password);
    sessionStorage.setItem("user_id", userData.user_id);
    setUserInfo();
    try {
      if (userData) {
        navigate("/home");
      } else {
        setFindUser(false);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const { user_id, user_password } = data;
    findUserData(user_id, user_password);
  };

  const handleLoginGuest = () => {
    findUserData("sample", "sample");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-[450px] text-center p-8">
        <CardHeader>
          <CardTitle className="text-2xl">환영합니다</CardTitle>
        </CardHeader>
        <CardContent className="w-[350px] m-auto grid gap-4">
          <div className="text-left">
            <Label className="block mb-2" htmlFor="user_id">
              아이디
            </Label>
            <Input id="user_id" type="text" placeholder="아이디" {...register("user_id")} />
          </div>
          <div className="w-full text-left">
            <Label className="block mb-2" htmlFor="user_password">
              비밀번호
            </Label>
            <Input id="user_password" {...register("user_password")} type="password" placeholder="비밀번호" />
            <p className="text-muted-foreground mt-1 text-left text-[12px] cursor-pointer hover:text-primary">
              비밀번호를 잊으셨나요?
            </p>
          </div>
          {!findUser && (
            <p className="text-[12px] text-destructive-foreground">아이디 또는 비밀번호가 잘못되었습니다.</p>
          )}
          <Button type="submit">로그인</Button>
        </CardContent>
        <CardFooter className="text-[12px] w-[350px] m-auto flex-col items-start gap-1 text-muted-foreground">
          <div>
            <span className="mr-3">계정이 필요한가요?</span>
            <Link to={""} className="hover:text-primary underline underline-offset-2">
              회원가입
            </Link>
          </div>
          <div>
            <span className="mr-3">둘러보고 싶으신가요?</span>
            <span onClick={handleLoginGuest} className="cursor-pointer hover:text-primary underline underline-offset-2">
              게스트 로그인
            </span>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
});

export default LoginForm;
