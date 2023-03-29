import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { $authHost, $host } from '../../../axios/axios';
import { IPost } from '../../../types/Post';

export enum Status {
    Loading = 'loading',
    Success = 'success',
    Error = 'error',
}

interface IPostsSlice {
    posts: {
        items: IPost[];
        status: Status;
    };
    tags: {
        items: string[];
        status: Status;
    };
}

const initialState: IPostsSlice = {
    posts: {
        items: [],
        status: Status.Loading,
    },
    tags: {
        items: [],
        status: Status.Loading,
    },
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await $host.get('/posts');

    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await $host.get('/tags');

    return data;
});

export const fetchRemovePost = createAsyncThunk(
    'posts/fetchRemovePost',
    async (id: string) => {
        const { data } = await $authHost.delete(`posts/${id}`);

        return {
            id,
            tags: data.post.tags,
        };
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.posts.items = [];
                state.posts.status = Status.Loading;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts.items = action.payload;
                state.posts.status = Status.Success;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.posts.items = [];
                state.posts.status = Status.Error;
            })
            .addCase(fetchTags.pending, (state) => {
                state.tags.items = [];
                state.tags.status = Status.Loading;
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags.items = action.payload;
                state.tags.status = Status.Success;
            })
            .addCase(fetchTags.rejected, (state) => {
                state.tags.items = [];
                state.tags.status = Status.Error;
            })
            .addCase(fetchRemovePost.fulfilled, (state, action) => {
                state.posts.items = state.posts.items.filter(
                    (post) => post._id !== action.payload.id
                );
                state.tags.items = state.tags.items.filter((tag) => {
                    let isEqual = true;

                    if (tag.length === action.payload.tags.length) {
                        for (let i = 0; i < tag.length; i++) {
                            if (tag[i] !== action.payload.tags[i]) {
                                isEqual = false;
                                break;
                            }
                        }
                    }

                    return !isEqual;
                });
            });
    },
});

export const postsReducer = postsSlice.reducer;
