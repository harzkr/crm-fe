import { Typography } from "@mui/material";
import React from "react";
import "./styles.css";
import { USERS } from "./mock";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

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
            <Card>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    {user.name}
                </Typography>
                <Typography sx={{fontSize:14}}>
                    {user.email}
                </Typography>
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
