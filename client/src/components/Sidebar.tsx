import React from 'react';
import styled from 'styled-components';
import { ButtonWithIcon } from './ButtonWithIcon';

const Flex = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ButtonTitle = styled.div`
    color: #fff;
    align-self: center;
    font-size: 13px;
`;

const IconWrapper = styled.div`
    align-self: center;
    justify-self: center;
    padding-top: 3px;
`;

const ButtonsWrapper = styled.div`
    width: 100%;
    
`;

const Sidebar = () => {
    return (
        <Flex>
            <ButtonsWrapper>
                <ButtonWithIcon>
                    <IconWrapper>
                        <svg
                            width='20px'
                            height='20px'
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
                                    d='M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z'
                                    stroke='#71aaeb'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                ></path>{' '}
                                <path
                                    d='M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z'
                                    stroke='#71aaeb'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                ></path>{' '}
                                <path
                                    d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                                    stroke='#71aaeb'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                ></path>{' '}
                            </g>
                        </svg>
                    </IconWrapper>
                    <ButtonTitle>Моя страница</ButtonTitle>
                </ButtonWithIcon>
                <ButtonWithIcon>
                    <IconWrapper>
                        <svg
                            width='20px'
                            height='20px'
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
                                <g clip-path='url(#clip0_429_11031)'>
                                    {' '}
                                    <path
                                        d='M3 4V18C3 19.1046 3.89543 20 5 20H17H19C20.1046 20 21 19.1046 21 18V8H17'
                                        stroke='#71aaeb'
                                        stroke-width='1.5'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    ></path>{' '}
                                    <path
                                        d='M3 4H17V18C17 19.1046 17.8954 20 19 20V20'
                                        stroke='#71aaeb'
                                        stroke-width='1.5'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    ></path>{' '}
                                    <path
                                        d='M13 8L7 8'
                                        stroke='#71aaeb'
                                        stroke-width='1.5'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    ></path>{' '}
                                    <path
                                        d='M13 12L9 12'
                                        stroke='#71aaeb'
                                        stroke-width='1.5'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    ></path>{' '}
                                </g>{' '}
                                <defs>
                                    {' '}
                                    <clipPath id='clip0_429_11031'>
                                        {' '}
                                        <rect
                                            width='24'
                                            height='24'
                                            fill='white'
                                        ></rect>{' '}
                                    </clipPath>{' '}
                                </defs>{' '}
                            </g>
                        </svg>
                    </IconWrapper>
                    <ButtonTitle>Посты</ButtonTitle>
                </ButtonWithIcon>
                <ButtonWithIcon>
                    <IconWrapper>
                        <svg
                            width='25px'
                            height='25px'
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
                                    d='M7 4C4.79086 4 3 5.79073 3 7.9997V13.2642C3 15.4732 4.79086 17.2639 7 17.2639L7 19.8998C7 19.9834 7.09639 20.0301 7.16197 19.9783L10.6 17.2639H17C19.2091 17.2639 21 15.4732 21 13.2642V7.99971C21 5.79073 19.2091 4 17 4H7Z'
                                    stroke='#71aaeb'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                ></path>{' '}
                                <path
                                    d='M9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z'
                                    fill='#71aaeb'
                                ></path>{' '}
                                <path
                                    d='M13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11Z'
                                    fill='#71aaeb'
                                ></path>{' '}
                                <path
                                    d='M17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11Z'
                                    fill='#71aaeb'
                                ></path>{' '}
                            </g>
                        </svg>
                    </IconWrapper>
                    <ButtonTitle>Сообщения</ButtonTitle>
                </ButtonWithIcon>
            </ButtonsWrapper>
        </Flex>
    );
};

export default Sidebar;
