import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { $authHost, $host } from '../../../axios/axios';
import { IPost } from '../../../types/Post';

export enum Status {
    FirstLoading = 'firstLoading',
    Loading = 'loading',
    Success = 'success',
    Error = 'error',
}

interface IPostsSlice {
    posts: {
        items: IPost[];
        status: Status;
        limit: number;
        page: number;
        isFirstLoading: boolean;
        count: number;
    };
    tags: {
        items: string[];
        status: Status;
    };
}

const initialState: IPostsSlice = {
    posts: {
        items: [],
        status: Status.FirstLoading,
        limit: 5,
        page: 1,
        isFirstLoading: true,
        count: 0,
    },
    tags: {
        items: [],
        status: Status.Loading,
    },
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async ({
        page = 1,
        limit = 5,
    }: {
        page?: IPostsSlice['posts']['page'];
        limit?: IPostsSlice['posts']['limit'];
    }) => {
        const { data } = await $host.get('/posts', {
            params: {
                page,
                limit,
            },
        });

        return data as { posts: IPost[]; count: number };
    }
);

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
    reducers: {
        increasePage: (state) => {
            state.posts.page++;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                if (state.posts.isFirstLoading) {
                    state.posts.isFirstLoading = false;
                } else {
                    state.posts.status = Status.Loading;
                }
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                const newPosts = [];

                for (let i = 0; i < action.payload.posts.length; i++) {
                    let isEqual = false;
                    for (let j = 0; j < state.posts.items.length; j++) {
                        if (
                            state.posts.items[j]._id ===
                            action.payload.posts[i]._id
                        ) {
                            isEqual = true;
                            break;
                        }
                    }

                    if (!isEqual) {
                        newPosts.push(action.payload.posts[i]);
                    }
                }

                for (let i = newPosts.length - 1; i >= 0; i--) {
                    state.posts.items.unshift(newPosts[i]);
                }

                state.posts.items.sort((a, b) => {
                    const firstDate = new Date(a.createdAt);
                    const secondDate = new Date(b.createdAt);

                    if (firstDate > secondDate) return -1;
                    if (firstDate === secondDate) return 0;
                    return 1;
                });

                state.posts.count = action.payload.count;
                state.posts.status = Status.Success;
            })
            .addCase(fetchPosts.rejected, (state) => {
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
            });
    },
});

export const postsReducer = postsSlice.reducer;
export const { increasePage } = postsSlice.actions;
