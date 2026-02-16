import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "@/auth/RequireAuth";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
