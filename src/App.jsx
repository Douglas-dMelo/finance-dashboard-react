import RequireAuth from "./auth/RequireAuth";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  );
}
