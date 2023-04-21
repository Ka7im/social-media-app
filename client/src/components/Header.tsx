import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../redux/redux-hook';
import { logout } from '../redux/slices/authSlice/authSlice';
import { isAuthSelector } from '../redux/slices/authSlice/selectors';
import { Button } from './Button';
import { Container } from './Container';
import Search from './Search';

const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.colors.componentBg};
    height: 48px;
    margin-bottom: 10px;
`;

const FlexBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonWrapper = styled.div`
    display: grid;
    column-gap: 10px;
    grid-template-columns: 60px 130fr;
`;

const Logo = styled.h1`
    color: ${(props) => props.theme.colors.font};
    font-weight: 700;
`;

const Header = () => {
    const isAuth = useAppSelector(isAuthSelector);
    const location = useLocation();
    const dispatch = useAppDispatch();

    const isAuthOrRegisterPage =
        location.pathname === '/authorization' || location.pathname === '/login'
            ? true
            : false;

    const onClickLogout = () => {
        dispatch(logout());
    };
    return (
        <HeaderWrapper>
            <Container>
                <FlexBetween>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Logo>SOCIAPEDIA</Logo>
                    </Link>
                    {!isAuthOrRegisterPage && <Search />}
                    <ButtonWrapper>
                        {isAuth ? (
                            <Link
                                to='/login'
                                style={{ textDecoration: 'none' }}
                                onClick={onClickLogout}
                            >
                                <Button>Выйти</Button>
                            </Link>
                        ) : (
                            <Link
                                to='/login'
                                style={{ textDecoration: 'none' }}
                            >
                                <Button>Войти</Button>
                            </Link>
                        )}
                        <Link
                            to='/authorization'
                            style={{ textDecoration: 'none' }}
                        >
                            <Button>Создать аккаунт</Button>
                        </Link>
                    </ButtonWrapper>
                </FlexBetween>
            </Container>
        </HeaderWrapper>
    );
};

export default Header;
