import { createSlice } from '@reduxjs/toolkit';
import { TCatalogFilter } from '../../components/Catalog';

const initialState = {} as TCatalogFilter;

export const catalogFilterSlice = createSlice({
  name: 'catalogFilter', initialState, reducers: { 
    setFilter: (_, action) => action.payload,
    resetFilter: () => initialState,
  }
})

export const { setFilter, resetFilter } = catalogFilterSlice.actions;
export default catalogFilterSlice.reducer;