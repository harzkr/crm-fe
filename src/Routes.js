import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  Outlet
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Conversation from "./components/Conversation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Admin from "./components/Admin";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function RequireAuth() {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}

const routes = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/conversation/:id" element={<Conversation />} />
            <Route path="/admin" element={<Admin/>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default routes;
