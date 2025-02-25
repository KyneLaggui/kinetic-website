import { useAuth } from "@/supabase/custom-hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (!user) navigate("/");

  if (loading) return <p>Loading...</p>;

  return (
        <>{children}</>
    )
};

export default AuthGuard;
