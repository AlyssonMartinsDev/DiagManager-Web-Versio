import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRout from "./components/protectedRoute";

function Dashboard() {
  return <div className="p-6">Dashboard</div>;
}

function Clients() {
  return <div className="p-6">Clients</div>;
}



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRout>
            <Dashboard />
          </ProtectedRout>
        } />
        < Route path="/clients" element={
          <ProtectedRout>
            <Clients />
          </ProtectedRout>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
