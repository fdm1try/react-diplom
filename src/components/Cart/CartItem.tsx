import React from 'react'
import { NavLink } from 'react-router-dom'
import { formatPrice } from '../../utils';

export type TCartItem = {
  id: number;
  title: string;
  count: number;
  price: number;
  size: string;
}

export interface ICartItem {
  item: TCartItem;
  index: number;
  onRemove?: (item: TCartItem) => void;
}

export const CartItem: React.FC<ICartItem> = (props) => {
  
  const price = () => `${formatPrice(props.item.price)} руб.`;
  const amount = () => `${formatPrice(props.item.price * props.item.count)} руб.`;

  const handleRemoveButtonClick = () => {
    props.onRemove && props.onRemove(props.item);
  }

  return (
    <tr>
      <td scope='row'>{props.index}</td>
      <td>
        <NavLink to={`/products/${props.item.id}.html`}>{props.item.title}</NavLink>
      </td>
      <td>{props.item.size}</td>
      <td>{props.item.count}</td>
      <td>{price()}</td>
      <td>{amount()}</td>
      <td>
        <button onClick={handleRemoveButtonClick} className='btn btn-outline-danger btn-sm'>
          Удалить
        </button>
      </td>
    </tr>
  )
}
