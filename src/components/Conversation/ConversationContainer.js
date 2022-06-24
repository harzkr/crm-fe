import React from "react";
import { useQuery, useMutation } from "react-query";
import Conversation from "./Conversation";
import { ApiResponse } from "../../utils/ApiResponse";

const ConversationContainer = () => {


    const createMessage = async (data) => {
        try {
            const response = await ApiResponse("post", "/v1/messages/create", data);
            return response;
        } catch (err) {
            console.log(err.data.message);
        }
    }

    const { mutate, data: dataMessage } = useMutation(createMessage)

    const _props = {
        createMessage: mutate
    };
    return <Conversation {..._props}/>
}

export default ConversationContainer;