import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $authHost, $host } from "../../../axios/axios";
import { IPost } from "../../../types/Post";

export enum Status {
  FirstLoading = "firstLoading",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

interface IPostsSlice {
  userPosts: {
    items: IPost[];
    status: Status;
  };
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
  userPosts: {
    items: [],
    status: Status.Loading,
  },
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
  "posts/fetchPosts",
  async ({
    page = 1,
    limit = 5,
    tagFilter = "",
  }: {
    page?: IPostsSlice["posts"]["page"];
    limit?: IPostsSlice["posts"]["limit"];
    tagFilter?: string;
  }) => {
    const { data } = await $authHost.get("/posts", {
      params: {
        page,
        limit,
        tag: tagFilter,
      },
    });

    return data as { posts: IPost[]; count: number; isNewPage: boolean };
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await $authHost.get("/tags");

  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id: string) => {
    const { data } = await $authHost.delete(`posts/${id}`);

    return {
      id,
      tags: data.post.tags,
    };
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId: string) => {
    const { data } = await $authHost.get("posts/user", { params: { userId } });

    return data as IPost[];
  }
);

export const like = createAsyncThunk("posts/like", async (postId: string) => {
  const { data } = await $authHost.patch("post/like", { postId });

  return { likes: data, postId } as { likes: string[]; postId: string };
});

export const unlike = createAsyncThunk(
  "posts/unlike",
  async (postId: string) => {
    const { data } = await $authHost.patch("post/unlike", { postId });

    return { likes: data, postId } as { likes: string[]; postId: string };
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    increasePage: (state) => {
      state.posts.page++;
    },
    setFirstPage: (state) => {
      state.posts.page = 1;
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

        if (action.payload.isNewPage) {
          for (let i = 0; i < action.payload.posts.length; i++) {
            let isEqual = false;
            for (let j = 0; j < state.posts.items.length; j++) {
              if (state.posts.items[j]._id === action.payload.posts[i]._id) {
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
        } else {
          state.posts.items = action.payload.posts;
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
        state.userPosts.items = state.userPosts.items.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(getUserPosts.pending, (state) => {
        state.userPosts.items = [];
        state.userPosts.status = Status.Loading;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.userPosts.items = action.payload;
        state.userPosts.status = Status.Success;
      })
      .addCase(getUserPosts.rejected, (state) => {
        state.userPosts.items = [];
        state.userPosts.status = Status.Error;
      })
      .addCase(like.fulfilled, (state, action) => {
        let isUserPost = true;

        for (let i = 0; i < state.posts.items.length; i++) {
          if (action.payload.postId === state.posts.items[i]._id) {
            state.posts.items[i].likes = action.payload.likes;
            isUserPost = false;
            break;
          }
        }

        if (isUserPost) {
          for (let i = 0; i < state.userPosts.items.length; i++) {
            if (action.payload.postId === state.userPosts.items[i]._id) {
              state.userPosts.items[i].likes = action.payload.likes;
              break;
            }
          }
        }
      })
      .addCase(unlike.fulfilled, (state, action) => {
        let isUserPost = true;

        for (let i = 0; i < state.posts.items.length; i++) {
          if (action.payload.postId === state.posts.items[i]._id) {
            state.posts.items[i].likes = action.payload.likes;
            isUserPost = false;
            break;
          }
        }

        if (isUserPost) {
          for (let i = 0; i < state.userPosts.items.length; i++) {
            if (action.payload.postId === state.userPosts.items[i]._id) {
              state.userPosts.items[i].likes = action.payload.likes;
              break;
            }
          }
        }
      });
  },
});

export const postsReducer = postsSlice.reducer;
export const { increasePage, setFirstPage } = postsSlice.actions;
