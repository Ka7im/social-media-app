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
