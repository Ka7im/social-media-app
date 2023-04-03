import { RootState } from '../../store';

export const getPostsSelector = (state: RootState) => {
    return state.posts;
};

export const getPostStatusSelector = (state: RootState) => {
    return state.posts.posts.status;
};

export const getTagsStatusSelector = (state: RootState) => {
    return state.posts.tags.status;
};

export const getPostPageSelector = (state: RootState) => {
    return state.posts.posts.page;
};

export const getPostCountSelector = (state: RootState) => {
    return state.posts.posts.count;
};

export const getPostLimitSelector = (state: RootState) => {
    return state.posts.posts.limit;
};
