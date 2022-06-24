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

const Dashboard = ({ platformUsers, createConversation, dataConversation }) => {
  const navigate = useNavigate();

  const allUsers = platformUsers.length > 0 ? platformUsers : USERS;

  const [filtered, setFiltered] = React.useState([]);

  const selectFilter = (val) => {
    if (val) {
      let _filtered = allUsers.filter((user) => user.name === val);

      if (_filtered) {
        setFiltered(_filtered);
      }
    } else {
      console.log(val, "check");
      setFiltered([]);
    }
  };

  const handleConversationNav = async (user) => {
    if (user.conversations.length > 0) {
      navigate(`/conversation/${user.conversations[0]._id}`);
    } else {
      createConversation(user);
    }
  };

  React.useEffect(() => {
    if (dataConversation && dataConversation.data) {
      const { data } = dataConversation.data;
      navigate(`/conversation/${data.id}`);
    }
  }, [dataConversation, navigate]);

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
              <Card
                onClick={() => handleConversationNav(user)}
                style={{ cursor: "pointer" }}
              >
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
                    {user.conversations.length > 0
                      ? user.conversations[0].lastMessage
                      : "No messages"}
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
          {allUsers.map((user) => (
            <div key={user.email} className="user">
              <Card
                onClick={() => handleConversationNav(user)}
                style={{ cursor: "pointer" }}
              >
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
                    {user.conversations.length > 0
                      ? user.conversations[0].lastMessage
                      : "No messages"}
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
