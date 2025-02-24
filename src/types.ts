type registerErrorType = {
  name?: string;
  email?: string;
  password?: string;
};

type loginErrorType = {
  email?: string;
  password?: string;
};

// * Auth INput type
type AuthInputType = {
  label: string;
  type: string;
  name: string;
  errors: registerErrorType;
  callback: (name: string, value: string) => void;
};

// * Forgot password payload type
type ForgotPasswordPayload = {
  email: string;
};

// reset password type
type ResetPasswordPayload = {
  email: string;
  signature: string;
  password: string;
  password_confirmation: string;
};

/*
Ye code TypeScript me error handling ke liye types define kr raha hai.

1. registerErrorType:
   - Ye ek type hai jo registration form ke errors ko handle krne ke liye use hota hai
   - Isme 3 optional fields hain (? ka matlab optional hai):
     * name: string type - user ka naam
     * email: string type - user ka email
     * password: string type - user ka password
   - Optional isliye hai kyuki error kisi bhi field me ho skta hai ya nahi bhi ho skta

2. loginErrorType:
   - Ye login form ke errors ko handle krne ke liye type hai
   - Isme 2 optional fields hain:
     * email: string type - user ka email
     * password: string type - user ka password
   - Login me name ki zarurat nahi hoti isliye sirf email aur password fields hain

TypeScript me ye types isliye use hote hain taki error handling type-safe ho aur code me bugs na aaye.
*/
