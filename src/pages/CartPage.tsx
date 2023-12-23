import { Row, Col } from 'react-bootstrap';
import { Header } from '../components/Header';
import { Banner } from '../components/Banner';
import { Cart } from '../components/Cart';
import { Footer } from '../components/Footer';
import { useAppSelector } from '../redux/store';
import { Order } from '../components/Order';

export const CartPage = () => {
  const itemCount = useAppSelector(state => state.cart.items.length);

  return (
    <>
      <Header />
      <main className='container'>
        <Row>
          <Col>
            <Banner />
            { itemCount === 0 && (
              <>
                <br />
                <p className='text-center'>Корзина пуста.</p>
              </>
            )}
            { itemCount > 0 && <Cart />  }
            { itemCount > 0 && <Order /> }
          </Col>
        </Row>
      </main>
      <Footer />
    </>
  )
}
