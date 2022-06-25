import React from "react";
import { useInfiniteQuery, useMutation } from "react-query";
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

  const getMessages = async ({pageParam = 1}) => {
      try {
        const response = await ApiResponse("get", "/v1/messages/get", {
          params: { conversation: id, limit:100, page: pageParam },
        });
        return response;
      } catch (err) {
        console.log(err.data.message);
      }
  };

  const { mutate, data:createdMessage } = useMutation(createMessage);

  const {
    data:dataMessages,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch
  } = useInfiniteQuery('messages', getMessages, {
    getNextPageParam: (lastPage, pages) =>{
      return  maxPage > pages.length ? pages.length + 1 : undefined;
    },
    select: data => ({
      pages: [...data.pages].reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),
  })

  React.useEffect(() => {
    if(dataMessages && dataMessages.pages){
      if(dataMessages.pages.length > 0 && maxPage === 1){
        setMaxPage(dataMessages.pages[dataMessages.pages.length-1].data.totalPages); 
      }
    }
  },[dataMessages, maxPage]);

  const refetchLatest = async () => {
    refetch({ refetchPage: (page, index) => index === 0 })
  }

  React.useEffect(() => {
    const timer = setInterval(refetchLatest, 10000);
    return () => clearInterval(timer);
  }, []);

  const _props = {
    createMessage: mutate,
    conversationId: id,
    dataMessages: dataMessages ? dataMessages.pages : [],
    pageNo,
    maxPage,
    isFetching,
    setPageNo,
    fetchNextPage,
    hasNextPage,
    refetchLatest,
    createdMessage
  };
  return <Conversation {..._props} />;
};

export default ConversationContainer;
