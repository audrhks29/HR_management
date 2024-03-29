import { memo } from 'react';


import PageTitle from '@/shared/PageTitle';
import LoginForm from '@/layout/header/user/login/LoginForm';

const Login = memo(() => {
  return (
    <main>
      <PageTitle title="로그인" />
      <LoginForm />
    </main>
  );
});

export default Login;