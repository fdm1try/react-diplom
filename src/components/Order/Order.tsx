/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';

export type TOrder = {
  phone: string;
  address: string;
}

export interface IOrder {
  onSubmit?: (order: TOrder) => void;
}

export const Order: React.FC<IOrder> = (props) => {
  const agreementCheckboxRef = useRef<HTMLInputElement>(null);

  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [formValid, setFormValid] = useState<boolean>(false);

  const phoneNumber = () => phone.length && `+${phone}` || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) throw new Error('Not valid!');
    props.onSubmit && props.onSubmit({ phone, address });
  }

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const number = value.replace(/[^0-9]/g, '');
    if (number.length <= 12) setPhone(number);
  }

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newAddress = value.replace(/[^A-ZА-Я0-9\s,\\./()]/gi, '');
    setAddress(newAddress);
  }

  const checkValidity = () => {
    const agreement = agreementCheckboxRef.current?.checked || false;
    const valid = agreement && phone.length > 10;
    setFormValid(valid);
  }

  useEffect(() => {
    checkValidity();
  }, [phone]);

  return (
    <section className='order'>
      <h2 className='text-center'>Оформить заказ</h2>
      <div className='card' style={{ maxWidth: '30rem', margin: '0 auto' }}>
        <form className='card-body' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='phone'>Телефон</label>
            <input onChange={handlePhoneInputChange} className='form-control' id='phone' placeholder='Ваш телефон' value={phoneNumber()}/>
          </div>
          <div className='form-group'>
            <label htmlFor='address'>Адрес доставки</label>
            <input onChange={handleAddressInputChange} className='form-control' id='address' placeholder='Адрес доставки' value={address} />
          </div>
          <div className='form-group form-check'>
            <input onChange={checkValidity} ref={agreementCheckboxRef} type='checkbox' className='form-check-input' id='agreement' />
            <label className='form-check-label' htmlFor='agreement'>Согласен с правилами доставки</label>
          </div>
          <button disabled={ !formValid } type='submit' className='btn btn-outline-secondary'>
            Оформить
          </button>
        </form>
      </div>
    </section>
  )
}
