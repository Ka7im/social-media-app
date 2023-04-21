import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { $host } from '../axios/axios';
import { IUser } from '../types/User';
import { Avatar } from './Post';
import MessageModal from './MessageModal';

const SearchWrapper = styled.div`
    poslition: relative;
`;

const SearchInput = styled.input`
    background-color: ${(props) => props.theme.colors.componentBg};
    border: 1px solid ${(props) => props.theme.colors.font};
    color: ${(props) => props.theme.colors.font};
    outline: none;
    padding: 10px;
    border-radius: 10px;
    width: 280px;

    &::placeholder {
        color: ${(props) => props.theme.colors.font};
    }
`;

const UsersWrapper = styled.ul`
    position: absolute;
    background-color: ${(props) => props.theme.colors.componentBg};
    border: 1px solid ${(props) => props.theme.colors.font};
    border-radius: 10px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;

const User = styled.li`
    display: flex;
    column-gap: 10px;
    align-items: center;
    padding: 5px;
    border-radius: 10px;
    transition: 0.3s all ease;
`;

const UserName = styled.div`
    color: ${(props) => props.theme.colors.font};
`;

const MessageIcon = styled.div`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.hover};
    }
`;

const Search = () => {
    const [value, setValue] = useState('');
    const [users, setUsers] = useState<IUser[]>([]);
    const [isModalActive, setIsModalActive] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);

        if (e.target.value) {
            $host
                .get('/search', {
                    params: {
                        fullName: e.target.value,
                    },
                })
                .then(({ data }) => setUsers(data));
        } else {
            setUsers([]);
        }
    };

    return (
        <SearchWrapper>
            <SearchInput
                id='searchInput'
                placeholder='Поиск'
                value={value}
                onChange={handleChange}
            ></SearchInput>
            {users.at(0) && (
                <UsersWrapper>
                    {users.map((user) => {
                        return (
                            <User key={user._id}>
                                <Avatar src={user.avatarUrl} />
                                <UserName>{user.fullName}</UserName>
                                <MessageIcon
                                    onClick={() => {
                                        setIsModalActive(true);
                                        setSelectedUser(user);
                                    }}
                                >
                                    <svg
                                        width='20px'
                                        height='20px'
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
                                            stroke='#CCCCCC'
                                            stroke-width='1.8240000000000003'
                                        ></g>
                                        <g id='SVGRepo_iconCarrier'>
                                            {' '}
                                            <g id='Communication / Chat_Circle'>
                                                {' '}
                                                <path
                                                    id='Vector'
                                                    d='M7.50977 19.8018C8.83126 20.5639 10.3645 21 11.9996 21C16.9702 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.6351 3.43604 15.1684 4.19819 16.4899L4.20114 16.495C4.27448 16.6221 4.31146 16.6863 4.32821 16.7469C4.34401 16.804 4.34842 16.8554 4.34437 16.9146C4.34003 16.9781 4.3186 17.044 4.27468 17.1758L3.50586 19.4823L3.50489 19.4853C3.34268 19.9719 3.26157 20.2152 3.31938 20.3774C3.36979 20.5187 3.48169 20.6303 3.62305 20.6807C3.78482 20.7384 4.02705 20.6577 4.51155 20.4962L4.51758 20.4939L6.82405 19.7251C6.95537 19.6813 7.02214 19.6591 7.08559 19.6548C7.14475 19.6507 7.19578 19.6561 7.25293 19.6719C7.31368 19.6887 7.37783 19.7257 7.50563 19.7994L7.50977 19.8018Z'
                                                    stroke='#71aaeb'
                                                    stroke-width='2'
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                ></path>{' '}
                                            </g>{' '}
                                        </g>
                                    </svg>
                                </MessageIcon>
                            </User>
                        );
                    })}
                </UsersWrapper>
            )}
            <MessageModal
                isActive={isModalActive}
                setIsActive={setIsModalActive}
                user={selectedUser}
            />
        </SearchWrapper>
    );
};

export default Search;
