/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector, useAppDispatch } from '../redux/store';
import { Cart } from '../components/Cart';
import { Order, TOrder } from '../components/Order';
import { WithBanner } from './templates';
import { useCreateOrderQuery, TRequestOrderParams } from '../redux/api'
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { Modal } from '../components/Modal';
import { resetCart } from '../redux/slices/CartSlice';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const [orderData, setOrderData] = useState<TRequestOrderParams|typeof skipToken>(skipToken);
  const { isSuccess, isLoading, isFetching, error, refetch } = useCreateOrderQuery(orderData);
  const [createOrderError, setCreateOrderError] = useState<string>();

  const handleOrderSubmit = (owner: TOrder) => {
    setOrderData({owner, items});
  }

  useEffect(() => {
    setCreateOrderError(error ? 'Не удалось создать заказ.' : undefined);
  }, [error])

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(resetCart());
  }, [isSuccess])

  const errorDetails = () => {
    if (!error || !('status' in error) || !error.data) return;
    return `HTTP code ${error.status}: ${JSON.stringify(error.data)}`;
  }

  const handleErrorMessageClose = () => {
    setOrderData(skipToken);
  }

  const handleSuccessModalClose = () => {
    setOrderData(skipToken);
  }

  return (
    <WithBanner>
      { isSuccess && (
        <Modal title='Заказ успешно создан.' onHide={handleSuccessModalClose}>
          Спасибо за покупку! Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.
        </Modal>
      )}
      { !(isLoading || isFetching) && !isSuccess && error && createOrderError && (
        <Error message={createOrderError} details={errorDetails()} onRetry={refetch} onClose={handleErrorMessageClose} />
      )}
      { (isLoading || isFetching) && (
        <Loader fullscreen />
      )}
      { items.length === 0 && (
        <>
          <br />
          <p className='text-center'>Корзина пуста.</p>
        </>
      )}
      { items.length > 0 && <Cart />  }
      { !(isLoading || isFetching) && !error && items.length > 0 && <Order onSubmit={handleOrderSubmit}/> }
    </WithBanner>
  )
}
