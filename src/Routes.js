import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Conversation from "./components/Conversation";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function RequireAuth() {
  let accessToken = localStorage.getItem("accessToken");
  let location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <></>;
}

const routes = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/conversation/:user" element={<Conversation />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default routes;
