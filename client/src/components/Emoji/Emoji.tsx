import React, { useState } from 'react';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { BsEmojiSmile } from 'react-icons/bs';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/redux-hook';
import { getThemeSelector } from '../../redux/slices/authSlice/selectors';
import { ThemeEnums } from '../../types/styled';

const SmilesButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const EmojiWrapper = styled.div`
    position: relative;
`;

const EmojiPickerWrapper = styled.div`
    position: absolute;
    top: -415px;
    right: 0;
`;

type EmojiProps = {
    setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Emoji = ({ setValue }: EmojiProps) => {
    const theme = useAppSelector(getThemeSelector);
    const pickerTheme =
        theme.type === ThemeEnums.dark ? Theme.DARK : Theme.LIGHT;
    const [isPickerSelected, setIsPickerSelected] = useState(false);

    return (
        <EmojiWrapper>
            <SmilesButton onClick={() => setIsPickerSelected((prev) => !prev)}>
                <BsEmojiSmile />
            </SmilesButton>
            {isPickerSelected && (
                <EmojiPickerWrapper>
                    <EmojiPicker
                        theme={pickerTheme}
                        height={400}
                        width={300}
                        onEmojiClick={(data) => {
                            setValue((prev) => {
                                return prev + data.emoji;
                            });
                        }}
                    />
                </EmojiPickerWrapper>
            )}
        </EmojiWrapper>
    );
};

export default Emoji;
