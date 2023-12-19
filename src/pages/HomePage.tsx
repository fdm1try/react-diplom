import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Banner } from '../components/Banner';
import { TopSalesWidget } from '../components/TopSalesWidget';
import { CatalogWidget } from '../components/CatalogWidget';

export const HomePage = () => {
  return (
    <>
      <Header />
      <main className='container'>
        <Row>
          <Col>
            <Banner />
            <TopSalesWidget />
            <CatalogWidget />
          </Col>
        </Row>
      </main>
      <Footer />
    </>
  )
}
