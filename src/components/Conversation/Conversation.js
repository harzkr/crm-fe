import React from "react";
import { Button, TextField, Typography } from "@mui/material";

const Conversation = ({ createMessage, conversationId, dataMessages }) => {
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
              style={{ color: "white", marginTop: 12, marginLeft: 24 }}
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
      <div style={{ position: "absolute", bottom: 12, left: 12 }}>
        <TextField
          label="Type your message"
          style={{
            width: "calc(100vw - 200px)",
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          style={{ marginLeft: 8, marginTop: 8 }}
          variant="contained"
          color="primary"
          onClick={() => sendMessage()}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Conversation;
