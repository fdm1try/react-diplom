import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Banner } from '../components/Banner';
import { useParams } from 'react-router-dom';
import { useItemQuery } from '../redux/api';
import { CatalogItem, TCatalogItemDetails } from '../components/Catalog/CatalogItem';

export const CatalogItemPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, isFetching } = useItemQuery<TCatalogItemDetails>(Number(id));

  return (
    <>
      <Header />
      <main className='container'>
        <Row>
          <Col>
            <Banner />
            { error && <span className='error-message'>{`${error}`}</span>}
            { data && <CatalogItem view={'detailed'} item={data} /> }
          </Col>
        </Row>
      </main>
      <Footer />
    </>
  )
}
