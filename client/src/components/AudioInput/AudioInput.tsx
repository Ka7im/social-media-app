import { useState } from 'react';
import { IconContext } from 'react-icons';
import { BsRecordCircle } from 'react-icons/bs';

import './audioInput.css';
import styled from 'styled-components';

const AudioInputWrapper = styled.div`
    position: relative;
`;

type AudioInputType = {
    setIsStopped: React.Dispatch<React.SetStateAction<boolean>>;
    setMedia: React.Dispatch<React.SetStateAction<Blob | null>>;
    audioRef: React.RefObject<HTMLAudioElement>;
};

const AudioInput = ({ setIsStopped, setMedia, audioRef }: AudioInputType) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

    const handleStartRecording = (): void => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                setIsRecording(true);

                const mediaRecorder = new MediaRecorder(stream);
                setRecorder(mediaRecorder);

                mediaRecorder.addEventListener('dataavailable', (event) => {
                    if (event.data.size > 0) {
                        setMedia(event.data);

                        const url = URL.createObjectURL(event.data);

                        if (audioRef.current) {
                            audioRef.current.src = url;
                            setIsStopped(true);
                        }
                    }
                });

                mediaRecorder.start();
            })
            .catch((error) => {
                console.error(
                    'Не удалось получить доступ к медиа устройству',
                    error
                );
            });
    };

    const handleStopRecording = (): void => {
        recorder?.stop();
        setIsRecording(false);
    };

    return (
        <AudioInputWrapper>
            <IconContext.Provider
                value={{
                    color: isRecording ? 'red' : '#6f6f6f',
                    size: '20px',
                    className: 'record-icon',
                }}
            >
                {isRecording ? (
                    <BsRecordCircle onClick={handleStopRecording} />
                ) : (
                    <BsRecordCircle onClick={handleStartRecording} />
                )}
            </IconContext.Provider>
        </AudioInputWrapper>
    );
};

export default AudioInput;
