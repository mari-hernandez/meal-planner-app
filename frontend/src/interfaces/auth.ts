export interface UserSignUpData {
  email: string;
  username: string;
  password: string;
}

export interface User {
  firtsName: string;
  lastName: string;
  username: string;
}

export interface AlertProps {
  message: string;
  severity: "error" | "success";
}
