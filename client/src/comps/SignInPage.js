import { SignIn } from "@clerk/clerk-react";
 
const SignInPage = () => (
  <SignIn path="/login" routing="login" signUpUrl="/sign-up" />
);
 
export default SignInPage;