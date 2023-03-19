import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';

const AuthWrapper = styled.form`
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

interface IInputProps {
    isError?: boolean;
}

const AuthInput = styled.input<IInputProps>`
    background-color: #424242;
    border: none;
    border-radius: 10px;
    color: #fff;
    height: 30px;
    padding: 15px;
    outline: none;
    ${(props) => {
        if (props.isError) {
            return 'border: 2px solid red';
        }
    }}
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

const AuthButton = styled(Button)`
    width: 180px;
    text-align: center;
`;

const Error = styled.div`
    color: red;
    font-size: 12px;
    font-weight: 500;
    margin-top: -10px;
`;

const Authorization = () => {
    const location = useLocation();

    const {
        handleSubmit,
        setError,
        formState: { errors, isValid },
        register,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: { email: string; password: string }) => {
        console.log(values);
    };

    if (location.pathname === '/login') {
        return (
            <AuthWrapper onSubmit={handleSubmit(onSubmit)}>
                <AuthTitle>Вход в аккаунт</AuthTitle>
                <AuthInput
                    placeholder='Email'
                    {...register('email', { required: 'Укажите почту' })}
                    type={'email'}
                    isError={!!errors.email}
                />
                {errors.email && <Error>{errors.email?.message}</Error>}
                <AuthInput
                    placeholder='Пароль'
                    {...register('password', { required: 'Укажите пароль' })}
                    type={'password'}
                    isError={!!errors.password}
                />
                {errors.password && <Error>{errors.password?.message}</Error>}
                <AuthButton>Войти</AuthButton>
            </AuthWrapper>
        );
    }

    return (
        <AuthWrapper onSubmit={handleSubmit(onSubmit)}>
            <AuthTitle>Cоздание аккаунта</AuthTitle>
            <AuthSubTitle>Выберите изображение</AuthSubTitle>
            <FileInput type={'file'} />
            <AuthInput placeholder='Полное имя' />
            <AuthInput placeholder='Email' type={'email'} />
            <AuthInput placeholder='Пароль' type={'password'} />
            <AuthButton>Зарегистрироваться</AuthButton>
        </AuthWrapper>
    );
};

export default Authorization;
