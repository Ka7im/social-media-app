import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { $authHost, $host } from '../../../axios/axios';
import { IUser } from '../../../types/User';
import { Status } from '../postsSlice/postsSlice';

interface IAuthSlice {
    data: IUser | null;
    status: Status;
}

const initialState: IAuthSlice = {
    data: null,
    status: Status.Loading,
};

export const fetchAuth = createAsyncThunk(
    'auth/fetchUserData',
    async ({ email, password }: { email: string; password: string }) => {
        const { data } = await $host.post('auth/login', { email, password });

        localStorage.setItem('token', data.token);

        const { token, ...payload } = data;

        return payload;
    }
);

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
    const { data } = await $authHost.get('/auth/me');
    return data;
});

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (values: { email: string; password: string; fullName: string; avatarUrl: string }) => {
        const { data } = await $host.post('/auth/register', values);

        localStorage.setItem('token', data.token);

        const { token, ...payload } = data;

        return payload;
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = Status.Loading;
                state.data = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.data = action.payload;
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
                state.status = Status.Success;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = Status.Error;
                state.data = null;
            });
    },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
