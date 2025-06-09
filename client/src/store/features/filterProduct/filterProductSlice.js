import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: null,
};

const filterProductSlice = createSlice({
  name: 'filterProduct',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = filterProductSlice.actions;
export default filterProductSlice.reducer;