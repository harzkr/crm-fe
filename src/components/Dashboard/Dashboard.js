import { Typography } from "@mui/material";
import React from "react";
import "./styles.css";

const Dashboard = () => {
  return (
    <div className="outer">
      <div style={{marginTop:24}}>
        <Typography variant="h3" className="title">
          Welcome!
        </Typography>
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
