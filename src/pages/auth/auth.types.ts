export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export interface ClerkAPIError {
  errors: { message: string }[];
}

export type OAuthStrategy = 'oauth_github' | 'oauth_google';
export type OAuthProvider = 'github' | 'google';

export interface AuthState {
  isFormSubmit: boolean;
  isOAuthLoading: OAuthProvider | null;
  showPassword: boolean;
}

export interface SignUpState extends AuthState {
  isVerifying: boolean;
  otpCode: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  code: string;
  newPassword: string;
}

export type ForgotPasswordStep = 'email' | 'code' | 'success';
