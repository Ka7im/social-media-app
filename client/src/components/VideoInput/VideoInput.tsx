import { useState } from 'react';
import MediaInput from '../MediaInput/MediaInput';
import { BsCameraVideoFill } from 'react-icons/bs';

type VideoInputProps = {
    setIsStopped: React.Dispatch<React.SetStateAction<boolean>>;
    setMedia: React.Dispatch<React.SetStateAction<Blob | null>>;
    videoRef: React.RefObject<HTMLVideoElement>;
};

const VideoInput = ({ setIsStopped, setMedia, videoRef }: VideoInputProps) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

    const handleStartRecording = (): void => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                setIsRecording(true);

                const mediaRecorder = new MediaRecorder(stream);
                setRecorder(mediaRecorder);

                mediaRecorder.addEventListener('dataavailable', (event) => {
                    if (event.data.size > 0) {
                        setMedia(event.data);

                        const url = URL.createObjectURL(event.data);

                        if (videoRef.current) {
                            videoRef.current.src = url;
                            console.log(videoRef.current.src);
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
        <MediaInput
            Icon={BsCameraVideoFill}
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
            isRecording={isRecording}
        />
    );
};

export default VideoInput;
