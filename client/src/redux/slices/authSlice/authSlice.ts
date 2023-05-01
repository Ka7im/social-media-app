import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { $authHost, $host } from '../../../axios/axios';
import { IUser } from '../../../types/User';
import { Status } from '../postsSlice/postsSlice';
import { ThemeEnums } from '../../../types/styled';
import { DefaultTheme } from 'styled-components';
import { darkTheme, lightTheme } from '../../../utils/theme';

interface IAuthSlice {
    data: IUser | null;
    status: Status;
    theme: DefaultTheme;
    postFilter: string;
}

const initialState: IAuthSlice = {
    data: null,
    status: Status.Loading,
    theme: lightTheme,
    postFilter: '',
};

export const updateUserInfo = createAsyncThunk(
    'auth/updateUserInfo',
    async (payload: {
        id: string | undefined;
        birthday: string;
        city: string;
        education: string;
        familyStatus: string;
        avatarUrl: string;
    }) => {
        const { data } = await $authHost.patch('/auth', payload);

        return data as IUser;
    }
);

export const fetchAuth = createAsyncThunk(
    'auth/fetchUserData',
    async ({ email, password }: { email: string; password: string }) => {
        const { data } = await $host.post('auth/login', { email, password });

        localStorage.setItem('token', data.token);

        const { token, ...payload } = data;

        return payload as IUser;
    }
);

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
    const { data } = await $authHost.get('/auth/me');
    return data as IUser;
});

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (values: {
        email: string;
        password: string;
        fullName: string;
        avatarUrl: string;
    }) => {
        const { data } = await $host.post('/auth/register', values);

        localStorage.setItem('token', data.token);

        const { token, ...payload } = data;

        return payload as IUser;
    }
);

export const toggleTheme = createAsyncThunk(
    'auth/toggleTheme',
    async (theme: ThemeEnums) => {
        const { data } = await $authHost.post('/theme', { theme });

        return data as ThemeEnums;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            localStorage.removeItem('token');
        },
        setFilterTag: (state, action) => {
            state.postFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(toggleTheme.fulfilled, (state, action) => {
                state.theme =
                    action.payload === ThemeEnums.light
                        ? lightTheme
                        : darkTheme;
            })
            .addCase(fetchAuth.pending, (state) => {
                state.status = Status.Loading;
                state.data = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.data = action.payload;
                state.theme =
                    action.payload.theme === ThemeEnums.light
                        ? lightTheme
                        : darkTheme;
                state.status = Status.Success;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = Status.Error;
                state.data = null;
            })
            .addCase(checkAuth.pending, (state) => {
                state.status = Status.Loading;
                state.data = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.data = action.payload;
                state.theme =
                    action.payload.theme === ThemeEnums.light
                        ? lightTheme
                        : darkTheme;
                state.status = Status.Success;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.status = Status.Error;
                state.data = null;
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = Status.Loading;
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.data = action.payload;
                state.theme =
                    action.payload.theme === ThemeEnums.light
                        ? lightTheme
                        : darkTheme;
                state.status = Status.Success;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = Status.Error;
                state.data = null;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.data = action.payload;
            });
    },
});

export const authReducer = authSlice.reducer;

export const { logout, setFilterTag } = authSlice.actions;
