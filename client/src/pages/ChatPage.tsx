import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Message from '../components/Message';
import { useAppSelector } from '../redux/redux-hook';
import { getUserNameSelector } from '../redux/slices/authSlice/selectors';

const ChatPageWrapper = styled.div`
    display: grid;
`;

const ChatInput = styled.input`
    width: 400px;
    border-radius: 6px;
    padding: 10px 15px;
    height: 35px;
    outline: none;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.dark.hover};
    color: #fff;
`;

const ChatWrapper = styled.ul`
    border-radius: 10px 10px 0px 0px;
    border: 1px solid ${(props) => props.theme.dark.hover};
    background: ${(props) => props.theme.dark.component};
    height: calc(100vh - 128px);
    padding: 10px 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 15px;
    overflow: auto;
`;

const ChatInputWrapper = styled.div`
    height: 60px;
    background: #292929;
    border-radius: 0px 0px 10px 10px;
    border-right: 1px solid ${(props) => props.theme.dark.hover};
    border-left: 1px solid ${(props) => props.theme.dark.hover};
    border-bottom: 1px solid ${(props) => props.theme.dark.hover};
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 15px;
`;

const SendButton = styled.div`
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        scale: 1.1;
    }
`;

const ChatPage = () => {
    const userName = useAppSelector(getUserNameSelector);
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const socket = useRef<WebSocket>();

    useEffect(() => {
        console.log('mounted');
        socket.current = new WebSocket('ws://localhost:5001');

        socket.current.onopen = () => {
            const message = {
                event: 'connection',
                userName,
                id: Date.now(),
            };
            socket.current?.send(JSON.stringify(message));
        };
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prev: any) => [...prev, message]);
        };
        socket.current.onclose = () => {
            console.log('Socket закрыт');
        };
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка');
        };
    }, []);

    const onSendMessage = () => {
        if (value) {
            const message = {
                event: 'message',
                message: value,
                userName,
                id: Date.now(),
            };
            socket.current?.send(JSON.stringify(message));
            setValue('');
        }
    };

    return (
        <Layout>
            <ChatPageWrapper>
                <ChatWrapper>
                    {messages.map((message: any, i) => {
                        return (
                            <Message
                                message={message.message}
                                userName={message.userName}
                                key={i}
                            />
                        );
                    })}
                </ChatWrapper>
                <ChatInputWrapper>
                    <ChatInput
                        placeholder='Напишите сообщение...'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <SendButton onClick={onSendMessage}>
                        <svg
                            width='30px'
                            height='30px'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
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
            </ChatPageWrapper>
        </Layout>
    );
};

export default ChatPage;
