import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    navigate("/sign-up");
    return;
  }

  return <>{children}</>;
};
