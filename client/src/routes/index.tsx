import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Auth/login";
import RegisterPage from "../pages/Auth/register";
import HomePage from "../pages";
import PublicRoute from "./PublicRute";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
