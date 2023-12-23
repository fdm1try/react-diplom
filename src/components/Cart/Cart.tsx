/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { CartItem, TCartItem } from './CartItem';
import { useEffect, useState } from 'react';
import { removeFromCart } from '../../redux/slices/CartSlice';
import { formatPrice } from '../../utils';

export interface ICart {
}

export const Cart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const calcTotalAmount = () => items.reduce((sum: number, item) => sum + (item.price * item.count), 0);
  const [totalAmount, setTotalAmount] = useState<number>(calcTotalAmount());

  const totalAmountString = () => `${formatPrice(totalAmount)} руб.`;

  const handleItemRemove = (item: TCartItem) => {
    dispatch(removeFromCart(item));
  }

  useEffect(() => {
    setTotalAmount(calcTotalAmount());
  }, [items])

  return (
    <section className='cart'>
      <h2 className='text-center'>Корзина</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Название</th>
            <th scope='col'>Размер</th>
            <th scope='col'>Кол-во</th>
            <th scope='col'>Стоимость</th>
            <th scope='col'>Итого</th>
            <th scope='col'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <CartItem key={item.id} index={index + 1} item={item} onRemove={handleItemRemove} />
          ))}
          <tr>
            <td colSpan={5} className='text-right'>Общая стоимость</td>
            <td>{totalAmountString()}</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
