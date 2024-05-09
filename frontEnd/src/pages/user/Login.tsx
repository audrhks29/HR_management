import LoginForm from "@/components/login/LoginForm";
import { memo } from "react";

const Login = memo(() => {
  return (
    <main className="h-screen-minus-frame flex justify-center items-center">
      <LoginForm />
    </main>
  );
});

export default Login;
