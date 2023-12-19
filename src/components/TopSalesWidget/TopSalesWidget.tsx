import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTopSalesQuery } from '../../redux/api';
import { CatalogItem } from '../Catalog/CatalogItem';

export const TopSalesWidget = () => {
  const { data, isLoading, isFetching } = useTopSalesQuery(null);

  if (!isLoading && !isFetching && !data) return <></>;

  return (
    <section className='top-sales'>
      <h2 className='text-center'>Хиты продаж!</h2>
      <Row>
        {data?.map((item) => (
          <Col key={item.id} xs={4}>
            <CatalogItem item={item} />
          </Col>
        ))}
      </Row>
    </section>
  )
}
