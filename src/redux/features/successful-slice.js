import { createSlice } from '@reduxjs/toolkit'

const success = createSlice({
  name: 'success',
  initialState: {
    successInfo: [],
  },
  reducers: {
    getCertificate(state, action) {
      state.successInfo = action.payload
    },
  },
})

export const { getCertificate } = success.actions
// export const selectPolicy = (state) => state.policy.policy
export default success.reducer
