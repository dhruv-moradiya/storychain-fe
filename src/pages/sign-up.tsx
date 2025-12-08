import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, User, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSignUp } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router";

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

interface ClerkAPIError {
  errors: { message: string }[];
}

function isClerkAPIError(error: unknown): error is ClerkAPIError {
  return (
    typeof error === "object" &&
    error !== null &&
    "errors" in error &&
    Array.isArray((error as { errors: unknown }).errors)
  );
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const { isLoaded, signUp, setActive } = useSignUp();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    if (!isLoaded) return;

    try {
      setIsFormSubmit(true);

      const response = await signUp.create({
        username: data.username,
        emailAddress: data.email,
        password: data.password,
      });

      console.log("SignUp response:", response);

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success("Verification email sent!", {
        position: "top-center",
      });

      setIsVerifying(true);
    } catch (error: unknown) {
      console.error("Signup error:", error);

      if (isClerkAPIError(error)) {
        const message = error.errors.map((e) => e.message).join(", ");
        toast.error(message, { position: "top-center" });
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsFormSubmit(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded || otpCode.length !== 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }

    try {
      setIsFormSubmit(true);

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otpCode,
      });

      console.log("Verification complete:", completeSignUp);

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success("Email verified successfully! 🎉", {
          position: "top-center",
        });

        navigate("/");
      } else {
        toast.error("Verification failed. Try again.");
      }
    } catch (error: unknown) {
      console.error("Verification error:", error);

      if (isClerkAPIError(error)) {
        const message = error.errors.map((e) => e.message).join(", ");
        toast.error(message, { position: "top-center" });
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsFormSubmit(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="text-sm flex gap-2 items-center w-screen h-screen justify-center">
        <Spinner /> Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex items-center justify-center border-r"></div>

      <div className="flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm space-y-6">
          {!isVerifying ? (
            <>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold">Create an account</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your details below to create your account
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Username */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      className="pl-9"
                      {...register("username", {
                        required: "Username is required",
                      })}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-9"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-9 pr-10"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full mt-2">
                  {isFormSubmit ? <Spinner /> : "Sign Up"}
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center space-y-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsVerifying(false)}
                  className="absolute left-4 top-4"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-2xl font-semibold">Verify your email</h2>
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <div className="flex flex-col items-center justify-center space-y-6">
                <InputOTP
                  maxLength={6}
                  value={otpCode}
                  onChange={(val: string) => setOtpCode(val)}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>

                <Button onClick={handleVerify} className="w-full mt-2">
                  {isFormSubmit ? <Spinner /> : "Verify Email"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
