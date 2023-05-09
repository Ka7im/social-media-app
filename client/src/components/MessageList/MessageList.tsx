import React from "react";
import Message from "../Message";
import { useAppSelector } from "../../redux/redux-hook";
import { getMessagesSelector } from "../../redux/slices/messageSlice/selectors";
import Spinner from "../Loaders/Spinner";
import styled from "styled-components";

const ChatWrapper = styled.ul`
  border-radius: 10px 10px 0px 0px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.componentBg};
  height: calc(100vh - 128px);
  padding: 10px 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 15px;
  overflow: auto;
`;

const MessageList = () => {
  const messages = useAppSelector(getMessagesSelector);

  return (
    <ChatWrapper>
      {messages.length ? (
        messages.map((message, i) => {
          return (
            <Message
              videoUrl={message.videoUrl}
              audioUrl={message.audioUrl}
              message={message.message}
              userName={message.from.fullName}
              avatarUrl={message.from.avatarUrl}
              key={i}
            />
          );
        })
      ) : (
        <Spinner />
      )}
    </ChatWrapper>
  );
};

export default MessageList;
