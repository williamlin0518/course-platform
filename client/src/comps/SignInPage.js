import { SignIn } from "@clerk/clerk-react";
 
const SignInPage = () => (
  <SignIn path="/login1" routing="login" signUpUrl="/sign-up" />
);
 
export default SignInPage;