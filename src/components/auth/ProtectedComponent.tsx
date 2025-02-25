import { useAuth } from "@/supabase/custom-hooks/useAuth";

interface ProtectedComponentProps {
  children: React.ReactNode;
}

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({ children }) => {
  const { user } = useAuth();

  return user ? <>{children}</> : null; // Render only if the user exists
};

export default ProtectedComponent;
