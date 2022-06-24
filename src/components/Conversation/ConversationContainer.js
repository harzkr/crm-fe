import React from "react";
import { useQuery, useMutation } from "react-query";
import Conversation from "./Conversation";
import { ApiResponse } from "../../utils/ApiResponse";
import { useParams } from "react-router-dom";

const ConversationContainer = () => {
  const { id } = useParams();

  const createMessage = async (data) => {
    try {
      const response = await ApiResponse("post", "/v1/messages/create", data);
      return response;
    } catch (err) {
      console.log(err.data.message);
    }
  };

  const getMessages = async () => {
    try {
      const response = await ApiResponse("get", "/v1/messages/get", {
        params: { conversationId: id },
      });
      return response;
    } catch (err) {
      console.log(err.data.message);
    }
  };

  const { mutate, data: dataMessage } = useMutation(createMessage);
  const { data: dataMessages } = useQuery("messages", getMessages,{
    refetchInterval:200000
  });

  const _props = {
    createMessage: mutate,
    conversationId: id,
    dataMessages: dataMessages ? dataMessages.data.results : [],
  };
  return <Conversation {..._props} />;
};

export default ConversationContainer;
