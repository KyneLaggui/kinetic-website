import { useAuth } from "@/supabase/custom-hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (!user) navigate("/");

  if (loading) return <LoadingSpinner />;

  return <>{children}</>;
};

export default AuthGuard;
