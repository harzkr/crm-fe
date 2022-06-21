import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Conversation from "./components/Conversation";

const routes = () => {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <Router>
      <Routes>
        {accessToken ? (
          <Route path="/login" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/conversation/:user" element={<Conversation />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default routes;
