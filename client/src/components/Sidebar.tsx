import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CHAT_PAGE, MESSAGES_PAGE, POST_PAGE } from '../utils/consts';
import { ButtonWithIcon } from './ButtonWithIcon';

const Flex = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const ButtonTitle = styled.div`
    color: #fff;
    align-self: center;
    font-size: 13px;
`;

export const IconWrapper = styled.div`
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
                <Link to={POST_PAGE} style={{ textDecoration: 'none' }}>
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
                </Link>
                <Link to={MESSAGES_PAGE} style={{ textDecoration: 'none' }}>
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
                </Link>
                <Link to={CHAT_PAGE} style={{ textDecoration: 'none' }}>
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
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M23.7994 18.3704L23.8013 18.373C24.1307 18.8032 24.2888 20.2316 22.0258 19.9779C21.3596 19.9033 20.4282 19.7715 19.3088 19.3471C18.5551 19.0613 17.8986 18.7026 17.3584 18.3522C16.4699 18.7098 15.5118 18.9296 14.5113 18.9857C13.1436 20.8155 10.9602 22 8.50001 22C7.69152 22 6.91135 21.8717 6.17973 21.6339C5.74016 21.8891 5.24034 22.1376 4.68789 22.3471C3.56851 22.7715 2.63949 22.9297 1.97092 22.9779C1.47028 23.014 1.11823 22.9883 0.944098 22.9681C0.562441 22.9239 0.219524 22.7064 0.072134 22.3397C-0.0571899 22.0179 -0.0104055 21.6519 0.195537 21.3728C0.448192 21.0283 0.680439 20.6673 0.899972 20.3011C1.32809 19.5868 1.74792 18.8167 1.85418 17.9789C1.30848 16.9383 1.00001 15.7539 1.00001 14.5C1.00001 11.5058 2.75456 8.92147 5.29159 7.71896C6.30144 3.85296 9.81755 1 14 1C18.9706 1 23 5.02944 23 10C23 11.3736 22.6916 12.6778 22.1395 13.8448C21.9492 15.5687 22.8157 17.0204 23.7994 18.3704ZM7.00001 10C7.00001 6.13401 10.134 3 14 3C17.866 3 21 6.13401 21 10C21 11.1198 20.7378 12.1756 20.2723 13.1118C20.2242 13.2085 20.1921 13.3124 20.1772 13.4194C19.9584 14.9943 20.3278 16.43 21.0822 17.8083C19.9902 17.5451 18.9611 17.0631 18.0522 16.4035C17.7546 16.1875 17.3625 16.1523 17.0312 16.3117C16.1152 16.7525 15.0879 17 14 17C10.134 17 7.00001 13.866 7.00001 10ZM5.00353 10.2543C5.11889 14.4129 8.05529 17.8664 11.9674 18.7695C11.0213 19.5389 9.8145 20 8.50001 20C7.7707 20 7.07689 19.8586 6.44271 19.6026C6.14147 19.481 5.79993 19.5133 5.52684 19.6892C5.08797 19.972 4.56616 20.2543 3.9788 20.477C3.58892 20.6248 3.23263 20.7316 2.91446 20.8083C3.24678 20.2012 3.58332 19.4779 3.73844 18.7971C3.81503 18.461 3.8572 18.1339 3.87625 17.8266C3.88848 17.6293 3.84192 17.4327 3.74245 17.2618C3.27058 16.451 3.00001 15.5086 3.00001 14.5C3.00001 12.7904 3.78 11.263 5.00353 10.2543Z'
                                        fill='#71aaeb'
                                    ></path>{' '}
                                </g>
                            </svg>
                        </IconWrapper>
                        <ButtonTitle>Чат</ButtonTitle>
                    </ButtonWithIcon>
                </Link>
            </ButtonsWrapper>
        </Flex>
    );
};

export default Sidebar;
