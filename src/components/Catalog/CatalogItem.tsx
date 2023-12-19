import { NavLink } from 'react-router-dom';

export type TCatalogItem = {
  id: number;
  category: number;
  title: string;
  images: Array<string>;
  price: number;
}

export interface ICatalogItem {
  item: TCatalogItem;
}

export const CatalogItem: React.FC<ICatalogItem> = ({item}) => {
  const itemPrice = () => {
    return `${Intl.NumberFormat().format(item.price)} руб.`;
  }

  return (
    <div className='card catalog-item-card'>
      <img src={item.images[0]}
        className='card-img-top img-fluid' alt={item.title} />
      <div className='card-body'>
        <p className='card-text'>{item.title}</p>
        <p className='card-text'>{itemPrice()}</p>
        <NavLink to={`/products/${item.id}.html`} className='btn btn-outline-primary'>
          Заказать
        </NavLink>
      </div>
    </div>
  )
}
