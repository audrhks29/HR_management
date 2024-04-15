import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postUserData } from "@/server/fetchUserData";
import useUserStore from "@/store/user-store";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = memo(() => {
  const { setUserInfo } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user_id = formData.get("user_id") as string;
    const user_password = formData.get("user_password") as string;
    try {
      const userData = await postUserData(user_id, user_password);
      setUserInfo(userData);
      if (userData) navigate("/home");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[500px]">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">로그인</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="user_id">아이디</Label>
            <Input id="user_id" name="user_id" type="text" placeholder="아이디" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="user_password">비밀번호</Label>
            <Input id="user_password" name="user_password" type="password" placeholder="비밀번호" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">로그인</Button>
        </CardFooter>
      </Card>
    </form>
  );
});

export default LoginForm;
