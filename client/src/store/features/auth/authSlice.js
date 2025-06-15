import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
    login(state, action) {
      const { username, password } = action.payload
      if (username === 'adminAMZ' && password === 'adminAMZ') {
        state.user = { username }
      } else {
        state.user = null
      }
    }
  }
})

export const { setUser, clearUser, login } = authSlice.actions
export default authSlice.reducer