import React from "react";
import { useQuery, useMutation } from "react-query";
import Conversation from "./Conversation";
import { ApiResponse } from "../../utils/ApiResponse";
import { useParams } from "react-router-dom";

const ConversationContainer = () => {
  const { id } = useParams();

  const [pageNo, setPageNo] = React.useState(1);
  const [maxPage, setMaxPage] = React.useState(1);

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
        params: { conversation: id, limit:20 },
      });
      return response;
    } catch (err) {
      console.log(err.data.message);
    }
  };

  const { mutate } = useMutation(createMessage);
  const { data: dataMessages, isFetching } = useQuery([`messages`,pageNo], getMessages,{
    refetchInterval:5000,
    refetchIntervalInBackground:true
  },{keepPreviousData:true});

  console.log(pageNo,maxPage, isFetching);

  const scrollTopTrigger = (page,max) => {
    console.log(page,max, isFetching,'----<>----');
    if(page < max && !isFetching){
      setPageNo(page+1);
      console.log('triginside')
    }
  }

  React.useEffect(() => {
    if(dataMessages && dataMessages.data){
      setMaxPage(dataMessages.data.totalPages);
    }
  },[dataMessages]);

  const _props = {
    createMessage: mutate,
    conversationId: id,
    dataMessages: dataMessages ? dataMessages.data.results : [],
    scrollTopTrigger: scrollTopTrigger,
    pageNo,
    maxPage,
    isFetching
  };
  return <Conversation {..._props} />;
};

export default ConversationContainer;
