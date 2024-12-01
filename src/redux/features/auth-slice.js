import { createSlice } from '@reduxjs/toolkit'

const auth = createSlice({
  name: 'auth',
  initialState: {
    user: { isAuthenticated: false },
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload
    },
    logUserOut: (state) => {
      state.user = { isAuthenticated: false }
    },
  },
})

export const { loginSuccess, logUserOut } = auth.actions
export const selectUser = (state) => state.auth.user
export default auth.reducer
