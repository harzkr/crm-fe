import React from "react";
import "./styles.css";
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

const Dashboard = ({
  platformUsers,
  createConversation,
  dataConversation,
  hasNextPage,
  fetchNextPage,
  searchUsers,
  searchedUsers,
}) => {
  const navigate = useNavigate();

  const _platformUsers = React.useMemo(() => {
    if (platformUsers) {
      return platformUsers.flatMap((page) =>
        page && page.data ? page.data.docs : []
      );
    }
  }, [platformUsers]);

  const allUsers = _platformUsers.length > 0 ? _platformUsers : [];

  const [filtered, setFiltered] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  const selectFilter = (val) => {
    if (val) {
      let _filtered = filtered.filter((user) => user.name === val);

      if (_filtered) {
        setFiltered(_filtered);
      }
    } else {
      setFiltered([]);
    }
  };

  const selectSearch = (val) => {
    setSearchText(val);
    if (val.length > 1) {
      searchUsers({ searchTerm: val });
    } else {
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

  const getMessageTag = (user) => {
    if (user && user.conversations && user.conversations.length > 0) {
      let conv = user.conversations[0];
      if (
        conv.lastMessage &&
        conv.lastMessage.sender === localStorage.getItem("userId")
      ) {
        return "You: " + user.conversations[0].lastMessage.content;
      }
      return conv.lastMessage
        ? conv.lastMessage.content
        : "Start the conversation";
    } else {
      return "No messages yet";
    }
  };

  const cardRender = (user) => (
    <Card onClick={() => handleConversationNav(user)} className="user__card">
      <CardContent>
        <Typography className="user__name" color="text.secondary" gutterBottom>
          {user.name}
        </Typography>
        <Typography className="user__email">{user.email}</Typography>

        <Typography className="last__message__tag">
          {getMessageTag(user)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">CHAT</Button>
      </CardActions>
    </Card>
  );

  React.useEffect(() => {
    if (dataConversation) {
      navigate(`/conversation/${dataConversation.id}`);
    }
  }, [dataConversation, navigate]);

  React.useEffect(() => {
    setFiltered(searchedUsers);
  }, [searchedUsers]);

  return (
    <div className="outer">
      {localStorage.getItem("email") === "harzkr142@gmail.com" && (
        <div>
          <Button
            style={{ color: "white", position: "fixed", right: 10, top: 10 }}
            onClick={() => navigate("/admin")}
            variant="text"
          >
            Admin
          </Button>
        </div>
      )}
      <div className="welcome__tag">
        <Typography variant="h3" className="title">
          Welcome!
        </Typography>
        <Typography className="titleLower">
          Click on any user to start or resume conversations
        </Typography>
      </div>
      <div className="autocomplete__container">
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={filtered.map((option) => option.name)}
          renderInput={(params) => (
            <TextField {...params} label="Search for users" />
          )}
          className="autocomplete__input"
          onChange={(event, value) => selectFilter(value)}
          onInputChange={(event, value) => selectSearch(value)}
        />
      </div>
      {filtered.length > 0 && searchText.length > 0 ? (
        <div className="filtered__container">
          {filtered.map((user) => (
            <div key={user.email} className="user">
              {cardRender(user)}
            </div>
          ))}
        </div>
      ) : (
        <>
          {searchText.length > 0 ? (
            <div className="users__container">
              <Typography
                style={{ marginTop: 32 }}
                variant="h5"
                className="title"
              >
                No results
              </Typography>
            </div>
          ) : (
            <div className="users__container">
              {allUsers.map((user) => (
                <div key={user.email} className="user">
                  {cardRender(user)}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {hasNextPage && searchText.length === 0 && (
        <div className="load__more">
          <Button
            className="load__more__button"
            variant="contained"
            size="medium"
            onClick={fetchNextPage}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
