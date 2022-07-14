import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
}

export const conversationSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    updateMessages: (state, action) => {
      state.messages = state.messages.concat(action.payload);
    },
  },
})

export const { updateMessages } = conversationSlice.actions

export default conversationSlice.reducer