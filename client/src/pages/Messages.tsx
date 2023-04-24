import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Message from '../components/Message';
import { useAppDispatch, useAppSelector } from '../redux/redux-hook';
import { ChatPageWrapper, ChatWrapper } from './ChatPage';
import Dialog from '../components/Dialog';
import { IMessage } from '../types/Message';
import { $authHost } from '../axios/axios';
import {
    getMessages,
    setMessages,
} from '../redux/slices/messageSlice/messageSlice';
import { getUserIdSelector } from '../redux/slices/authSlice/selectors';
import { getMessagesSelector } from '../redux/slices/messageSlice/selectors';

import { useDialogs } from '../utils/hooks/useDialogs';
import Emoji from '../components/Emoji/Emoji';
import ChatInput from '../components/ChatInput/ChatInput';

const DialogSidebar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid ${(props) => props.theme.colors.border};
    background: ${(props) => props.theme.colors.componentBg};
    border-radius: 10px;
    height: min-content;
    max-height: calc(100vh - 128px);
    overflow: auto;
`;

const SelectChat = styled.div`
    color: ${(props) => props.theme.colors.font};
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    justify-self: center;
`;

const Messages = () => {
    const [isSelected, setIsSelected] = useState(false);
    const { dialogs, setDialogs } = useDialogs();
    const [to, setTo] = useState('');
    const socket = useRef<WebSocket>();
    const lastMessage = useRef<HTMLDivElement>();
    const dispatch = useAppDispatch();
    const userId = useAppSelector(getUserIdSelector);
    const messages = useAppSelector(getMessagesSelector);

    useEffect(() => {
        socket.current = new WebSocket('ws://localhost:5001');

        socket.current.onopen = () => {
            const message = {
                event: 'private-connection',
                token: localStorage.getItem('token'),
            };
            socket.current?.send(JSON.stringify(message));
        };
        socket.current.onmessage = ({ data }) => {
            const message = JSON.parse(data) as IMessage;

            $authHost.get('/dialogs').then(({ data }) => {
                setDialogs(data);
            });

            dispatch(setMessages(message));
        };
        socket.current.onclose = () => {
            console.log('Socket закрыт');
        };
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка');
        };
    }, []);

    return (
        <Layout>
            <>
                <ChatPageWrapper>
                    {!isSelected ? (
                        <SelectChat>Выберите диалог</SelectChat>
                    ) : (
                        <>
                            <ChatWrapper>
                                {messages.map((message, i) => {
                                    return (
                                        <Message
                                            audioUrl={message.audioUrl}
                                            message={message.message}
                                            userName={message.from.fullName}
                                            avatarUrl={message.from.avatarUrl}
                                            key={i}
                                        />
                                    );
                                })}
                            </ChatWrapper>
                            <ChatInput to={to} socket={socket} />
                        </>
                    )}
                </ChatPageWrapper>
                <DialogSidebar>
                    {dialogs.map((dialog, i) => {
                        return (
                            <Dialog
                                key={dialog._id}
                                onClick={() => {
                                    setIsSelected(true);
                                    setTo(dialog._id);
                                    dispatch(
                                        getMessages({
                                            userOne: userId as string,
                                            userTwo: dialog._id,
                                        })
                                    );
                                }}
                                userData={dialog}
                            />
                        );
                    })}
                </DialogSidebar>
            </>
        </Layout>
    );
};

export default Messages;
