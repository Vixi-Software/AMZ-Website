import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  editingPost: null, // { id, title, content }
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setEditingPost: (state, action) => {
      state.editingPost = action.payload
    },
    clearEditingPost: (state) => {
      state.editingPost = null
    },
    updateEditingPost: (state, action) => {
      state.editingPost = { ...state.editingPost, ...action.payload }
    }
  }
})

export const { setEditingPost, clearEditingPost, updateEditingPost } = postSlice.actions
export default postSlice.reducer