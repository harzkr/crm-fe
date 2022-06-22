import React from "react";
import "./styles.css";
import { USERS } from "./mock";
import Button from "@mui/material/Button";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Autocomplete,
} from "@mui/material";

const Dashboard = () => {
  return (
    <div className="outer">
      <div style={{ marginTop: 24 }}>
        <Typography variant="h3" className="title">
          Welcome!
        </Typography>
        <Typography className="titleLower">
          Click on any user to start or resume conversations
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {USERS.map((user) => (
          <div key={user.email} className="user">
            <Card style={{ cursor: "pointer" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {user.name}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>{user.email}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">CHAT</Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
