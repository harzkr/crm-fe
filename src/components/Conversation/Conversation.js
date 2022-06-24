import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './styles.css';

const Conversation = ({ createMessage, conversationId, dataMessages }) => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");

  const [userId] = React.useState(localStorage.getItem("userId"));

  const sendMessage = async () => {
    let text = message.trim();
    if (text.length > 0) {
      createMessage({
        sender: userId,
        content: text,
        conversation: conversationId,
        read: false,
      });
      setMessage("");
    }
  };

  return (
    <div style={{ backgroundColor: "#333", minHeight: "100vh" }}>
      {dataMessages.map((message) => (
        <div
          key={message.id}
          style={{ display: "flex", flexDirection: "column", alignItems: message.sender === userId ? "end" : "start" }}
        >
          <div
            style={
              message.sender === userId
                ? {
                    marginTop: 12,
                    padding: 5,
                    display: "flex",
                    border: "1px solid #fdfbf7",
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                    marginRight: 4,
                    width: "fit-content",
                  }
                : {
                    marginTop: 12,
                    padding: 5,
                    display: "flex",
                    border: "1px solid #fdfbf7",
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                    marginLeft: 4,
                    width: "fit-content",
                  }
            }
          >
            <Typography variant="body1" style={{ color: "white" }}>
              {message.content}
            </Typography>
            <Typography
              variant="caption"
              className="date__format"
            >
              {new Date(message.createdAt).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Typography>
          </div>
        </div>
      ))}
      <div className="message-writeup-container">
        <TextField
          label="Type your message"
          className="message-box"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          className="btn-messager"
          variant="contained"
          color="primary"
          onClick={() => sendMessage()}
        >
          Send
        </Button>
        <Button
          className="btn-messager"
          variant="contained"
          color="secondary"
          onClick={() => navigate(-1)}
        >
          Exit
        </Button>
      </div>
    </div>
  );
};

export default Conversation;
