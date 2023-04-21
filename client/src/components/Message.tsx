import styled from 'styled-components';

export const MessageWrapper = styled.li`
    display: flex;
    column-gap: 15px;
    width: 100%;
    height: min-content;
`;

const Avatar = styled.img`
    border-radius: 50%;
    width: 36px;
    height: 36px;
`;

const InfoWrapper = styled.div`
    display: grid:
`;

const UserName = styled.div`
    color: ${(props) => props.theme.mainColor};
    font-weight: 700;
    font-size: 12.5px;
`;

const Mess = styled.div`
    font-size: 15px;
    color: ${(props) => props.theme.colors.font};
    font-weight: 400;
`;

type MessageProps = {
    message: string;
    userName: string;
    avatarUrl: string;
};

const Message = ({ message, userName, avatarUrl }: MessageProps) => {
    return (
        <MessageWrapper>
            <Avatar src={avatarUrl} />
            <InfoWrapper>
                <UserName>{userName}</UserName>
                <Mess>{message}</Mess>
            </InfoWrapper>
        </MessageWrapper>
    );
};

export default Message;
