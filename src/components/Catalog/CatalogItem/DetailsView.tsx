import React, { useState } from 'react'
import { TCatalogItemDetails, TCatalogItemSize } from './CatalogItem';
import { addToCart } from '../../../redux/slices/CartSlice';
import { useAppDispatch } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';

export interface IDetailsView {
  item: TCatalogItemDetails;
}

const CART_MAX_ITEM_QUANTITY = 10;

export const DetailsView: React.FC<IDetailsView> = ({item}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>();
  const availableSizes = item.sizes.filter((size: TCatalogItemSize) => size.available)
    .map((size: TCatalogItemSize) => size.size);
  
  const itemSizeClassName = (size: string) => `catalog-item-size ${size === selectedSize ? 'selected' : ''}`;

  const handleIncreaseQuantity = () => setQuantity((state) => quantity < CART_MAX_ITEM_QUANTITY ? state + 1 : state);
  const handleDecreaseQuantity = () => setQuantity((state) => quantity > 1 ? state - 1 : state);
  const handleSizeClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!(e.target instanceof HTMLSpanElement)) return;
    const size = e.target.dataset.size;
    if (!size) return;
    setSelectedSize(size);
  }

  const handleCartButtonClick = () => {
    dispatch(addToCart({ ...item, size: selectedSize, count: quantity }));
    navigate('/cart');
  }

  return (
    <section className="catalog-item">
      <h2 className="text-center">{item.title}</h2>
      <div className="row">
          <div className="col-5">
              <img src={item.images[0]}
                  className="img-fluid" alt="" />
          </div>
          <div className="col-7">
              <table className="table table-bordered">
                  <tbody>
                      <tr>
                          <td>Артикул</td>
                          <td>{item.sku || ''}</td>
                      </tr>
                      <tr>
                          <td>Производитель</td>
                          <td>{item.manufacturer || ''}</td>
                      </tr>
                      <tr>
                          <td>Цвет</td>
                          <td>{item.color || ''}</td>
                      </tr>
                      <tr>
                          <td>Материалы</td>
                          <td>{item.material || ''}</td>
                      </tr>
                      <tr>
                          <td>Сезон</td>
                          <td>{item.season || ''}</td>
                      </tr>
                      <tr>
                          <td>Повод</td>
                          <td>{item.reason || ''}</td>
                      </tr>
                  </tbody>
              </table>
              <div className="text-center">
                  <p>Размеры в наличии:
                    {availableSizes.map((size: string) => (
                      <span key={`${item.id}-${size}`} onClick={handleSizeClick} data-size={size} className={itemSizeClassName(size)}>
                        {size}
                      </span> 
                    ))}
                  </p>
                  { availableSizes.length > 0 && (
                    <p>Количество: 
                      <span className="btn-group btn-group-sm pl-2">
                        <button disabled={quantity < 2} onClick={handleDecreaseQuantity} className="btn btn-secondary">-</button>
                        <span className="btn btn-outline-primary">{quantity}</span>
                        <button disabled={quantity >= CART_MAX_ITEM_QUANTITY} onClick={handleIncreaseQuantity} className="btn btn-secondary">+</button>
                      </span>
                    </p>
                  )}
              </div>
              { availableSizes.length > 0 && (
                <button onClick={handleCartButtonClick} disabled={selectedSize === undefined} className="btn btn-danger btn-block btn-lg">
                  В корзину
                </button>
              )}
          </div>
      </div>
    </section>
  )
}
