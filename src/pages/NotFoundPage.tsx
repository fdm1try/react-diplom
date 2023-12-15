import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Banner } from '../components/Banner';

export const NotFoundPage = () => {
  return (
    <>
      <Header />
      <main className='container'>
        <Row>
          <Col>
            <Banner />
            <section className='top-sales'>
              <h2 className='text-center'>Страница не найдена</h2>
              <p>
                Извините, такая страница не найдена!
              </p>
          </section>
          </Col>
        </Row>
      </main>
      <Footer />
    </>
  )
}
