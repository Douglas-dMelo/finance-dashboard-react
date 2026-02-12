import { useAuth } from "../context/AuthContext";
import Login from "./Login";

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Login />;
  return children;
}