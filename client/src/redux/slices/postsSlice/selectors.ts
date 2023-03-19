import { RootState } from '../../store';

export const getPostsSelector = (state: RootState) => {
    return state.posts;
};
