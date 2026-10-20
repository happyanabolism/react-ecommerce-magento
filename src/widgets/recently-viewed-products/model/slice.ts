import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface RecentlyViewedProductsState {
  skus: string[];
}

const initialState: RecentlyViewedProductsState = {
  skus: [],
};

const MAX_RECENTLY_VIEWED = 16;

const slice = createSlice({
  name: 'recentlyViewedProducts',
  initialState,
  reducers: {
    productViewed: (state, action: PayloadAction<string>) => {
      const sku = action.payload;
      state.skus = [sku, ...state.skus.filter((s) => s !== sku)].slice(
        0,
        MAX_RECENTLY_VIEWED
      );
    },
    clearRecentlyViewedProducts: (state) => {
      state.skus = [];
    },
  },
});

export const { productViewed, clearRecentlyViewedProducts } =
  slice.actions;
export const recentlyViewedProductsReducer = slice.reducer;
