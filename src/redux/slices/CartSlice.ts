import { createSlice } from '@reduxjs/toolkit';
import { TCartItem } from '../../components/Cart/CartItem';
export interface ICartState {
  items: Array<TCartItem>;
}

const defaultState = { items: [] };

const initialState = () : ICartState => {
  const data = localStorage.getItem('cart');
  if (!data) return defaultState;
  try {
    return JSON.parse(data);
  } catch(error) {
    console.warn(`Не удалось извлечь данные из локального хранилища!\n${error}`);
    return defaultState;
  }
};

export const cartSlice = createSlice({
  name: 'cart', initialState: initialState(), reducers: { 
    addToCart: (state, action) => {
      const { id, title, price, count, size } = action.payload;
      const items = state.items.map((item) => ({ ...item }));
      const item = items.find((item) => item.id === id && item.size === size);
      if (item) {
        item.count += count;
      } else {        
        items.push({ id, title, price, count, size});
      }
      const newState = { ...state, items }
      window.localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    }, 
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      const items = state.items.filter((item) => !(item.id === id && item.size === size));
      const newState = { ...state, items };
      window.localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    },
    resetCart: () => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },
    syncState: (_, action) => action.payload,
  }
})

export const { addToCart, removeFromCart, resetCart, syncState } = cartSlice.actions;
export default cartSlice.reducer;