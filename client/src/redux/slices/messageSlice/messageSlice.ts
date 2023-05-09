import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../../types/Message";
import { $authHost } from "../../../axios/axios";

export const getMessages = createAsyncThunk(
  "message",
  async ({ userOne, userTwo }: { userOne: string; userTwo: string }) => {
    const { data } = await $authHost.get("/message", {
      params: {
        userOne,
        userTwo,
      },
    });

    return data;
  }
);

interface IMessageSlice {
  messages: IMessage[];
}

const initialState: IMessageSlice = {
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMessages.pending, (state) => {
        state.messages = [];
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const messagesReducer = messageSlice.reducer;
export const { setMessages } = messageSlice.actions;
