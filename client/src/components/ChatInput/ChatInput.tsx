import React, { useRef, useState } from 'react';
import Emoji from '../Emoji/Emoji';
import { SendButton } from '../../pages/ChatPage';
import styled from 'styled-components';
import AudioInput from '../AudioInput/AudioInput';
import { $host } from '../../axios/axios';

type ChatInputProps = {
    to: string;
    socket: React.MutableRefObject<WebSocket | undefined>;
};

const ChatInputWrapper = styled.div`
    height: 60px;
    background: ${(props) => props.theme.colors.componentBg};
    border-radius: 0px 0px 10px 10px;
    border-right: 1px solid ${(props) => props.theme.colors.border};
    border-left: 1px solid ${(props) => props.theme.colors.border};
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
`;

const ChatForm = styled.form`
    height: 60px;
    background: ${(props) => props.theme.colors.componentBg};
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 15px;
`;

interface IInput {
    isVisible: boolean;
}

const Input = styled.input<IInput>`
    display: ${(props) => (!props.isVisible ? 'none' : 'block')};
    width: 400px;
    border-radius: 6px;
    padding: 10px 15px;
    height: 35px;
    outline: none;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.colors.border};
    color: ${(props) => props.theme.colors.font};
`;

interface IAudioControl {
    isVisible: boolean;
}

const AudioControl = styled.audio<IAudioControl>`
    display: ${(props) => (!props.isVisible ? 'none' : 'block')};
`;

const ChatInput = ({ to, socket }: ChatInputProps) => {
    const [value, setValue] = useState('');
    const [media, setMedia] = useState<Blob | null>(null);
    const [isStopped, setIsStopped] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const onSendPrivateMessage = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (value && !media) {
            const message = {
                event: 'private-message',
                message: value,
                token: localStorage.getItem('token'),
                to,
            };
            socket.current?.send(JSON.stringify(message));
            setValue('');
        } else if (media) {
            const formData = new FormData();
            formData.append('file', media);

            const { data } = await $host.post('/upload', formData);

            const message = {
                event: 'private-message',
                audioUrl: data.url,
                token: localStorage.getItem('token'),
                to,
            };
            socket.current?.send(JSON.stringify(message));
            setMedia(null);
            setIsStopped(false);
        }
    };

    return (
        <ChatInputWrapper>
            <ChatForm onSubmit={onSendPrivateMessage}>
                <Input
                    isVisible={!isStopped}
                    placeholder='Напишите сообщение...'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <AudioControl ref={audioRef} isVisible={isStopped} controls />
                <Emoji setValue={setValue} />
                <AudioInput
                    setIsStopped={setIsStopped}
                    setMedia={setMedia}
                    audioRef={audioRef}
                />
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
            </ChatForm>
        </ChatInputWrapper>
    );
};

export default ChatInput;
