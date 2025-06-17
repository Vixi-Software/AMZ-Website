import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  productEdit: null,
};

const productServiceSlice = createSlice({
  name: 'productService',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductEdit: (state, action) => {
      state.productEdit = action.payload;
    },
  },
});

export const { setProducts } = productServiceSlice.actions;
export default productServiceSlice.reducer;