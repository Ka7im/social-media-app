
import styled from 'styled-components';
import { IUser } from '../types/User';

const DialogWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    border-bottom: 1px solid ${(props) => props.theme.dark.hover};
    cursor: pointer;

    &:hover {
        background: ${(props) => props.theme.dark.selected};
    }

    &:first-child {
        border-radius: 10px 10px 0 0;
    }

    &:last-child {
        border-radius: 0 0 10px 10px;
        border: none;
    }
`;

const Avatar = styled.img`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 15px;
`;

const DialogInfo = styled.div`
    display: grid;
    row-gap: 5px;
`;

const UserName = styled.div`
    color: #71aaeb;
    font-weight: 700;
    font-size: 14px; ;
`;

const Mess = styled.div`
    font-size: 13px;
    color: #fff;
    font-weight: 400;
`;

type DialogProps = {
    onClick: () => void;
    userData: IUser;
};

const Dialog = ({ onClick, userData }: DialogProps) => {
    return (
        <DialogWrapper onClick={onClick}>
            <Avatar src={userData.avatarUrl} />
            <DialogInfo>
                <UserName>{userData.fullName}</UserName>
                <Mess>Message</Mess>
            </DialogInfo>
        </DialogWrapper>
    );
};

export default Dialog;
