import React from 'react';
import styled from 'styled-components';

const AuthWrapper = styled.div`
    display: flex;
    row-gap: 20px;
    padding: 20px;
    justify-content: center;
    flex-wrap: wrap;
    margin: 70px auto;
    width: 300px;
    border: 1px solid ${(props) => props.theme.dark.text};
    background-color: ${(props) => props.theme.dark.component};
    border-radius: 15px;
`;

const AuthTitle = styled.div`
    font-weight: 700;
    font-size: 18px;
    color: #fff;
    margin-bottom: 15px;
`;

const AuthInput = styled.input`
    background-color: #424242;
    border: none;
    border-radius: 10px;
    color: #fff;
    height: 30px;
    padding: 15px;
    outline: none;
`;

const FileInput = styled.input`
    background-color: #424242;
    border: none;
    border-radius: 10px;
    color: #fff;
    height: 50px;
    padding: 15px;
    outline: none;
`;

const AuthSubTitle = styled.div`
    font-weight: 500;
    font-size: 15px;
    color: #fff;
`;

const Authorization = () => {
    return (
        <AuthWrapper>
            <AuthTitle>Cоздание аккаунта</AuthTitle>
            <AuthSubTitle>Выберите изображение</AuthSubTitle>
            <FileInput type={'file'} />
            <AuthInput placeholder='Полное имя' />
            <AuthInput placeholder='Email' type={'email'} />
            <AuthInput placeholder='Пароль' type={'password'} />
        </AuthWrapper>
    );
};

export default Authorization;
