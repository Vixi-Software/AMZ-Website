import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: null,
  randomProducts: [], 
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
    },
    clearProduct(state) {
      state.product = null;
    },
    setRandomProducts(state, action) { 
      state.randomProducts = action.payload;
    },
    clearRandomProducts(state) { 
      state.randomProducts = [];
    },
  },
});

export const { setProduct, clearProduct, setRandomProducts, clearRandomProducts } = productSlice.actions;
export default productSlice.reducer;