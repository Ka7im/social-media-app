import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "../postsSlice/postsSlice";
import { IUser } from "../../../types/User";
import { $authHost } from "../../../axios/axios";

interface IFriendsSlice {
  friends: IUser[];
  status: Status;
}

const initialState: IFriendsSlice = {
  friends: [],
  status: Status.Loading,
};

export const getFriends = createAsyncThunk("friends/getFriends", async () => {
  const { data } = await $authHost.get("/auth/friend");

  return data as IUser[];
});

export const deleteFriend = createAsyncThunk(
  "friends/deleteFriends",
  async (id: string) => {
    const { data } = await $authHost.delete("auth/friend", {
      params: { friendId: id },
    });

    return data as IUser[];
  }
);

export const addFriend = createAsyncThunk(
  "friends/addFriends",
  async (id: string) => {
    const { data } = await $authHost.patch("auth/friend", {
      friendId: id,
    });

    return data as IUser[];
  }
);

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getFriends.pending, (state) => {
        state.friends = [];
        state.status = Status.Loading;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.status = Status.Success;
      })
      .addCase(getFriends.rejected, (state) => {
        state.friends = [];
        state.status = Status.Error;
      })
      .addCase(deleteFriend.fulfilled, (state, action) => {
        state.friends = action.payload;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.friends = action.payload;
      }),
});

export const friendsReducer = friendsSlice.reducer;
