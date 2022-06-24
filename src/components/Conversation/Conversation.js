import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { VariableSizeList as List } from 'react-window';

const Conversation = ({ createMessage, conversationId, dataMessages }) => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");

  const [userId] = React.useState(localStorage.getItem("userId"));

  function handleScroll() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  }

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

  React.useEffect(() => {
    handleScroll();
  },[dataMessages]);

  const getItemSize = (index) => {
    return dataMessages[index].content.length * 20;
  }
    
    const Row = ({ index, style }) => {
      const message = dataMessages[index];
      return(
      <div
      key={message.id}
      style={{ display: "flex", flexDirection: "column", alignItems: message.sender === userId ? "end" : "start", ...style }}
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
                maxWidth:'50vw'
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
                maxWidth:'50vw'
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
    )}
  return (
    <div style={{ backgroundColor: "#333", minHeight: "100vh", display:'flex',flexDirection:'column' }}>
      <div style={{marginBottom:120}}>
      <List
        height={window.innerHeight - 120}
        itemCount={dataMessages.length}
        itemSize={getItemSize}
        width={window.innerWidth}
      >
        {Row}
      </List>
      </div>
      <div style={{ position: "fixed", bottom: 12, left: 12 }}>
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
        <Button
          style={{ marginLeft: 8, marginTop: 8 }}
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
