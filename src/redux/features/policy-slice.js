import { createSlice } from '@reduxjs/toolkit'

const policy = createSlice({
  name: 'policy',
  initialState: {
    policy: [],
  },
  reducers: {
    getSinglePolicy(state, action) {
      state.policy = action.payload
    },
  },
})

export const { getSinglePolicy } = policy.actions
export const selectPolicy = (state) => state.policy.policy
export default policy.reducer
