import React from 'react';
import { ChatWrapper } from '../../pages/ChatPage';
import Message from '../Message';
import { useAppSelector } from '../../redux/redux-hook';
import { getMessagesSelector } from '../../redux/slices/messageSlice/selectors';

const MessageList = () => {
    const messages = useAppSelector(getMessagesSelector);

    return (
        <ChatWrapper>
            {messages.map((message, i) => {
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
            })}
        </ChatWrapper>
    );
};

export default MessageList;
