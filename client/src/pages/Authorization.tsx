import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { $host } from '../axios/axios';
import { useAppDispatch, useAppSelector } from '../redux/redux-hook';
import { fetchAuth, fetchRegister } from '../redux/slices/authSlice/authSlice';
import {
    getThemeSelector,
    isAuthSelector,
} from '../redux/slices/authSlice/selectors';
import { BASE_URL } from '../utils/consts';
import { uploadFile } from '../utils/api/uploadFile';

const AuthWrapper = styled.form`
    display: flex;
    row-gap: 20px;
    padding: 20px;
    justify-content: center;
    flex-wrap: wrap;
    margin: 70px auto;
    width: 300px;
    border: 1px solid ${(props) => props.theme.colors.border};
    background-color: ${(props) => props.theme.colors.componentBg};
    border-radius: 15px;
`;

const AuthTitle = styled.div`
    font-weight: 700;
    font-size: 18px;
    color: ${(props) => props.theme.colors.font};
    margin-bottom: 15px;
`;

interface IInputProps {
    isError?: boolean;
}

const AuthInput = styled.input<IInputProps>`
    background-color: ${(props) => props.theme.colors.input};
    border: none;
    border-radius: 10px;
    color: ${(props) => props.theme.colors.font};
    height: 30px;
    padding: 15px;
    outline: none;
    ${(props) => {
        if (props.isError) {
            return 'border: 2px solid red';
        }
    }}
`;

const FileInput = styled.input<IInputProps>`
    background-color: ${(props) => props.theme.colors.input};
    border: none;
    border-radius: 10px;
    color: ${(props) => props.theme.colors.font};
    height: 50px;
    padding: 15px;
    outline: none;

    ${(props) => {
        if (props.isError) {
            return 'border: 2px solid red';
        }
    }}
`;

const AuthSubTitle = styled.div`
    font-weight: 500;
    font-size: 15px;
    color: ${(props) => props.theme.colors.font};
`;

const AuthButton = styled.button`
    text-align: center;
    display: block;
    border: 1px solid ${(props) => props.theme.colors.font};
    color: ${(props) => props.theme.colors.font};
    padding: 10px;
    border-radius: 15px;
    font-size: 14px;
    font-weight: 500;
    width: 180px;
    cursor: pointer;
    text-decoration: none;
    background-color: transparent;

    &:hover {
        background-color: ${(props) => props.theme.colors.hover};
    }
`;

const ErrorWarn = styled.div`
    color: red;
    font-size: 12px;
    font-weight: 500;
    margin-top: -10px;
`;

const AuthAvatar = styled.img`
    border-radius: 50%;
    margin: 0 50px;
    width: 100px;
    height: 100px;
    object-fit: cover;
    cursor: pointer;
`;

const isString = (param: any): param is string => {
    return typeof param === 'string';
};

const Authorization = () => {
    const [avatarUrl, setAvatarUrl] = useState(`/uploads/camera_50.png`);
    const [isAfterSubmit, setIsAfterSubmit] = useState(false);
    const isAuth = useAppSelector(isAuthSelector);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isLogin = location.pathname === '/login';

    const {
        handleSubmit,
        formState: { errors, isValid },
        register,
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
            fullName: '',
        },
    });

    const onSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.item(0);
            if (file) {
                const data = await uploadFile(file);
                setAvatarUrl(data.url);
            } else {
                throw new Error('Файл не выбран');
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const onSubmit = (values: {
        email: string;
        password: string;
        fullName?: string;
    }) => {
        if (isLogin) {
            dispatch(fetchAuth(values));
        } else {
            if (isString(values.fullName)) {
                dispatch(
                    fetchRegister({
                        ...(values as {
                            email: string;
                            password: string;
                            fullName: string;
                        }),
                        avatarUrl,
                    })
                );
                setIsAfterSubmit(true);
            }
        }
    };

    if (isAuth && isAfterSubmit) {
        navigate('/');
        setIsAfterSubmit(false);
    }

    if (isAuth && isLogin) {
        return <Navigate to='/' />;
    }

    if (isLogin) {
        return (
            <AuthWrapper onSubmit={handleSubmit(onSubmit)}>
                <AuthTitle>Вход в аккаунт</AuthTitle>
                <AuthInput
                    placeholder='Email'
                    {...register('email', { required: 'Укажите почту' })}
                    type={'email'}
                    isError={!!errors.email}
                />
                {errors.email && <ErrorWarn>{errors.email?.message}</ErrorWarn>}
                <AuthInput
                    placeholder='Пароль'
                    {...register('password', { required: 'Укажите пароль' })}
                    type={'password'}
                    isError={!!errors.password}
                />
                {errors.password && (
                    <ErrorWarn>{errors.password?.message}</ErrorWarn>
                )}
                <AuthButton disabled={!isValid} type='submit'>
                    Войти
                </AuthButton>
            </AuthWrapper>
        );
    }

    return (
        <AuthWrapper onSubmit={handleSubmit(onSubmit)}>
            <AuthTitle>Cоздание аккаунта</AuthTitle>
            <AuthSubTitle>Выберите изображение</AuthSubTitle>
            <FileInput
                type={'file'}
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={onSelectImage}
            />
            <AuthAvatar
                src={
                    (avatarUrl && `${BASE_URL}${avatarUrl}`) ||
                    `${BASE_URL}/uploads/camera_50.png`
                }
                onClick={() => {
                    if (fileInputRef.current) {
                        fileInputRef.current.click();
                    }
                }}
            />
            <AuthInput
                placeholder='Полное имя'
                {...register('fullName', { required: 'Укажите полное имя' })}
                isError={!!errors.fullName}
            />
            {errors.fullName && (
                <ErrorWarn>{errors.fullName?.message}</ErrorWarn>
            )}
            <AuthInput
                placeholder='Email'
                {...register('email', { required: 'Укажите пароль' })}
                type={'email'}
                isError={!!errors.email}
            />
            {errors.email && <ErrorWarn>{errors.email?.message}</ErrorWarn>}
            <AuthInput
                placeholder='Пароль'
                {...register('password', { required: 'Укажите пароль' })}
                type={'password'}
                isError={!!errors.password}
            />
            {errors.password && (
                <ErrorWarn>{errors.password?.message}</ErrorWarn>
            )}
            <AuthButton disabled={!isValid} type='submit'>
                Зарегистрироваться
            </AuthButton>
        </AuthWrapper>
    );
};

export default Authorization;
