import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { memo } from 'react';

const LoginForm = memo(() => {
  return (
    <div className='flex justify-center mt-72'>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">로그인</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="이메일"
              required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호"
              required />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">로그인</Button>
        </CardFooter>
      </Card>
    </div>
  );
});

export default LoginForm;