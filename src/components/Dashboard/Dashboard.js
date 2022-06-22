import { Typography } from "@mui/material";
import React from "react";
import "./styles.css";
import { USERS } from "./mock";

const Dashboard = () => {
  return (
    <div className="outer">
      <div style={{ marginTop: 24 }}>
        <Typography variant="h3" className="title">
          Welcome!
        </Typography>
      </div>
      <div style={{display:'flex', justifyContent:'space-evenly', flexWrap:'wrap'}}>
        {USERS.map((user) => (
          <div key={user.email} className="user">
            <Typography>{user.name}</Typography>
            <Typography>{user.email}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
