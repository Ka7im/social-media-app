import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { $host } from '../axios/axios';
import { useAppDispatch, useAppSelector } from '../redux/redux-hook';
import { fetchAuth, fetchRegister } from '../redux/slices/authSlice/authSlice';
import { isAuthSelector } from '../redux/slices/authSlice/selectors';
import { BASE_URL } from '../utils/consts';

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

const FileInput = styled.input<IInputProps>`
    background-color: #424242;
    border: none;
    border-radius: 10px;
    color: #fff;
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
    color: #fff;
`;

const AuthButton = styled.button`
    text-align: center;
    display: block;
    border: 1px solid #fff;
    color: #fff;
    padding: 10px;
    border-radius: 15px;
    font-size: 14px;
    font-weight: 500;
    width: 180px;
    cursor: pointer;
    text-decoration: none;
    background-color: transparent;

    &:hover {
        background-color: ${(props) => props.theme.dark.hover};
    }
`;

const Error = styled.div`
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
    const [avatarUrl, setAvatarUrl] = useState('');
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
            const formData = new FormData();
            formData.append('image', file as File);

            const { data } = await $host.post('/upload', formData);

            setAvatarUrl(data.url);
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
                        avatarUrl: `${BASE_URL}${avatarUrl}`,
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
                {errors.email && <Error>{errors.email?.message}</Error>}
                <AuthInput
                    placeholder='Пароль'
                    {...register('password', { required: 'Укажите пароль' })}
                    type={'password'}
                    isError={!!errors.password}
                />
                {errors.password && <Error>{errors.password?.message}</Error>}
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
            {errors.fullName && <Error>{errors.fullName?.message}</Error>}
            <AuthInput
                placeholder='Email'
                {...register('email', { required: 'Укажите пароль' })}
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
            <AuthButton disabled={!isValid} type='submit'>
                Зарегистрироваться
            </AuthButton>
        </AuthWrapper>
    );
};

export default Authorization;
