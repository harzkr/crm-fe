import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const days_map = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

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
}) => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");

  const [userId] = React.useState(localStorage.getItem("userId"));

  const [latestMessage, setLatestMessage] = React.useState("");

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

  React.useEffect(() => {
    handleScroll();
  }, []);

  React.useEffect(() => {
    if (dataMessages.length > 0) {
      let lastMessage = dataMessages[0]?.data?.results[0]?.content;

      if (latestMessage !== lastMessage) {
        handleScroll();
      }
    }
  }, [dataMessages, latestMessage]);

  React.useEffect(() => {
    if (createdMessage) {
      refetchLatest();

      handleScroll();
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
                <div
                  className={
                    message.sender === userId
                      ? "conversation__message__right"
                      : "conversation__message__left"
                  }
                >
                  <Typography
                    variant="body1"
                    className="text__content"
                  >
                    {message.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="text__time"
                  >
                    {new Date(message.createdAt).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </Typography>
                </div>
                {page.data.results[j + 1] !== undefined &&
                new Date(message.createdAt).getDay() !==
                  new Date(page.data.results[j + 1].createdAt).getDay() ? (
                  <>
                    <div
                      className="day__divider"
                    >
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
        <Button
          className="button__gutter"
          variant="contained"
          color="primary"
          onClick={() => sendMessage()}
        >
          Send
        </Button>
        <Button
          className="button__gutter"
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
