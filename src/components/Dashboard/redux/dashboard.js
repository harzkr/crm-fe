import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
}

export const dashboardSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    update: (state, action) => {
      state.users = state.users.concat(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { update } = dashboardSlice.actions

export default dashboardSlice.reducer