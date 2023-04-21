import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Message from '../components/Message';
import { useAppSelector } from '../redux/redux-hook';
import { getUserNameSelector } from '../redux/slices/authSlice/selectors';

export const ChatPageWrapper = styled.div`
    display: grid;
`;

export const ChatInput = styled.input`
    width: 400px;
    border-radius: 6px;
    padding: 10px 15px;
    height: 35px;
    outline: none;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.colors.border};
    color: ${(props) => props.theme.colors.font};
`;

export const ChatWrapper = styled.ul`
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

export const ChatInputWrapper = styled.form`
    height: 60px;
    background: ${(props) => props.theme.colors.componentBg};
    border-radius: 0px 0px 10px 10px;
    border-right: 1px solid ${(props) => props.theme.colors.border};
    border-left: 1px solid ${(props) => props.theme.colors.border};
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 15px;
`;

export const SendButton = styled.button`
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;
    border: none;

    &:hover {
        scale: 1.1;
    }
`;

export const ClipButton = styled.button`
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;
    border: none;

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

    const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
                                avatarUrl=''
                                message={message.message}
                                userName={message.userName}
                                key={i}
                            />
                        );
                    })}
                </ChatWrapper>
                <ChatInputWrapper onSubmit={onSendMessage}>
                    <ChatInput
                        placeholder='Напишите сообщение...'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <ClipButton>
                        <svg
                            width='20px'
                            height='20px'
                            viewBox='0 0 20 20'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='#000000'
                        >
                            <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                            <g
                                id='SVGRepo_tracerCarrier'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            ></g>
                            <g id='SVGRepo_iconCarrier'>
                                {' '}
                                <title>images [#6f6f6f]</title>{' '}
                                <desc>Created with Sketch.</desc> <defs> </defs>{' '}
                                <g
                                    id='Page-1'
                                    stroke='none'
                                    stroke-width='1'
                                    fill='none'
                                    fill-rule='evenodd'
                                >
                                    {' '}
                                    <g
                                        id='Dribbble-Light-Preview'
                                        transform='translate(-180.000000, -3919.000000)'
                                        fill='#6f6f6f'
                                    >
                                        {' '}
                                        <g
                                            id='icons'
                                            transform='translate(56.000000, 160.000000)'
                                        >
                                            {' '}
                                            <path
                                                d='M135.083,3769.667 C136.188,3769.667 137.083,3768.772 137.083,3767.667 C137.083,3766.562 136.188,3765.667 135.083,3765.667 C133.979,3765.667 133.083,3766.562 133.083,3767.667 C133.083,3768.772 133.979,3769.667 135.083,3769.667 L135.083,3769.667 Z M126,3777 L127.956,3777 L130.824,3773.882 L127.594,3770.402 L126,3771.996 L126,3777 Z M126,3769.167 L127.578,3767.589 L127.594,3767.605 L127.61,3767.589 L132.238,3772.218 L133.669,3770.787 L133.685,3770.803 L133.701,3770.787 L138,3775.086 L138,3765 L126,3765 L126,3769.167 Z M136.586,3777 L133.685,3774.099 L130.784,3777 L136.586,3777 Z M124,3779 L140,3779 L140,3763 L124,3763 L124,3779 Z M144,3759 L144,3775 L142,3775 L142,3761 L128,3761 L128,3759 L144,3759 Z'
                                                id='images-[#6f6f6f]'
                                            >
                                                {' '}
                                            </path>{' '}
                                        </g>{' '}
                                    </g>{' '}
                                </g>{' '}
                            </g>
                        </svg>
                    </ClipButton>
                    <SendButton type='submit'>
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
