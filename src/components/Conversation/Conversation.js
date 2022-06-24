import React from "react";
import { Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";

const Conversation = ({createMessage}) => {
  const { id } = useParams();
  const [message, setMessage] = React.useState("");

  const sendMessage = async () => {
    let text = message.trim();
    if(text.length > 0){
      createMessage({
        sender: localStorage.getItem("userId"),
        content: text,
        conversation: id,
        read:false
      });
      setMessage("");
    }
  }

  console.log(id);

  return (
    <div style={{ backgroundColor: "#333", minHeight: "100vh" }}>
        <div>
            Message display zone
        </div>
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
