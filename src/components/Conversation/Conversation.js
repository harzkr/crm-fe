import React from 'react';
import { TextField } from '@mui/material';
import { useParams } from "react-router-dom";

const Conversation = (props) => {

    const { id } = useParams();

    console.log(id);

    return(
        <div style={{backgroundColor:'#333'}}>
            <TextField label="Type your message" />
        </div>
    )
}

export default Conversation;