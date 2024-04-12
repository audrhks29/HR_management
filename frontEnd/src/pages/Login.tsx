import { memo } from "react";

import LoginForm from "@/layout/header/user/login/LoginForm";

const Login = memo(() => {
  return (
    <main>
      <LoginForm />
    </main>
  );
});

export default Login;
