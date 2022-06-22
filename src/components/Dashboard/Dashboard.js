import React from "react";
import "./styles.css";
import { USERS } from "./mock";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [filtered, setFiltered] = React.useState([]);

  const selectFilter = (val) => {
    if (val) {
      let _filtered = USERS.filter((user) => user.name === val);

      if (_filtered) {
        setFiltered(_filtered);
      }
    }
    else{
      console.log(val,'check');
      setFiltered([]);
    }
  };

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
          marginTop: 24,
          marginBottom: 24,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={USERS.map((option) => option.name)}
          renderInput={(params) => (
            <TextField {...params} label="Search for users" />
          )}
          style={{ width: 300 }}
          onChange={(event, value) => selectFilter(value)}
        />
      </div>
      {filtered.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {filtered.map((user) => (
            <div key={user.email} className="user">
              <Card onClick={() => navigate(`/conversation/1234`)} style={{ cursor: "pointer" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 16 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {user.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>{user.email}</Typography>

                  <Typography style={{ fontSize: 14, marginTop: 24 }}>
                    {user.lastMessage}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">CHAT</Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {USERS.map((user) => (
            <div key={user.email} className="user">
              <Card onClick={() => navigate(`/conversation/${user.email}`)} style={{ cursor: "pointer" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 16 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {user.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>{user.email}</Typography>

                  <Typography style={{ fontSize: 14, marginTop: 24 }}>
                    {user.lastMessage}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">CHAT</Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
