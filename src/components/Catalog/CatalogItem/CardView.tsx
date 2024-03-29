import React from 'react'
import { NavLink } from 'react-router-dom';
import { TCatalogItem } from './CatalogItem';
import { formatPrice } from '../../../utils';

export interface ICardView {
  item: TCatalogItem;
}

export const CardView: React.FC<ICardView> = ({item}) => {
  const itemPrice = () => `${formatPrice(item.price)} руб.`;

  return (
    <div className='card catalog-item-card'>
      <img src={item.images[0]}
        className='card-img-top img-fluid' alt={item.title} />
      <div className='card-body'>
        <p className='card-text'>{item.title}</p>
        <p className='card-text'>{itemPrice()}</p>
        <NavLink to={`/catalog/${item.id}`} className='btn btn-outline-primary'>
          Заказать
        </NavLink>
      </div>
    </div>
  )
}
