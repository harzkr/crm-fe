import React from "react";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";

const Conversation = (props) => {
  const { id } = useParams();

  console.log(id);

  return (
    <div style={{ backgroundColor: "#333", minHeight: "100vh" }}>
      <div style={{ position: "absolute", bottom: 12, left: 12,width:'calc(100vw - 24px)' }}>
        <TextField label="Type your message" style={{
            width:'calc(100vw - 24px)'
        }} />
      </div>
    </div>
  );
};

export default Conversation;
