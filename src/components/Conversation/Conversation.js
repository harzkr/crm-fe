import React from "react";
import { Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";

const Conversation = (props) => {
  const { id } = useParams();

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
        />
        <Button
          style={{ marginLeft: 8, marginTop: 8 }}
          variant="contained"
          color="primary"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Conversation;
