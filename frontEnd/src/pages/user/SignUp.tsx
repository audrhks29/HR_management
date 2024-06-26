import SignUpForm from "@/components/signUp/SignUpForm";
import { memo } from "react";

const SignUp = memo(() => {
  return (
    <main className="h-screen-minus-frame flex justify-center items-center">
      <SignUpForm />
    </main>
  );
});

export default SignUp;
