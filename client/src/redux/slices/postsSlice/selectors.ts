import { RootState } from "../../store";

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

export const getUserPostsSelector = (state: RootState) => {
  return state.posts.userPosts;
};

export const getPostLikesSelector = (state: RootState, postId: string) => {
  for (let i = 0; i < state.posts.posts.items.length; i++) {
    if (postId === state.posts.posts.items[i]._id) {
      return state.posts.posts.items[i].likes;
    }
  }

  for (let i = 0; i < state.posts.userPosts.items.length; i++) {
    if (postId === state.posts.userPosts.items[i]._id) {
      return state.posts.userPosts.items[i].likes;
    }
  }
};
