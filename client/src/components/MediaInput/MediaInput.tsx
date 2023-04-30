import { IconContext, IconType } from 'react-icons';

import './mediaInput.css';

type MediaProps = {
    isRecording: boolean;
    handleStartRecording: () => void;
    handleStopRecording: () => void;
    Icon: IconType;
};

const MediaInput = ({
    Icon,
    handleStartRecording,
    handleStopRecording,
    isRecording,
}: MediaProps) => {
    return (
        <IconContext.Provider
            value={{
                color: isRecording ? 'red' : '#6f6f6f',
                size: '20px',
                className: 'record-icon',
            }}
        >
            {isRecording ? (
                <Icon onClick={handleStopRecording} />
            ) : (
                <Icon onClick={handleStartRecording} />
            )}
        </IconContext.Provider>
    );
};

export default MediaInput;
