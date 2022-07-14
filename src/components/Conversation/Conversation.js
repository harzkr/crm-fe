import React from "react";
import {
  TextField,
  Typography,
  AppBar,
  IconButton,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { days_map } from "../../utils/constants";
import { ArrowBack, SendRounded } from "@mui/icons-material";
import { io } from "socket.io-client";

const Conversation = ({
  createMessage,
  conversationId,
  dataMessages,
  pageNo,
  maxPage,
  isFetching,
  setPageNo,
  fetchNextPage,
  hasNextPage,
  refetchLatest,
  createdMessage,
  conversationData
}) => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");

  const [userId] = React.useState(localStorage.getItem("userId"));

  const [latestMessage, setLatestMessage] = React.useState("");
  const [otherUsername, setOtherUsername] = React.useState("");

  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    const newSocket = io(`http://localhost:8000/`, { query: `conversationId=${conversationId}` });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  React.useEffect(() => {
    if(socket){
      socket.on("connect", () => {
        //console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      });

      socket.on(conversationId, (data) => {
        //console.log('received message', data);

        if(data === 'fetch'){
          refetchLatest();
        }
      });
    }
  }, [socket, conversationId, refetchLatest])

  const handleScroll = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

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
      setLatestMessage(text);
    }
  };

  const messageRender = (message) => (
    <div
      className={
        message.sender === userId
          ? "conversation__message__right"
          : "conversation__message__left"
      }
    >
      <Typography variant="body1" className="text__content">
        {message.content}
      </Typography>
      <Typography variant="caption" className="text__time">
        {new Date(message.createdAt).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </Typography>
    </div>
  );

  React.useEffect(() => {
    if (conversationData) {
      const { participants } = conversationData;
      
      if(participants && participants.length > 0){
        if(participants[0].userId === userId) {
          setOtherUsername(participants[1].name);
        } else{
          setOtherUsername(participants[0].name);
        }
      }
    }
  }, [conversationData, userId]);
  

  React.useEffect(() => {
    handleScroll();
  }, []);

  React.useEffect(() => {
    if (dataMessages.length > 0) {
      let lastMessage = dataMessages[0]?.data?.results[0]?.content;

      if (latestMessage !== lastMessage) {
        handleScroll();
        setLatestMessage(lastMessage);
      }
    }
  }, [dataMessages, latestMessage]);

  React.useEffect(() => {
    if (createdMessage) {
      refetchLatest();

      setTimeout(() => {
        handleScroll();
      },1000)
    }
  }, [createdMessage, refetchLatest]);

  React.useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset === 0) {
        if (pageNo < maxPage && !isFetching && dataMessages.length !== 0) {
          setPageNo(pageNo + 1);
          fetchNextPage();
        }
      }
    };

    return () => (window.onscroll = null);
  }, [
    pageNo,
    maxPage,
    isFetching,
    setPageNo,
    fetchNextPage,
    hasNextPage,
    dataMessages,
  ]);

  return (
    <div className="conversation__outer">
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {otherUsername}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="margin__gutter">
        {dataMessages.map((page, i) => (
          <React.Fragment key={i}>
            {page.data.results.map((message, j) => (
              <div
                key={message.id}
                className="page__outer"
                style={{
                  alignItems: message.sender === userId ? "end" : "start",
                }}
              >
                {messageRender(message)}
                {page.data.results[j + 1] !== undefined &&
                new Date(message.createdAt).getDay() !==
                  new Date(page.data.results[j + 1].createdAt).getDay() ? (
                  <>
                    <div className="day__divider">
                      <Typography variant="h6" className="dash__color">
                        --{" "}
                        {
                          days_map[
                            new Date(
                              page.data.results[j + 1].createdAt
                            ).getDay()
                          ]
                        }{" "}
                        --
                      </Typography>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="textbox__container">
        <TextField
          label="Type your message"
          className="textbox__field"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline={true}
          rows={1}
        />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => sendMessage()}
            className="button__gutter"
          >
            <SendRounded />
          </IconButton>
      </div>
    </div>
  );
};

export default Conversation;
