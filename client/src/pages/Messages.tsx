import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Message from '../components/Message';
import { useAppDispatch, useAppSelector } from '../redux/redux-hook';
import {
    ChatPageWrapper,
    ChatWrapper,
    ChatInputWrapper,
    ChatInput,
    SendButton,
} from './ChatPage';
import Dialog from '../components/Dialog';
import { IMessage } from '../types/Message';
import { $authHost } from '../axios/axios';
import { IUser } from '../types/User';
import {
    getMessages,
    setMessages,
} from '../redux/slices/messageSlice/messageSlice';
import { getUserIdSelector } from '../redux/slices/authSlice/selectors';
import { getMessagesSelector } from '../redux/slices/messageSlice/selectors';

const DialogSidebar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid ${(props) => props.theme.dark.hover};
    background: ${(props) => props.theme.dark.component};
    border-radius: 10px;
    height: min-content;
    max-height: calc(100vh - 128px);
    overflow: auto;
`;

const SelectChat = styled.div`
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    justify-self: center;
`;

const Messages = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [value, setValue] = useState('');
    const [dialogs, setDialogs] = useState<IUser[]>([]);
    const [to, setTo] = useState('');
    const socket = useRef<WebSocket>();
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

    useEffect(() => {
        $authHost.get('/dialogs').then(({ data }) => {
            setDialogs(data);
        });
    }, []);

    const onSendPrivateMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (value) {
            const message = {
                event: 'private-message',
                message: value,
                token: localStorage.getItem('token'),
                to,
            };
            socket.current?.send(JSON.stringify(message));
            setValue('');
        }
    };

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
                                            message={message.message}
                                            userName={message.from.fullName}
                                            avatarUrl={message.from.avatarUrl}
                                            key={i}
                                        />
                                    );
                                })}
                            </ChatWrapper>
                            <ChatInputWrapper onSubmit={onSendPrivateMessage}>
                                <ChatInput
                                    placeholder='Напишите сообщение...'
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <SendButton type='submit'>
                                    <svg
                                        width='30px'
                                        height='30px'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <g
                                            id='SVGRepo_bgCarrier'
                                            stroke-width='0'
                                        ></g>
                                        <g
                                            id='SVGRepo_tracerCarrier'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        ></g>
                                        <g id='SVGRepo_iconCarrier'>
                                            {' '}
                                            <path
                                                d='M20 4L3 11L10 14M20 4L13 21L10 14M20 4L10 14'
                                                stroke='#6f6f6f'
                                                stroke-width='1.5'
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                            ></path>{' '}
                                        </g>
                                    </svg>
                                </SendButton>
                            </ChatInputWrapper>
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
