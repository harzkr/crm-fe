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

function RequireAuth() {
  let accessToken = localStorage.getItem("accessToken");
  let location = useLocation();

  if (!accessToken) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <></>;
}


const routes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/conversation/:user" element={<Conversation />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default routes;
