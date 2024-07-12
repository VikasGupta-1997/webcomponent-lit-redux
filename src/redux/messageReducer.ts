import { createSlice } from "@reduxjs/toolkit";
import { Message } from "@type/chat";

const initialState = {
  messages: [] as Message[],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
