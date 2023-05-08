import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice/authSlice";
import { postsReducer } from "./slices/postsSlice/postsSlice";
import { messagesReducer } from "./slices/messageSlice/messageSlice";
import { friendsReducer } from "./slices/friendsSlice/friendsSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    messages: messagesReducer,
    friends: friendsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
