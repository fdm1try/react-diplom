/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useAppDispatch } from "../redux/store";
import { syncState, ICartState } from '../redux/slices/CartSlice';



export const useCartStateSync = () => {
  const dispatch = useAppDispatch();
  const [active, setActive ] = useState<boolean>(false);
  
  const handleStorageUpdate = ({ key, newValue }: StorageEvent) => {
    if (key === 'cart' && newValue) {
      try {
        const data: ICartState = JSON.parse(newValue);
        dispatch(syncState(data));
      } catch (error) {
        console.error(`Ошибка синхронизации состояния корзины: не удалось извлечь данные из локального хранилища!\n${error}`);
      }
    }
  }

  const onMount = () => {
    if (active) return;
    window.addEventListener('storage', handleStorageUpdate);
    setActive(true);
  }

  useEffect(onMount, []);

  return [active];
}
