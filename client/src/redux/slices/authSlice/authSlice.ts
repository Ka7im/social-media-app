import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { $host } from '../../../axios/axios';
import { Status } from '../postsSlice/postsSlice';

const initialState = {
    data: null,
    status: Status.Loading,
};

export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async ({ email, password }: { email: string; password: string }) => {
        const { data } = await $host.post('auth/login', { email, password });

        localStorage.setItem('token', data.token);

        const { token, ...payload } = data;

        return payload;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = Status.Loading;
                state.data = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = Status.Success;
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.status = Status.Error;
                state.data = null;
            });
    },
});

export const authReducer = authSlice.reducer;
